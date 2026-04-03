import logging
from datetime import date

import httpx

from app.core.config import settings
from app.core.database import async_session
from app.repositories import liturgia_repo

logger = logging.getLogger(__name__)


async def sincronizar_liturgia() -> None:
    hoje = date.today().isoformat()
    try:
        async with httpx.AsyncClient(timeout=10) as client:
            response = await client.get(f"{settings.LITURGIA_API_URL}/{hoje}")
            response.raise_for_status()
            dados = response.json()

        async with async_session() as db:
            await liturgia_repo.upsert(db, data=date.today(), payload=dados)
            await db.commit()

        logger.info("Liturgia sincronizada para %s", hoje)
    except Exception:
        logger.exception("Falha ao sincronizar liturgia para %s", hoje)
