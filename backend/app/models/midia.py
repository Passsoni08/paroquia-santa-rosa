from datetime import UTC, datetime

from sqlalchemy import Boolean, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base


class Midia(Base):
    __tablename__ = "midias"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    tipo: Mapped[str] = mapped_column(String(20))  # 'imagem' | 'video'
    titulo: Mapped[str] = mapped_column(String(300))
    descricao: Mapped[str | None] = mapped_column(Text, nullable=True)
    categoria: Mapped[str | None] = mapped_column(String(50), nullable=True)

    # Imagens (upload)
    arquivo_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    arquivo_nome: Mapped[str | None] = mapped_column(String(300), nullable=True)
    tamanho_bytes: Mapped[int | None] = mapped_column(Integer, nullable=True)

    # Videos (URL externa)
    video_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    video_id: Mapped[str | None] = mapped_column(String(100), nullable=True)
    plataforma: Mapped[str | None] = mapped_column(String(20), nullable=True)
    thumbnail_url: Mapped[str | None] = mapped_column(String(500), nullable=True)

    publicado: Mapped[bool] = mapped_column(Boolean, default=True)
    destaque: Mapped[bool] = mapped_column(Boolean, default=False)
    criado_em: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(UTC))
    criado_por_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
