from fastapi import Depends
from fastapi.security import HTTPBearer
from sqlalchemy.ext.asyncio import AsyncSession

from api.auth import  utils, schemas
from database.session import get_async_session 


http_bearer = HTTPBearer()

async def ensure_username(user: schemas.UserInSchema, session: AsyncSession = Depends(get_async_session)):
    return await utils.exist_email(user, session)


async def get_validated_user(user: schemas.LoginSchema, session: AsyncSession = Depends(get_async_session)):
    return await utils.validate_get_user(user.username, user.password, session)
