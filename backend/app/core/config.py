from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "DocuSync"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "DEVELOPMENT_SECRET_KEY_CHANGE_IN_PROD"
    
    # CORS
    BACKEND_CORS_ORIGINS: List[str] = ["http://localhost:3000"]

    # Security
    MAX_UPLOAD_SIZE: int = 10 * 1024 * 1024  # 10MB

    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
