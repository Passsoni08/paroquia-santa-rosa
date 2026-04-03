from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.evento import Evento


async def create(db: AsyncSession, *, criado_por_id: int, **kwargs) -> Evento:
    evento = Evento(criado_por_id=criado_por_id, **kwargs)
    db.add(evento)
    await db.flush()
    return evento


async def get_by_id(db: AsyncSession, evento_id: int) -> Evento | None:
    result = await db.execute(select(Evento).where(Evento.id == evento_id))
    return result.scalar_one_or_none()


async def get_all(
    db: AsyncSession,
    *,
    publicado: bool | None = None,
    limite: int = 12,
    pagina: int = 1,
) -> tuple[list[Evento], int]:
    query = select(Evento)
    count_query = select(func.count()).select_from(Evento)

    if publicado is not None:
        query = query.where(Evento.publicado == publicado)
        count_query = count_query.where(Evento.publicado == publicado)

    total = (await db.execute(count_query)).scalar() or 0
    query = query.order_by(Evento.data_inicio.desc()).offset((pagina - 1) * limite).limit(limite)
    result = await db.execute(query)
    return list(result.scalars().all()), total


async def update(db: AsyncSession, evento: Evento, **kwargs) -> Evento:
    for key, value in kwargs.items():
        if value is not None:
            setattr(evento, key, value)
    await db.flush()
    return evento


async def delete(db: AsyncSession, evento: Evento) -> None:
    await db.delete(evento)
    await db.flush()
