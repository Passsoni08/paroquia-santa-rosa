import os
import uuid
from datetime import datetime

from fastapi import APIRouter, Depends, File, Form, HTTPException, Query, UploadFile, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.v1.deps import get_db, require_admin
from app.core.config import settings
from app.models.user import User
from app.repositories import evento_repo
from app.schemas.evento import EventoResponse, EventoUpdate

router = APIRouter(prefix="/eventos", tags=["Eventos"])


@router.get("", response_model=list[EventoResponse])
async def listar_eventos(
    db: AsyncSession = Depends(get_db),
    publicado: bool | None = None,
    limite: int = Query(12, ge=1, le=100),
    pagina: int = Query(1, ge=1),
):
    eventos, _total = await evento_repo.get_all(db, publicado=publicado or True, limite=limite, pagina=pagina)
    return eventos


@router.get("/{evento_id}", response_model=EventoResponse)
async def detalhe_evento(evento_id: int, db: AsyncSession = Depends(get_db)):
    evento = await evento_repo.get_by_id(db, evento_id)
    if not evento:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Evento não encontrado")
    return evento


@router.post("", response_model=EventoResponse, status_code=status.HTTP_201_CREATED)
async def criar_evento(
    titulo: str = Form(...),
    descricao: str = Form(...),
    data_inicio: datetime = Form(...),
    data_fim: datetime | None = Form(None),
    local: str | None = Form(None),
    publicado: bool = Form(True),
    imagem: UploadFile | None = File(None),
    db: AsyncSession = Depends(get_db),
    user: User = Depends(require_admin),
):
    imagem_url = None
    if imagem and imagem.filename:
        now = datetime.now()
        ext = os.path.splitext(imagem.filename)[1]
        filename = f"{uuid.uuid4().hex}{ext}"
        dir_path = os.path.join(settings.UPLOAD_DIR, "eventos", str(now.year), f"{now.month:02d}")
        os.makedirs(dir_path, exist_ok=True)
        file_path = os.path.join(dir_path, filename)
        content = await imagem.read()
        with open(file_path, "wb") as f:
            f.write(content)
        imagem_url = f"/uploads/eventos/{now.year}/{now.month:02d}/{filename}"

    evento = await evento_repo.create(
        db, criado_por_id=user.id, titulo=titulo, descricao=descricao,
        data_inicio=data_inicio, data_fim=data_fim, local=local,
        publicado=publicado, imagem_url=imagem_url,
    )
    return evento


@router.put("/{evento_id}", response_model=EventoResponse)
async def editar_evento(
    evento_id: int,
    data: EventoUpdate,
    db: AsyncSession = Depends(get_db),
    _user: User = Depends(require_admin),
):
    evento = await evento_repo.get_by_id(db, evento_id)
    if not evento:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Evento não encontrado")
    evento = await evento_repo.update(db, evento, **data.model_dump(exclude_unset=True))
    return evento


@router.delete("/{evento_id}", status_code=status.HTTP_204_NO_CONTENT)
async def excluir_evento(
    evento_id: int,
    db: AsyncSession = Depends(get_db),
    _user: User = Depends(require_admin),
):
    evento = await evento_repo.get_by_id(db, evento_id)
    if not evento:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Evento não encontrado")
    await evento_repo.delete(db, evento)
