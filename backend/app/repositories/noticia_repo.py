import re
import unicodedata

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.noticia import Noticia


def _slugify(text: str) -> str:
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode("ascii")
    text = re.sub(r"[^\w\s-]", "", text.lower())
    return re.sub(r"[-\s]+", "-", text).strip("-")


async def create(db: AsyncSession, *, criado_por_id: int, **kwargs) -> Noticia:
    if "slug" not in kwargs:
        kwargs["slug"] = _slugify(kwargs["titulo"])
    noticia = Noticia(criado_por_id=criado_por_id, **kwargs)
    db.add(noticia)
    await db.flush()
    return noticia


async def get_by_id(db: AsyncSession, noticia_id: int) -> Noticia | None:
    result = await db.execute(select(Noticia).where(Noticia.id == noticia_id))
    return result.scalar_one_or_none()


async def get_by_slug(db: AsyncSession, slug: str) -> Noticia | None:
    result = await db.execute(select(Noticia).where(Noticia.slug == slug))
    return result.scalar_one_or_none()


async def get_all(
    db: AsyncSession,
    *,
    publicado: bool | None = None,
    limite: int = 12,
    pagina: int = 1,
) -> tuple[list[Noticia], int]:
    query = select(Noticia)
    count_query = select(func.count()).select_from(Noticia)

    if publicado is not None:
        query = query.where(Noticia.publicado == publicado)
        count_query = count_query.where(Noticia.publicado == publicado)

    total = (await db.execute(count_query)).scalar() or 0
    query = query.order_by(Noticia.criado_em.desc()).offset((pagina - 1) * limite).limit(limite)
    result = await db.execute(query)
    return list(result.scalars().all()), total


async def update(db: AsyncSession, noticia: Noticia, **kwargs) -> Noticia:
    for key, value in kwargs.items():
        if value is not None:
            setattr(noticia, key, value)
    await db.flush()
    return noticia


async def delete(db: AsyncSession, noticia: Noticia) -> None:
    await db.delete(noticia)
    await db.flush()
