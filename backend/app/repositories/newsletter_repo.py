from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.newsletter import Newsletter


async def create(db: AsyncSession, *, email: str) -> Newsletter:
    inscrito = Newsletter(email=email)
    db.add(inscrito)
    await db.flush()
    return inscrito


async def get_by_email(db: AsyncSession, email: str) -> Newsletter | None:
    result = await db.execute(select(Newsletter).where(Newsletter.email == email))
    return result.scalar_one_or_none()


async def get_all(
    db: AsyncSession,
    *,
    limite: int = 50,
    pagina: int = 1,
) -> tuple[list[Newsletter], int]:
    count_query = select(func.count()).select_from(Newsletter)
    total = (await db.execute(count_query)).scalar() or 0

    query = (
        select(Newsletter)
        .order_by(Newsletter.criado_em.desc())
        .offset((pagina - 1) * limite)
        .limit(limite)
    )
    result = await db.execute(query)
    return list(result.scalars().all()), total


async def delete(db: AsyncSession, inscrito: Newsletter) -> None:
    await db.delete(inscrito)
    await db.flush()
