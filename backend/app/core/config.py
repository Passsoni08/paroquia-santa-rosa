from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    # PostgreSQL
    POSTGRES_USER: str = "igreja_user"
    POSTGRES_PASSWORD: str = "troque_esta_senha"
    POSTGRES_DB: str = "igreja_db"
    POSTGRES_HOST: str = "postgres"
    POSTGRES_PORT: int = 5432

    # Database URL
    DATABASE_URL: str = ""

    # JWT
    JWT_SECRET_KEY: str = "troque_esta_chave"
    JWT_REFRESH_SECRET_KEY: str = "troque_esta_chave_refresh"
    JWT_ALGORITHM: str = "HS256"
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    JWT_REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # Uploads
    MAX_UPLOAD_SIZE_MB: int = 10
    UPLOAD_DIR: str = "/app/uploads"

    # CORS
    CORS_ORIGINS: str = "http://localhost:3000,http://localhost:5173"

    # Liturgia API
    LITURGIA_API_URL: str = "https://liturgia.up.railway.app/v2"

    @property
    def database_url(self) -> str:
        if self.DATABASE_URL:
            return self.DATABASE_URL
        return (
            f"postgresql+asyncpg://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}"
            f"@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"
        )

    @property
    def cors_origins_list(self) -> list[str]:
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",")]

    @property
    def max_upload_size_bytes(self) -> int:
        return self.MAX_UPLOAD_SIZE_MB * 1024 * 1024


settings = Settings()
