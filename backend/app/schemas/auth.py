from pydantic import BaseModel, EmailStr


class LoginRequest(BaseModel):
    email: EmailStr
    senha: str


class TokenResponse(BaseModel):
    message: str = "Login realizado com sucesso"
