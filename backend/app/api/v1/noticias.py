import os
import uuid
from datetime import UTC, datetime

from fastapi import APIRouter, Depends, File, Form, HTTPException, Query, UploadFile, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.v1.deps import get_db, require_admin
from app.core.config import settings
from app.models.user import User
from app.repositories import noticia_repo
from app.schemas.noticia import NoticiaResponse, NoticiaUpdate

router = APIRouter(prefix="/noticias", tags=["Notícias"])


@router.get("", response_model=list[NoticiaResponse])
async def listar_noticias(
    db: AsyncSession = Depends(get_db),
    publicado: bool | None = None,
    limite: int = Query(12, ge=1, le=100),
    pagina: int = Query(1, ge=1),
):
    noticias, _total = await noticia_repo.get_all(
        db, publicado=publicado or True, limite=limite, pagina=pagina
    )
    return noticias


@router.get("/{slug}", response_model=NoticiaResponse)
async def detalhe_noticia(slug: str, db: AsyncSession = Depends(get_db)):
    noticia = await noticia_repo.get_by_slug(db, slug)
    if not noticia:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Notícia não encontrada")
    return noticia


@router.post("", response_model=NoticiaResponse, status_code=status.HTTP_201_CREATED)
async def criar_noticia(
    titulo: str = Form(...),
    resumo: str = Form(...),
    conteudo: str = Form(...),
    publicado: bool = Form(False),
    imagem_capa: UploadFile | None = File(None),
    db: AsyncSession = Depends(get_db),
    user: User = Depends(require_admin),
):
    imagem_capa_url = None
    if imagem_capa and imagem_capa.filename:
        now = datetime.now()
        ext = os.path.splitext(imagem_capa.filename)[1]
        filename = f"{uuid.uuid4().hex}{ext}"
        dir_path = os.path.join(settings.UPLOAD_DIR, "noticias", str(now.year), f"{now.month:02d}")
        os.makedirs(dir_path, exist_ok=True)
        file_path = os.path.join(dir_path, filename)
        content = await imagem_capa.read()
        with open(file_path, "wb") as f:
            f.write(content)
        imagem_capa_url = f"/uploads/noticias/{now.year}/{now.month:02d}/{filename}"

    publicado_em = datetime.now(UTC) if publicado else None
    noticia = await noticia_repo.create(
        db, criado_por_id=user.id, titulo=titulo, resumo=resumo,
        conteudo=conteudo, publicado=publicado, publicado_em=publicado_em,
        imagem_capa_url=imagem_capa_url,
    )
    return noticia


@router.put("/{noticia_id}", response_model=NoticiaResponse)
async def editar_noticia(
    noticia_id: int,
    data: NoticiaUpdate,
    db: AsyncSession = Depends(get_db),
    _user: User = Depends(require_admin),
):
    noticia = await noticia_repo.get_by_id(db, noticia_id)
    if not noticia:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Notícia não encontrada")
    updates = data.model_dump(exclude_unset=True)
    if "publicado" in updates and updates["publicado"] and not noticia.publicado:
        updates["publicado_em"] = datetime.now(UTC)
    noticia = await noticia_repo.update(db, noticia, **updates)
    return noticia


@router.patch("/{noticia_id}/publicar", response_model=NoticiaResponse)
async def publicar_noticia(
    noticia_id: int,
    db: AsyncSession = Depends(get_db),
    _user: User = Depends(require_admin),
):
    noticia = await noticia_repo.get_by_id(db, noticia_id)
    if not noticia:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Notícia não encontrada")
    publicado = not noticia.publicado
    publicado_em = datetime.now(UTC) if publicado else None
    noticia = await noticia_repo.update(db, noticia, publicado=publicado, publicado_em=publicado_em)
    return noticia


@router.delete("/{noticia_id}", status_code=status.HTTP_204_NO_CONTENT)
async def excluir_noticia(
    noticia_id: int,
    db: AsyncSession = Depends(get_db),
    _user: User = Depends(require_admin),
):
    noticia = await noticia_repo.get_by_id(db, noticia_id)
    if not noticia:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Notícia não encontrada")
    await noticia_repo.delete(db, noticia)
