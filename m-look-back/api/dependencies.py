from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Depends


async def ensure_username(user, session: AsyncSession = Depends(get_async_session)):
    return await utils.exist_email(user, session)


async def get_validated_user(user:, session: AsyncSession = Depends(get_async_session)):
    return await utils.validate_get_user(user.email, user.password, session)
