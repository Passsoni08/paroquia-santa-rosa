from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.contato import Contato


async def create(db: AsyncSession, **kwargs) -> Contato:
    contato = Contato(**kwargs)
    db.add(contato)
    await db.flush()
    return contato


async def get_by_id(db: AsyncSession, contato_id: int) -> Contato | None:
    result = await db.execute(select(Contato).where(Contato.id == contato_id))
    return result.scalar_one_or_none()


async def get_all(
    db: AsyncSession,
    *,
    lido: bool | None = None,
    limite: int = 20,
    pagina: int = 1,
) -> tuple[list[Contato], int]:
    query = select(Contato)
    count_query = select(func.count()).select_from(Contato)

    if lido is not None:
        query = query.where(Contato.lido == lido)
        count_query = count_query.where(Contato.lido == lido)

    total = (await db.execute(count_query)).scalar() or 0
    query = query.order_by(Contato.criado_em.desc()).offset((pagina - 1) * limite).limit(limite)
    result = await db.execute(query)
    return list(result.scalars().all()), total


async def count_unread(db: AsyncSession) -> int:
    result = await db.execute(
        select(func.count()).select_from(Contato).where(Contato.lido == False)  # noqa: E712
    )
    return result.scalar() or 0


async def mark_as_read(db: AsyncSession, contato: Contato, lido: bool = True) -> Contato:
    contato.lido = lido
    await db.flush()
    return contato


async def delete(db: AsyncSession, contato: Contato) -> None:
    await db.delete(contato)
    await db.flush()
