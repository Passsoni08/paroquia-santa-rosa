from collections import defaultdict
from time import time

from fastapi import FastAPI, Request, Response, status
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware


class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        response: Response = await call_next(request)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
        response.headers["Content-Security-Policy"] = (
            "default-src 'self'; "
            "img-src 'self' data: https:; "
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
            "font-src 'self' https://fonts.gstatic.com; "
            "frame-src https://www.google.com https://www.youtube.com https://player.vimeo.com; "
            "script-src 'self' 'unsafe-inline';"
        )
        return response


class RateLimitMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, limits: dict[str, tuple[int, int]] | None = None):
        super().__init__(app)
        self.limits = limits or {}
        self.requests: dict[str, list[float]] = defaultdict(list)

    async def dispatch(self, request: Request, call_next):
        path = request.url.path
        method = request.method

        key = f"{method} {path}"
        limit_config = self.limits.get(key)

        if limit_config and request.client:
            max_requests, window_seconds = limit_config
            client_ip = request.client.host
            rate_key = f"{client_ip}:{key}"

            now = time()
            self.requests[rate_key] = [
                t for t in self.requests[rate_key] if now - t < window_seconds
            ]

            if len(self.requests[rate_key]) >= max_requests:
                return JSONResponse(
                    status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                    content={"detail": "Muitas requisições. Tente novamente mais tarde."},
                )

            self.requests[rate_key].append(now)

        return await call_next(request)


def setup_middleware(app: FastAPI) -> None:
    app.add_middleware(SecurityHeadersMiddleware)
    app.add_middleware(
        RateLimitMiddleware,
        limits={
            "POST /api/v1/contato": (3, 3600),
            "POST /api/v1/newsletter/inscrever": (5, 3600),
        },
    )
