from models.user import User
from api.auth import schemas
from utils import check_password
from fastapi import HTTPException
from sqlalchemy.future import select
from database.session import get_async_session
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.ext.asyncio import AsyncSession


async def validate_get_user(username: str, password: str, session: AsyncSession) -> User:
    un_auth_exception = HTTPException(
        status_code=401,
        detail="Email nomi yoki parol noto'g'ri",
        headers={"WWW-Authenticate": "Bearer"},
    )

    stmt = select(User).where(User.email == username)
    user = (await session.execute(stmt)).scalar_one_or_none()

    if user is None or not check_password(password, user.hashed_password):
        raise un_auth_exception

    return user


async def exist_email(user: schemas.UserInSchema, session: AsyncSession) -> User:
    stmt = select(User).where(User.email == user.email)
    db_user = (await session.execute(stmt)).scalar_one_or_none()

    if db_user is None:
        return user
    raise HTTPException(status_code=400, detail="Email already in use")
