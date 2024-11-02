import jwt
from sqlalchemy.future import select
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.security import HTTPAuthorizationCredentials

from core.config import settings
from datetime import datetime, timedelta
from models.user import User 

RS_ALGORITHM = settings.JWT.RS_ALGORITHM
HS_ALGORITHM = settings.JWT.HS_ALGORITHM

PRIVATE_KEY = settings.JWT.PRIVATE_KEY_PATH.read_text()
PUBLIC_KEY = settings.JWT.PUBLIC_KEY_PATH.read_text()

SECRET_KEY = settings.JWT.SECRET_KEY

ACCESS_EXP_MIN = settings.JWT.ACCESS_TOKEN_EXPIRES_MINUTES
REFRESH_EXP_MIN = settings.JWT.REFRESH_TOKEN_EXPIRES_MINUTES


def encode_jwt(payload: dict, token_type: str, expires_delta: timedelta) -> str:
    """
    JWT token yaratish funktsiyasi
    """
    try:
        to_encode = payload.copy()
        now = datetime.utcnow()
        if not isinstance(expires_delta, timedelta):
            raise ValueError("expires_delta must be a timedelta instance")
        exp = now + expires_delta
        to_encode.update({"exp": exp, "iat": now, "type": token_type})
        return jwt.encode(to_encode, PRIVATE_KEY, algorithm=RS_ALGORITHM)
    except jwt.PyJWTError as e:
        raise HTTPException(
            status_code=500,
            detail=f"Token yaratishda xatolik: {str(e)}",
        )


def decode_jwt(token: str) -> dict:
    """
    Tokenni dekodlash
    """
    try:
        payload = jwt.decode(token, PUBLIC_KEY, algorithms=[RS_ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Access token eski")
    except jwt.InvalidTokenError as e:
        raise HTTPException(
            status_code=401, detail=f"Yaroqsiz token: {str(e)}")


def create_access_token(email: str, expires_delta: timedelta | None = None) -> str:
    jwt_payload = {"sub": email}
    expires_delta = expires_delta or timedelta(minutes=ACCESS_EXP_MIN)
    return encode_jwt(jwt_payload, "access", expires_delta)


def create_refresh_token( email: str, expires_delta: timedelta | None = None) -> str:
    jwt_payload = {"sub": email}
    expires_delta = expires_delta or timedelta(minutes=REFRESH_EXP_MIN)
    return encode_jwt(jwt_payload, "refresh", expires_delta)


async def verify_user(token: HTTPAuthorizationCredentials, session: AsyncSession) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Autentifikatsiya ma'lumotlari yaroqsiz",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = decode_jwt(token.credentials)  
        email = payload.get("sub")
        stmt = select(User).where(User.email == email)
        result = await session.execute(stmt) 
        user = result.scalar_one_or_none()
        if user is None:
            raise credentials_exception
    except Exception:
        raise credentials_exception

    return user

def generate_activation_token(email: str):
    payload = {
        "sub": email,
        "exp": datetime.utcnow() + timedelta(hours=1)  
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=HS_ALGORITHM)

def verify_activation_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[HS_ALGORITHM])
        email = payload.get("sub")
        if email is None:
            return None
        return email
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")