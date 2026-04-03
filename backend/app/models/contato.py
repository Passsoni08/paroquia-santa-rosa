from datetime import UTC, datetime

from sqlalchemy import Boolean, DateTime, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base


class Contato(Base):
    __tablename__ = "contatos"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    nome: Mapped[str] = mapped_column(String(200))
    email: Mapped[str] = mapped_column(String(255))
    telefone: Mapped[str | None] = mapped_column(String(20), nullable=True)
    assunto: Mapped[str] = mapped_column(String(100))
    mensagem: Mapped[str] = mapped_column(Text)
    lido: Mapped[bool] = mapped_column(Boolean, default=False)
    criado_em: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(UTC))
