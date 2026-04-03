# Igreja Website — Paróquia Santa Rosa de Viterbo

Website institucional + painel administrativo da Paróquia Santa Rosa de Viterbo (SP).

## Stack

- **Backend:** FastAPI + PostgreSQL (asyncpg) + SQLAlchemy + Alembic
- **Frontend:** React 18 + Vite + Styled Components
- **Infra:** Docker Compose (PostgreSQL, FastAPI, Nginx)

## Setup

### 1. Configurar variáveis de ambiente

```bash
cp .env.example backend/.env
```

Edite `backend/.env` e gere as chaves JWT:

```bash
openssl rand -hex 32  # usar para JWT_SECRET_KEY
openssl rand -hex 32  # usar para JWT_REFRESH_SECRET_KEY
```

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
docker-compose exec backend task createsuperuser
```

### 5. Acessar

- **Site:** http://localhost:3000
- **Admin:** http://localhost:3000/admin
- **API:** http://localhost:8000/docs

## Desenvolvimento local

### Backend

```bash
cd backend
pip install -e .
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## SEO

Recomenda-se gerar um `sitemap.xml` com as rotas públicas:
`/`, `/sobre`, `/sacramentos`, `/horarios`, `/eventos`, `/noticias`, `/galeria`, `/videos`, `/avisos`, `/contato`
