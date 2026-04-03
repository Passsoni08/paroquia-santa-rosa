from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.user import User


async def get_by_id(db: AsyncSession, user_id: int) -> User | None:
    result = await db.execute(select(User).where(User.id == user_id))
    return result.scalar_one_or_none()


async def get_by_email(db: AsyncSession, email: str) -> User | None:
    result = await db.execute(select(User).where(User.email == email))
    return result.scalar_one_or_none()


async def create(db: AsyncSession, *, nome: str, email: str, senha_hash: str) -> User:
    user = User(nome=nome, email=email, senha_hash=senha_hash)
    db.add(user)
    await db.flush()
    return user
