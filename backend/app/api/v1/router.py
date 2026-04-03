from fastapi import APIRouter

from app.api.v1 import auth, avisos, contato, eventos, liturgia, midia, newsletter, noticias

api_router = APIRouter(prefix="/api/v1")

api_router.include_router(auth.router)
api_router.include_router(liturgia.router)
api_router.include_router(avisos.router)
api_router.include_router(eventos.router)
api_router.include_router(noticias.router)
api_router.include_router(midia.router)
api_router.include_router(contato.router)
api_router.include_router(newsletter.router)
