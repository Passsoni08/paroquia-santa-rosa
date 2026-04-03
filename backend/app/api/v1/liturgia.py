from datetime import date

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.v1.deps import get_db, require_admin
from app.models.user import User
from app.repositories import liturgia_repo
from app.schemas.liturgia import LiturgiaResponse
from app.services.liturgia_sync import sincronizar_liturgia

router = APIRouter(prefix="/liturgia", tags=["Liturgia"])


@router.get("/hoje", response_model=LiturgiaResponse)
async def liturgia_hoje(db: AsyncSession = Depends(get_db)):
    hoje = date.today()
    cache = await liturgia_repo.get_by_date(db, hoje)

    if cache:
        return LiturgiaResponse(
            data=cache.data, payload=cache.payload,
            sincronizado_em=cache.sincronizado_em, desatualizado=False,
        )

    # Tenta sincronizar na hora
    await sincronizar_liturgia()
    cache = await liturgia_repo.get_by_date(db, hoje)
    if cache:
        return LiturgiaResponse(
            data=cache.data, payload=cache.payload,
            sincronizado_em=cache.sincronizado_em, desatualizado=False,
        )

    # Fallback: registro mais recente
    cache = await liturgia_repo.get_latest(db)
    if cache:
        return LiturgiaResponse(
            data=cache.data, payload=cache.payload,
            sincronizado_em=cache.sincronizado_em, desatualizado=True,
        )

    raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Liturgia indisponível")


@router.get("/{data}", response_model=LiturgiaResponse)
async def liturgia_por_data(data: date, db: AsyncSession = Depends(get_db)):
    cache = await liturgia_repo.get_by_date(db, data)
    if cache:
        return LiturgiaResponse(
            data=cache.data, payload=cache.payload,
            sincronizado_em=cache.sincronizado_em, desatualizado=False,
        )
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Liturgia não encontrada para esta data")


@router.post("/sincronizar")
async def forcar_sincronizacao(_user: User = Depends(require_admin)):
    await sincronizar_liturgia()
    return {"message": "Sincronização realizada"}
