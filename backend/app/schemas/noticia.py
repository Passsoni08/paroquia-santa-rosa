from datetime import datetime

from pydantic import BaseModel, ConfigDict


class NoticiaCreate(BaseModel):
    titulo: str
    resumo: str
    conteudo: str
    publicado: bool = False


class NoticiaUpdate(BaseModel):
    titulo: str | None = None
    resumo: str | None = None
    conteudo: str | None = None
    publicado: bool | None = None


class NoticiaResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    titulo: str
    slug: str
    resumo: str
    conteudo: str
    imagem_capa_url: str | None
    publicado: bool
    publicado_em: datetime | None
    criado_em: datetime
    atualizado_em: datetime
    criado_por_id: int
