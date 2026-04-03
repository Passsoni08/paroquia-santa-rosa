---
paths:
  - "backend/**"
---

# Regras do Backend

## Arquitetura

- **Async-first**: todas as funções de I/O devem ser `async`. Usar `asyncpg` via SQLAlchemy async.
- **Repository pattern**: acesso a dados sempre via `repositories/`. Nunca fazer queries direto nos routers.
- **Service layer**: lógica de negócio em `services/`. Routers só orquestram.
- **Pydantic v2**: usar `BaseSettings` para config, `BaseModel` para schemas. Sempre com `model_config`.

## Autenticação e Segurança

- JWT via `PyJWT` + refresh token. Tokens enviados em cookies `httpOnly`, `Secure`, `SameSite=Lax`.
- Senhas com `bcrypt`. Comparação com `hmac.compare_digest`.
- Headers de segurança: CSP, HSTS, X-Frame-Options, X-Content-Type-Options.
- Rate limiting por IP: contato 3/hora, newsletter 5/hora.
- CORS configurado via middleware.

## Padrões de código

- Lint e format com `ruff`.
- Migrations com `alembic`. Nunca alterar o banco manualmente.
- Taskipy para scripts: `task createsuperuser`, `task migrate`.
- Uploads salvos em `/app/uploads/` com metadados (arquivo_url, arquivo_nome, tamanho_bytes).

## Endpoints

- Prefixo: `/api/v1/`
- Router centralizado em `api/v1/router.py` com `include_router`.
- Dependencies em `api/v1/deps.py`: `get_db`, `get_current_user`, `require_admin`.

## Scheduler

- APScheduler para sync diário da liturgia às 00:05.
- Inicializado no `startup` event do FastAPI em `main.py`.
- Retry logic + fallback para dia anterior se API offline.
