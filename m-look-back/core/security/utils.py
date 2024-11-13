from sqlalchemy.future import select
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from models.user import User
from core.enums import TokenType
from core.security.jwt import decode_jwt


async def verify_user_token(token: str, session: AsyncSession, token_type: TokenType) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid token",
        headers={"WWW-Authenticate": "Bearer"},
    )

    payload = decode_jwt(token)
    sub = payload.get("sub")

    if not sub:
        raise credentials_exception

    stmt = select(User).where(User.username == sub)
    user = (await session.execute(stmt)).scalar_one_or_none()

    if user is None:
        raise credentials_exception
    if token_type == TokenType.ACCESS and payload.get("type") != TokenType.ACCESS:
        raise credentials_exception
    elif token_type == TokenType.REFRESH and payload.get("type") != TokenType.REFRESH:
        raise credentials_exception
    return user
