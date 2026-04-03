from datetime import date, datetime

from pydantic import BaseModel, ConfigDict


class LiturgiaResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    data: date
    payload: dict
    sincronizado_em: datetime
    desatualizado: bool = False
