from datetime import timedelta
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import APIRouter, Depends, HTTPException, Response, status

from api.auth import schemas
from models.user import User
from core.config import settings
from utils.hashing import hash_password
from core.dependency import get_auth_user
from database.session import get_async_session
from api.auth.dependency import ensure_username, get_validated_user
from core.security import (
    create_access_token,
    create_refresh_token,
    generate_activation_token,
    verify_activation_token,
    verify_user,
)

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register_user(
    session: AsyncSession = Depends(get_async_session),
    user: schemas.UserInSchema = Depends(ensure_username),
):
    user.hashed_password = hash_password(user.hashed_password)
    new_user = User(**user.dict())

    session.add(new_user)
    await session.commit()
    await session.refresh(new_user)

    token = generate_activation_token(new_user.email)
    return {"token": token}


@router.post("/activate/{token}", status_code=status.HTTP_200_OK)
async def activate_user(token: str, session: AsyncSession = Depends(get_async_session)):
    email = verify_activation_token(token)
    stmt = select(User).where(User.email == email)
    user = (await session.execute(stmt)).scalar_one_or_none()
    if user is None:
        raise HTTPException(status_code=400, detail="User not found")
    user.is_active = True
    await session.commit()

    acces_token = create_access_token(email)
    refresh_token = create_refresh_token(email)
    return schemas.Token(access_token=acces_token, refresh_token=refresh_token)


@router.post("/login", status_code=status.HTTP_200_OK)
async def login_user(response: Response, user: User = Depends(get_validated_user)):
    access_token = create_access_token(user.id)
    refresh_token = create_refresh_token(user.id)

    response.set_cookie(
        key="access_token",
        value=access_token,
        expires=int(
            timedelta(settings.JWT.ACCESS_TOKEN_EXPIRES_MINUTES).total_seconds()),
        secure=False,
        samesite="none",
        httponly=False,
    )
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        expires=int(
            timedelta(settings.JWT.REFRESH_TOKEN_EXPIRES_MINUTES).total_seconds()
        ),
        secure=False,
        samesite="none",
        httponly=False,
    )

    return {"message": "Login successful"}


@router.get("/me")
async def get_me(user: User = Depends(get_auth_user)):
    return user
