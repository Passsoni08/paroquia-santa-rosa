from datetime import UTC, date, datetime

from sqlalchemy import Date, DateTime
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base


class LiturgiaCache(Base):
    __tablename__ = "liturgia_cache"

    data: Mapped[date] = mapped_column(Date, primary_key=True)
    payload: Mapped[dict] = mapped_column(JSONB, nullable=False)
    sincronizado_em: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(UTC)
    )
