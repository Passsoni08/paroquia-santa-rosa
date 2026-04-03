---
name: backend-endpoint
description: Gera a estrutura completa de um endpoint backend (model, schema, repository, router) seguindo os padrões do projeto
allowed-tools: Read Grep Glob Write Edit Bash
---

# Criar endpoint backend para: $ARGUMENTS

Consulte `prompt-igreja-catolica-v3.md` para os detalhes do recurso solicitado.

## Passos

1. **Leia os arquivos existentes** em `backend/app/` para entender os padrões já implementados (models, schemas, repositories, routers existentes).

2. **Crie o Model** em `backend/app/models/$ARGUMENTS.py`:
   - SQLAlchemy async model
   - Campos conforme spec
   - `__tablename__` em snake_case plural

3. **Crie os Schemas** em `backend/app/schemas/$ARGUMENTS.py`:
   - `{Nome}Create` — campos para criação
   - `{Nome}Update` — campos opcionais para atualização
   - `{Nome}Response` — resposta com `model_config = ConfigDict(from_attributes=True)`

4. **Crie o Repository** em `backend/app/repositories/{$ARGUMENTS}_repo.py`:
   - Todas as funções `async`
   - CRUD completo: `create`, `get_by_id`, `get_all` (com paginação), `update`, `delete`
   - Recebe `AsyncSession` como parâmetro

5. **Crie o Router** em `backend/app/api/v1/$ARGUMENTS.py`:
   - Prefixo e tags adequados
   - Endpoints REST: GET (lista), GET (detalhe), POST, PUT, DELETE
   - Proteger rotas admin com `require_admin` dependency
   - Rotas públicas com `get_db` apenas

6. **Registre o router** em `backend/app/api/v1/router.py` via `include_router`.

7. **Crie a migration** com alembic:
   - Registre o model em `backend/app/models/__init__.py`
   - Gere: `cd backend && alembic revision --autogenerate -m "add {nome} table"`

8. **Verifique** com `cd backend && ruff check app/`.
