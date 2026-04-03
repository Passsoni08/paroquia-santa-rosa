from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.v1.deps import get_db, require_admin
from app.models.user import User
from app.repositories import contato_repo
from app.schemas.contato import ContatoCreate, ContatoResponse

router = APIRouter(prefix="/contato", tags=["Contato"])


@router.post("", response_model=ContatoResponse, status_code=status.HTTP_201_CREATED)
async def enviar_mensagem(data: ContatoCreate, db: AsyncSession = Depends(get_db)):
    contato = await contato_repo.create(db, **data.model_dump())
    return contato


@router.get("", response_model=list[ContatoResponse])
async def listar_mensagens(
    db: AsyncSession = Depends(get_db),
    _user: User = Depends(require_admin),
    lido: bool | None = None,
    limite: int = Query(20, ge=1, le=100),
    pagina: int = Query(1, ge=1),
):
    contatos, _total = await contato_repo.get_all(db, lido=lido, limite=limite, pagina=pagina)
    return contatos


@router.get("/nao-lidas/count")
async def count_nao_lidas(
    db: AsyncSession = Depends(get_db),
    _user: User = Depends(require_admin),
):
    count = await contato_repo.count_unread(db)
    return {"count": count}


@router.patch("/{contato_id}/lido", response_model=ContatoResponse)
async def marcar_lido(
    contato_id: int,
    db: AsyncSession = Depends(get_db),
    _user: User = Depends(require_admin),
):
    contato = await contato_repo.get_by_id(db, contato_id)
    if not contato:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Mensagem não encontrada")
    contato = await contato_repo.mark_as_read(db, contato, lido=not contato.lido)
    return contato


@router.delete("/{contato_id}", status_code=status.HTTP_204_NO_CONTENT)
async def excluir_mensagem(
    contato_id: int,
    db: AsyncSession = Depends(get_db),
    _user: User = Depends(require_admin),
):
    contato = await contato_repo.get_by_id(db, contato_id)
    if not contato:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Mensagem não encontrada")
    await contato_repo.delete(db, contato)
