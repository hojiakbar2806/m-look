from pathlib import Path
from dotenv import load_dotenv
from pydantic_settings import BaseSettings

load_dotenv()

PROJECT_DIR = Path(__file__).resolve().parent.parent.parent
BASE_DIR = Path(__file__).resolve().parent.parent
CORE = Path(__file__).resolve().parent

class GlobalSettings(BaseSettings):
    DEBUG: bool = True
    APP_ENV: str = "development"
    RUN_ON_POSTGRES: bool = False

    class Config:
        env_file_encoding = "utf-8"
        extra = "ignore"

global_settings = GlobalSettings()


class DBSettings(BaseSettings):
    POSTGRES_DB: str 
    POSTGRES_HOST: str
    POSTGRES_PORT: int 
    POSTGRES_USER: str 
    POSTGRES_PASSWORD: str
    SQL_DB_URL: str

    @property
    def URL(self) -> str:
        if global_settings.RUN_ON_POSTGRES:
            return f"postgresql+asyncpg://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"
        else:
            return f"sqlite+aiosqlite:///{str(BASE_DIR/self.SQL_DB_URL)}"

    class Config:
        env_file = "../../.env"
        env_file_encoding = "utf-8"
        extra = "ignore"

class REDISSettings(BaseSettings):
    REDIS_HOST: str
    REDIS_PORT: int

    @property
    def REDIS_URL(self) -> str:
        return f"redis://{self.REDIS_HOST}:{self.REDIS_PORT}"
    
    class Config:
        env_file_encoding = "utf-8"
        extra = "ignore"

class JWTSettings(BaseSettings):
    RS_ALGORITHM: str = "RS256"
    HS_ALGORITHM: str = "HS256"
    PRIVATE_KEY_PATH: Path = CORE / "certs" / "jwt-private.pem"
    PUBLIC_KEY_PATH: Path = CORE / "certs" / "jwt-public.pem"
    ACCESS_TOKEN_EXPIRES_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRES_MINUTES: int = 60

    SECRET_KEY: str = "f56bd6bc8efed7bad12675f761e69f36ff8f403cc471da0028b8ea6cd95bfbe9"

    class Config:
        env_file_encoding = "utf-8"
        extra = "ignore"

class Settings(DBSettings):
    DEBUG: bool = global_settings.DEBUG

    DB: DBSettings = DBSettings()
    JWT: JWTSettings = JWTSettings()

    class Config:
        env_file_encoding = "utf-8"
        extra = "ignore"

settings = Settings()

print("---------------------")
print(f"APP_ENV: {global_settings.APP_ENV}")
print("---------------------")
print(f"DEBUG: {settings.DEBUG}")
print("---------------------")
print(f"DB_URL: {settings.DB.URL}")
print("---------------------")
