from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.midia import Midia


async def create(db: AsyncSession, *, criado_por_id: int, **kwargs) -> Midia:
    midia = Midia(criado_por_id=criado_por_id, **kwargs)
    db.add(midia)
    await db.flush()
    return midia


async def get_by_id(db: AsyncSession, midia_id: int) -> Midia | None:
    result = await db.execute(select(Midia).where(Midia.id == midia_id))
    return result.scalar_one_or_none()


async def get_all(
    db: AsyncSession,
    *,
    tipo: str | None = None,
    categoria: str | None = None,
    destaque: bool | None = None,
    publicado: bool | None = None,
    limite: int = 20,
    pagina: int = 1,
) -> tuple[list[Midia], int]:
    query = select(Midia)
    count_query = select(func.count()).select_from(Midia)

    if tipo:
        query = query.where(Midia.tipo == tipo)
        count_query = count_query.where(Midia.tipo == tipo)
    if categoria:
        query = query.where(Midia.categoria == categoria)
        count_query = count_query.where(Midia.categoria == categoria)
    if destaque is not None:
        query = query.where(Midia.destaque == destaque)
        count_query = count_query.where(Midia.destaque == destaque)
    if publicado is not None:
        query = query.where(Midia.publicado == publicado)
        count_query = count_query.where(Midia.publicado == publicado)

    total = (await db.execute(count_query)).scalar() or 0
    query = query.order_by(Midia.criado_em.desc()).offset((pagina - 1) * limite).limit(limite)
    result = await db.execute(query)
    return list(result.scalars().all()), total


async def update(db: AsyncSession, midia: Midia, **kwargs) -> Midia:
    for key, value in kwargs.items():
        if value is not None:
            setattr(midia, key, value)
    await db.flush()
    return midia


async def delete(db: AsyncSession, midia: Midia) -> None:
    await db.delete(midia)
    await db.flush()
