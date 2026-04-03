from datetime import UTC, date, datetime

from sqlalchemy import Boolean, Date, DateTime, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base


class Aviso(Base):
    __tablename__ = "avisos"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    titulo: Mapped[str] = mapped_column(String(300))
    conteudo: Mapped[str] = mapped_column(Text)
    categoria: Mapped[str] = mapped_column(String(50), default="informativo")
    ativo: Mapped[bool] = mapped_column(Boolean, default=True)
    publicado: Mapped[bool] = mapped_column(Boolean, default=True)
    data_expiracao: Mapped[date | None] = mapped_column(Date, nullable=True)
    criado_em: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(UTC))
    atualizado_em: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(UTC), onupdate=lambda: datetime.now(UTC)
    )
    criado_por_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
