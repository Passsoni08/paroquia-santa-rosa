from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.v1.deps import get_db, require_admin
from app.models.user import User
from app.repositories import newsletter_repo
from app.schemas.newsletter import NewsletterCreate, NewsletterResponse

router = APIRouter(prefix="/newsletter", tags=["Newsletter"])


@router.post("/inscrever", response_model=NewsletterResponse, status_code=status.HTTP_201_CREATED)
async def inscrever(data: NewsletterCreate, db: AsyncSession = Depends(get_db)):
    existente = await newsletter_repo.get_by_email(db, data.email)
    if existente:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="E-mail já inscrito")
    inscrito = await newsletter_repo.create(db, email=data.email)
    return inscrito


@router.get("", response_model=list[NewsletterResponse])
async def listar_inscritos(
    db: AsyncSession = Depends(get_db),
    _user: User = Depends(require_admin),
    limite: int = Query(50, ge=1, le=200),
    pagina: int = Query(1, ge=1),
):
    inscritos, _total = await newsletter_repo.get_all(db, limite=limite, pagina=pagina)
    return inscritos


@router.delete("/{inscrito_id}", status_code=status.HTTP_204_NO_CONTENT)
async def remover_inscrito(
    inscrito_id: int,
    db: AsyncSession = Depends(get_db),
    _user: User = Depends(require_admin),
):
    # Buscar por ID requer uma query custom simples
    from sqlalchemy import select
    from app.models.newsletter import Newsletter
    result = await db.execute(select(Newsletter).where(Newsletter.id == inscrito_id))
    inscrito = result.scalar_one_or_none()
    if not inscrito:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Inscrito não encontrado")
    await newsletter_repo.delete(db, inscrito)
