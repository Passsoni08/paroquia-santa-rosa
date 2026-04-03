from datetime import date

from sqlalchemy import select
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.liturgia_cache import LiturgiaCache


async def upsert(db: AsyncSession, *, data: date, payload: dict) -> LiturgiaCache:
    stmt = (
        insert(LiturgiaCache)
        .values(data=data, payload=payload)
        .on_conflict_do_update(index_elements=["data"], set_={"payload": payload})
        .returning(LiturgiaCache)
    )
    result = await db.execute(stmt)
    return result.scalar_one()


async def get_by_date(db: AsyncSession, data: date) -> LiturgiaCache | None:
    result = await db.execute(select(LiturgiaCache).where(LiturgiaCache.data == data))
    return result.scalar_one_or_none()


async def get_latest(db: AsyncSession) -> LiturgiaCache | None:
    result = await db.execute(
        select(LiturgiaCache).order_by(LiturgiaCache.data.desc()).limit(1)
    )
    return result.scalar_one_or_none()
