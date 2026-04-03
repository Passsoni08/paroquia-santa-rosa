from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.aviso import Aviso


async def create(db: AsyncSession, *, criado_por_id: int, **kwargs) -> Aviso:
    aviso = Aviso(criado_por_id=criado_por_id, **kwargs)
    db.add(aviso)
    await db.flush()
    return aviso


async def get_by_id(db: AsyncSession, aviso_id: int) -> Aviso | None:
    result = await db.execute(select(Aviso).where(Aviso.id == aviso_id))
    return result.scalar_one_or_none()


async def get_all(
    db: AsyncSession,
    *,
    publicado: bool | None = None,
    ativo: bool | None = None,
    categoria: str | None = None,
    limite: int = 20,
    pagina: int = 1,
) -> tuple[list[Aviso], int]:
    query = select(Aviso)
    count_query = select(func.count()).select_from(Aviso)

    if publicado is not None:
        query = query.where(Aviso.publicado == publicado)
        count_query = count_query.where(Aviso.publicado == publicado)
    if ativo is not None:
        query = query.where(Aviso.ativo == ativo)
        count_query = count_query.where(Aviso.ativo == ativo)
    if categoria:
        query = query.where(Aviso.categoria == categoria)
        count_query = count_query.where(Aviso.categoria == categoria)

    total = (await db.execute(count_query)).scalar() or 0
    query = query.order_by(Aviso.criado_em.desc()).offset((pagina - 1) * limite).limit(limite)
    result = await db.execute(query)
    return list(result.scalars().all()), total


async def update(db: AsyncSession, aviso: Aviso, **kwargs) -> Aviso:
    for key, value in kwargs.items():
        if value is not None:
            setattr(aviso, key, value)
    await db.flush()
    return aviso


async def delete(db: AsyncSession, aviso: Aviso) -> None:
    await db.delete(aviso)
    await db.flush()
