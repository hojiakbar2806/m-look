from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from core.security.jwt import create_access_token
from core.security.utils import verify_user_token
from database.session import get_async_session
from models.user import User
from core.enums import TokenType

auth_schema = HTTPBearer()


async def get_current_user(auth:HTTPAuthorizationCredentials=Depends(auth_schema), session: AsyncSession = Depends(get_async_session)) -> User:
    return await verify_user_token(auth.credentials, session, TokenType.ACCESS)

