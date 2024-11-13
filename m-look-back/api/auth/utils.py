from models.user import User
from fastapi import HTTPException
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.ext.asyncio import AsyncSession

from core.security.hashing import check_password


async def verify_user(username: str, password: str, session: AsyncSession) -> User:
    stmt = select(User)
    query = stmt.where(User.username == username)
    result = await session.execute(query)
    user = result.scalar_one_or_none()

    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    valid_password = check_password(password, user.hashed_password)
    if not valid_password:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    return user


async def is_exist_user(user: User, session: AsyncSession) -> User:
    stmt_email = select(User).where(User.email == user.email)
    db_user_email = (await session.execute(stmt_email)).scalar_one_or_none()
    if db_user_email:
        raise HTTPException(status_code=400, detail="Email already in use")

    stmt_username = select(User).where(User.username == user.username)
    db_user_username = (await session.execute(stmt_username)).scalar_one_or_none()
    if db_user_username:
        raise HTTPException(status_code=400, detail="Username already in use")
    return user
