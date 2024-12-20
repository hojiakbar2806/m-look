from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.ext.asyncio import AsyncSession

from schemas import auth as auth_schemas
from core.enums import TokenType
from core.security.hashing import check_password
from core.security.utils import verify_user_token
from database.session import get_async_session
from models.user import User
from utils import utils


http_bearer = HTTPBearer()


async def current_auth_user(
        auth: HTTPAuthorizationCredentials = Depends(http_bearer),
        session: AsyncSession = Depends(get_async_session)
) -> User:
    return await verify_user_token(auth.credentials, session, TokenType.ACCESS)


async def get_not_exist_user(
        user: auth_schemas.Register, session: AsyncSession = Depends(get_async_session)
) -> auth_schemas.Register:
    _get_user_by_username = await utils.get_user_by_username(session, user.username)
    if _get_user_by_username:
        raise HTTPException(status_code=400, detail="Username already exists")

    _get_user_by_email = await utils.get_user_by_email(session, user.email)
    if _get_user_by_email:
        raise HTTPException(status_code=400, detail="Email already in use")
    return user


async def get_verified_user(
        user: auth_schemas.LoginSchema, session: AsyncSession = Depends(get_async_session)
) -> auth_schemas.LoginSchema:
    user_in_db = await utils.get_user_by_username(session, user.username)
    if user_in_db is None:
        raise HTTPException(status_code=400, detail="User not found")

    if not check_password(user.password, user_in_db.hashed_password):
        raise HTTPException(status_code=400, detail="Wrong password")
    return user
