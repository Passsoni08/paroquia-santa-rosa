from datetime import UTC, datetime

from sqlalchemy import Boolean, DateTime, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base


class Noticia(Base):
    __tablename__ = "noticias"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    titulo: Mapped[str] = mapped_column(String(300))
    slug: Mapped[str] = mapped_column(String(350), unique=True, index=True)
    resumo: Mapped[str] = mapped_column(String(500))
    conteudo: Mapped[str] = mapped_column(Text)
    imagem_capa_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    publicado: Mapped[bool] = mapped_column(Boolean, default=False)
    publicado_em: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    criado_em: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(UTC))
    atualizado_em: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(UTC), onupdate=lambda: datetime.now(UTC)
    )
    criado_por_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
