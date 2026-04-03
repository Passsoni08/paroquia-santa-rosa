from datetime import date, datetime

from pydantic import BaseModel, ConfigDict


class AvisoCreate(BaseModel):
    titulo: str
    conteudo: str
    categoria: str = "informativo"
    ativo: bool = True
    publicado: bool = True
    data_expiracao: date | None = None


class AvisoUpdate(BaseModel):
    titulo: str | None = None
    conteudo: str | None = None
    categoria: str | None = None
    ativo: bool | None = None
    publicado: bool | None = None
    data_expiracao: date | None = None


class AvisoResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    titulo: str
    conteudo: str
    categoria: str
    ativo: bool
    publicado: bool
    data_expiracao: date | None
    criado_em: datetime
    atualizado_em: datetime
    criado_por_id: int
