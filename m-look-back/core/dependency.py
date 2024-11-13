from fastapi import Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from core.security.utils import verify_user_token
from database.session import get_async_session
from models.user import User
from core.enums import TokenType

auth_schema = HTTPBearer()


async def current_active_user(auth: HTTPAuthorizationCredentials = Depends(auth_schema), session: AsyncSession = Depends(get_async_session)) -> User:
    user = await verify_user_token(auth.credentials, session, TokenType.ACCESS)
    print(user.username)
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User is not active"
        )
    return user
