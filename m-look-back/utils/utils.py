from fastapi.responses import JSONResponse
from datetime import datetime, timedelta
from sqlalchemy.ext.asyncio import AsyncSession

from sqlalchemy import select

from core.security import jwt
from core.config import settings
from models.user import User


def to_came_case(name: str) -> str:
    return "".join([word.lower() for word in name.split("_")])+"s"


def create_tokens(username: str):
    refresh_token = jwt.create_refresh_token(username)
    access_token = jwt.create_access_token(username)
    return refresh_token, access_token


def set_refresh_token_cookie(response: JSONResponse, refresh_token: str):
    expires = datetime.utcnow() + timedelta(minutes=settings.REFRESH_TOKEN_EXPIRES_MINUTES)
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        expires=int(expires.timestamp()),
        httponly=True,
        secure=True,
        samesite='None'
    )


async def get_user_by_username(session: AsyncSession, username: str) -> User:
    stmt = select(User)
    query = stmt.where(User.username == username)
    result = await session.execute(query)
    user_in_db = result.scalar_one_or_none()
    return user_in_db


async def get_user_by_email(session: AsyncSession, email: str):
    stmt = select(User)
    query = stmt.where(User.email == email)
    result = await session.execute(query)
    user_in_db = result.scalar_one_or_none()
    return user_in_db
