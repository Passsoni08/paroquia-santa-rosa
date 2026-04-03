from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr


class ContatoCreate(BaseModel):
    nome: str
    email: EmailStr
    telefone: str | None = None
    assunto: str
    mensagem: str


class ContatoResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    nome: str
    email: str
    telefone: str | None
    assunto: str
    mensagem: str
    lido: bool
    criado_em: datetime
