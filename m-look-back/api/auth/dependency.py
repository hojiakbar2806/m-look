from fastapi import Depends
from fastapi.security import HTTPBearer
from sqlalchemy.ext.asyncio import AsyncSession

from api.auth import  utils, schemas
from database.session import get_async_session 


http_bearer = HTTPBearer()

async def valid_user(user:schemas.Register, session: AsyncSession = Depends(get_async_session)):
    return await utils.is_exist_user(user, session)


async def get_verified_user(user: schemas.LoginSchema, session: AsyncSession = Depends(get_async_session)):
    return await utils.verify_user(user.username, user.password, session)
