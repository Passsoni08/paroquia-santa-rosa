import os
import re
import uuid
from datetime import datetime

import httpx
from fastapi import APIRouter, Depends, File, Form, HTTPException, Query, UploadFile, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.v1.deps import get_db, require_admin
from app.core.config import settings
from app.models.user import User
from app.repositories import midia_repo
from app.schemas.midia import MidiaResponse, MidiaUpdate

router = APIRouter(prefix="/midia", tags=["Mídia"])

ALLOWED_IMAGE_TYPES = {"image/jpeg", "image/png", "image/webp"}


def _extract_video_info(url: str) -> tuple[str | None, str | None, str | None]:
    # YouTube
    yt_match = re.search(r"(?:youtube\.com/watch\?v=|youtu\.be/)([\w-]+)", url)
    if yt_match:
        video_id = yt_match.group(1)
        thumbnail = f"https://img.youtube.com/vi/{video_id}/maxresdefault.jpg"
        return video_id, "youtube", thumbnail

    # Vimeo
    vm_match = re.search(r"vimeo\.com/(\d+)", url)
    if vm_match:
        return vm_match.group(1), "vimeo", None

    return None, None, None


async def _get_vimeo_thumbnail(url: str) -> str | None:
    try:
        async with httpx.AsyncClient(timeout=5) as client:
            resp = await client.get(f"https://vimeo.com/api/oembed.json?url={url}")
            data = resp.json()
            return data.get("thumbnail_url")
    except Exception:
        return None


@router.get("", response_model=list[MidiaResponse])
async def listar_midia(
    db: AsyncSession = Depends(get_db),
    tipo: str | None = None,
    categoria: str | None = None,
    destaque: bool | None = None,
    limite: int = Query(20, ge=1, le=100),
    pagina: int = Query(1, ge=1),
):
    midias, _total = await midia_repo.get_all(
        db, tipo=tipo, categoria=categoria, destaque=destaque,
        publicado=True, limite=limite, pagina=pagina,
    )
    return midias


@router.get("/{midia_id}", response_model=MidiaResponse)
async def detalhe_midia(midia_id: int, db: AsyncSession = Depends(get_db)):
    midia = await midia_repo.get_by_id(db, midia_id)
    if not midia:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Mídia não encontrada")
    return midia


@router.post("/imagem", response_model=list[MidiaResponse], status_code=status.HTTP_201_CREATED)
async def upload_imagens(
    titulo: str = Form(...),
    descricao: str | None = Form(None),
    categoria: str | None = Form(None),
    publicado: bool = Form(True),
    arquivos: list[UploadFile] = File(...),
    db: AsyncSession = Depends(get_db),
    user: User = Depends(require_admin),
):
    if len(arquivos) > 20:
        raise HTTPException(status_code=400, detail="Máximo 20 arquivos por vez")

    midias = []
    now = datetime.now()
    dir_path = os.path.join(settings.UPLOAD_DIR, "imagens", str(now.year), f"{now.month:02d}")
    os.makedirs(dir_path, exist_ok=True)

    for arquivo in arquivos:
        if arquivo.content_type not in ALLOWED_IMAGE_TYPES:
            raise HTTPException(status_code=400, detail=f"Tipo não permitido: {arquivo.content_type}")

        content = await arquivo.read()
        if len(content) > settings.max_upload_size_bytes:
            raise HTTPException(status_code=400, detail=f"Arquivo excede {settings.MAX_UPLOAD_SIZE_MB}MB")

        ext = os.path.splitext(arquivo.filename or ".jpg")[1]
        filename = f"{uuid.uuid4().hex}{ext}"
        file_path = os.path.join(dir_path, filename)
        with open(file_path, "wb") as f:
            f.write(content)

        midia = await midia_repo.create(
            db, criado_por_id=user.id, tipo="imagem", titulo=titulo,
            descricao=descricao, categoria=categoria, publicado=publicado,
            arquivo_url=f"/uploads/imagens/{now.year}/{now.month:02d}/{filename}",
            arquivo_nome=arquivo.filename, tamanho_bytes=len(content),
        )
        midias.append(midia)

    return midias


@router.post("/video", response_model=MidiaResponse, status_code=status.HTTP_201_CREATED)
async def cadastrar_video(
    url: str = Form(...),
    titulo: str = Form(...),
    descricao: str | None = Form(None),
    publicado: bool = Form(True),
    destaque: bool = Form(False),
    db: AsyncSession = Depends(get_db),
    user: User = Depends(require_admin),
):
    video_id, plataforma, thumbnail_url = _extract_video_info(url)
    if not video_id:
        raise HTTPException(status_code=400, detail="URL de vídeo não reconhecida (YouTube ou Vimeo)")

    if plataforma == "vimeo" and not thumbnail_url:
        thumbnail_url = await _get_vimeo_thumbnail(url)

    midia = await midia_repo.create(
        db, criado_por_id=user.id, tipo="video", titulo=titulo,
        descricao=descricao, publicado=publicado, destaque=destaque,
        video_url=url, video_id=video_id, plataforma=plataforma,
        thumbnail_url=thumbnail_url,
    )
    return midia


@router.put("/{midia_id}", response_model=MidiaResponse)
async def editar_midia(
    midia_id: int,
    data: MidiaUpdate,
    db: AsyncSession = Depends(get_db),
    _user: User = Depends(require_admin),
):
    midia = await midia_repo.get_by_id(db, midia_id)
    if not midia:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Mídia não encontrada")
    midia = await midia_repo.update(db, midia, **data.model_dump(exclude_unset=True))
    return midia


@router.patch("/{midia_id}/destaque", response_model=MidiaResponse)
async def toggle_destaque(
    midia_id: int,
    db: AsyncSession = Depends(get_db),
    _user: User = Depends(require_admin),
):
    midia = await midia_repo.get_by_id(db, midia_id)
    if not midia:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Mídia não encontrada")
    midia = await midia_repo.update(db, midia, destaque=not midia.destaque)
    return midia


@router.delete("/{midia_id}", status_code=status.HTTP_204_NO_CONTENT)
async def excluir_midia(
    midia_id: int,
    db: AsyncSession = Depends(get_db),
    _user: User = Depends(require_admin),
):
    midia = await midia_repo.get_by_id(db, midia_id)
    if not midia:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Mídia não encontrada")

    # Remover arquivo do disco se for imagem
    if midia.tipo == "imagem" and midia.arquivo_url:
        file_path = os.path.join(settings.UPLOAD_DIR, midia.arquivo_url.lstrip("/uploads/"))
        if os.path.exists(file_path):
            os.remove(file_path)

    await midia_repo.delete(db, midia)
