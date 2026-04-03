from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr


class NewsletterCreate(BaseModel):
    email: EmailStr


class NewsletterResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    email: str
    criado_em: datetime
