from datetime import datetime

from pydantic import BaseModel, ConfigDict


class EventoCreate(BaseModel):
    titulo: str
    descricao: str
    data_inicio: datetime
    data_fim: datetime | None = None
    local: str | None = None
    publicado: bool = True


class EventoUpdate(BaseModel):
    titulo: str | None = None
    descricao: str | None = None
    data_inicio: datetime | None = None
    data_fim: datetime | None = None
    local: str | None = None
    publicado: bool | None = None


class EventoResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    titulo: str
    descricao: str
    data_inicio: datetime
    data_fim: datetime | None
    local: str | None
    imagem_url: str | None
    publicado: bool
    criado_em: datetime
    atualizado_em: datetime
    criado_por_id: int
