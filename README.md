# Igreja Website — Paróquia Santa Rosa de Viterbo

Website institucional + painel administrativo da Paróquia Santa Rosa de Viterbo (SP).

## Stack

- **Backend:** FastAPI + PostgreSQL (asyncpg) + SQLAlchemy + Alembic
- **Frontend:** React 18 + Vite + Styled Components
- **Infra:** Docker Compose (PostgreSQL, FastAPI, Nginx)

---

## Rodar com Docker (recomendado)

### 1. Configurar variáveis de ambiente

```bash
cp .env.example backend/.env
```

Edite `backend/.env` e gere as chaves JWT:

```bash
openssl rand -hex 32  # usar para JWT_SECRET_KEY
openssl rand -hex 32  # usar para JWT_REFRESH_SECRET_KEY
```

> No Windows sem `openssl`, use Python:
> ```bash
> python -c "import secrets; print(secrets.token_hex(32))"
> ```

### 2. Subir os containers

```bash
docker-compose up -d --build
```

### 3. Rodar migrations

```bash
docker-compose exec backend alembic upgrade head
```

### 4. Criar superusuário

```bash
docker-compose exec backend python -m app.cli.createsuperuser
```

### 5. Acessar

- **Site:** http://localhost:3000
- **Admin:** http://localhost:3000/admin
- **API docs:** http://localhost:8000/docs

---

## Desenvolvimento local (sem Docker)

### Pré-requisitos

- Python 3.12+
- Node.js 20+
- PostgreSQL 16 rodando localmente

### 1. Criar banco de dados

```sql
CREATE USER igreja_user WITH PASSWORD 'troque_esta_senha';
CREATE DATABASE igreja_db OWNER igreja_user;
```

### 2. Configurar backend

```bash
cp .env.example backend/.env
```

Edite `backend/.env` e altere:

```env
POSTGRES_HOST=localhost
DATABASE_URL=postgresql+asyncpg://igreja_user:troque_esta_senha@localhost:5432/igreja_db
UPLOAD_DIR=./uploads
```

Gere as chaves JWT (veja passo 1 da seção Docker acima).

### 3. Instalar e rodar o backend

```bash
cd backend
pip install -e ".[dev]"
mkdir -p uploads
alembic upgrade head
python -m app.cli.createsuperuser
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### 4. Instalar e rodar o frontend

```bash
cd frontend
npm install
npm run dev
```

O Vite roda em http://localhost:5173 e faz proxy automático de `/api` e `/uploads` para o backend em `localhost:8000`.

### 5. Acessar

- **Site:** http://localhost:5173
- **Admin:** http://localhost:5173/admin
- **API docs:** http://localhost:8000/docs

---

## SEO

Recomenda-se gerar um `sitemap.xml` com as rotas públicas:
`/`, `/sobre`, `/sacramentos`, `/horarios`, `/eventos`, `/noticias`, `/galeria`, `/videos`, `/avisos`, `/contato`
