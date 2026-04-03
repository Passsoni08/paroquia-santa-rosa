from datetime import datetime

from pydantic import BaseModel, ConfigDict


class MidiaImagemCreate(BaseModel):
    titulo: str
    descricao: str | None = None
    categoria: str | None = None
    publicado: bool = True


class MidiaVideoCreate(BaseModel):
    url: str
    titulo: str
    descricao: str | None = None
    publicado: bool = True
    destaque: bool = False


class MidiaUpdate(BaseModel):
    titulo: str | None = None
    descricao: str | None = None
    categoria: str | None = None
    publicado: bool | None = None
    destaque: bool | None = None


class MidiaResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    tipo: str
    titulo: str
    descricao: str | None
    categoria: str | None
    arquivo_url: str | None
    arquivo_nome: str | None
    tamanho_bytes: int | None
    video_url: str | None
    video_id: str | None
    plataforma: str | None
    thumbnail_url: str | None
    publicado: bool
    destaque: bool
    criado_em: datetime
    criado_por_id: int
