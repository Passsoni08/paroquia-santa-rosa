from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.v1.deps import get_db, require_admin
from app.models.user import User
from app.repositories import aviso_repo
from app.schemas.aviso import AvisoCreate, AvisoResponse, AvisoUpdate

router = APIRouter(prefix="/avisos", tags=["Avisos"])


@router.get("", response_model=list[AvisoResponse])
async def listar_avisos(
    db: AsyncSession = Depends(get_db),
    ativo: bool | None = None,
    categoria: str | None = None,
    limite: int = Query(20, ge=1, le=100),
    pagina: int = Query(1, ge=1),
):
    avisos, _total = await aviso_repo.get_all(
        db, publicado=True, ativo=ativo, categoria=categoria, limite=limite, pagina=pagina
    )
    return avisos


@router.get("/{aviso_id}", response_model=AvisoResponse)
async def detalhe_aviso(aviso_id: int, db: AsyncSession = Depends(get_db)):
    aviso = await aviso_repo.get_by_id(db, aviso_id)
    if not aviso:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Aviso não encontrado")
    return aviso


@router.post("", response_model=AvisoResponse, status_code=status.HTTP_201_CREATED)
async def criar_aviso(
    data: AvisoCreate,
    db: AsyncSession = Depends(get_db),
    user: User = Depends(require_admin),
):
    aviso = await aviso_repo.create(db, criado_por_id=user.id, **data.model_dump())
    return aviso


@router.put("/{aviso_id}", response_model=AvisoResponse)
async def editar_aviso(
    aviso_id: int,
    data: AvisoUpdate,
    db: AsyncSession = Depends(get_db),
    _user: User = Depends(require_admin),
):
    aviso = await aviso_repo.get_by_id(db, aviso_id)
    if not aviso:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Aviso não encontrado")
    aviso = await aviso_repo.update(db, aviso, **data.model_dump(exclude_unset=True))
    return aviso


@router.patch("/{aviso_id}/ativar", response_model=AvisoResponse)
async def ativar_aviso(
    aviso_id: int,
    db: AsyncSession = Depends(get_db),
    _user: User = Depends(require_admin),
):
    aviso = await aviso_repo.get_by_id(db, aviso_id)
    if not aviso:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Aviso não encontrado")
    aviso = await aviso_repo.update(db, aviso, ativo=not aviso.ativo)
    return aviso


@router.delete("/{aviso_id}", status_code=status.HTTP_204_NO_CONTENT)
async def excluir_aviso(
    aviso_id: int,
    db: AsyncSession = Depends(get_db),
    _user: User = Depends(require_admin),
):
    aviso = await aviso_repo.get_by_id(db, aviso_id)
    if not aviso:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Aviso não encontrado")
    await aviso_repo.delete(db, aviso)
