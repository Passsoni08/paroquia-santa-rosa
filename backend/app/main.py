from contextlib import asynccontextmanager

from apscheduler.schedulers.asyncio import AsyncIOScheduler
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.api.v1.router import api_router
from app.core.config import settings
from app.core.middleware import setup_middleware
from app.services.liturgia_sync import sincronizar_liturgia

scheduler = AsyncIOScheduler()
scheduler.add_job(sincronizar_liturgia, "cron", hour=0, minute=5)


@asynccontextmanager
async def lifespan(app: FastAPI):
    scheduler.start()
    await sincronizar_liturgia()
    yield
    scheduler.shutdown()


app = FastAPI(
    title="Paróquia Santa Rosa de Viterbo — API",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security headers + rate limiting
setup_middleware(app)

# Static files (uploads em dev)
app.mount("/uploads", StaticFiles(directory=settings.UPLOAD_DIR), name="uploads")

# Routers
app.include_router(api_router)
