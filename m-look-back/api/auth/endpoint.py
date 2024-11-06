from datetime import datetime, timedelta
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import APIRouter, Depends, HTTPException, Request, Response, status, Cookie

from api.auth import schemas
from core.dependency import get_current_user
from core.enums import TokenType
from core.security.jwt import create_refresh_token, decode_activation_token, generate_activation_token
from models.user import User
from core.config import settings
from core.security.hashing import hash_password
from database.session import get_async_session
from api.auth.dependency import ensure_username, get_validated_user
from core.security.utils import create_access_token, verify_user_token

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register_user(
    session: AsyncSession = Depends(get_async_session),
    user: schemas.UserInSchema = Depends(ensure_username),
):
    user.hashed_password = hash_password(user.hashed_password)
    new_user = User(**user.dict())
    token = generate_activation_token(new_user.email)

    session.add(new_user)
    await session.commit()
    await session.refresh(new_user)

    return {"token": token}


@router.post("/activate/{token}", status_code=status.HTTP_200_OK)
async def activate_user(response: Response, token: str, session: AsyncSession = Depends(get_async_session)):
    email = decode_activation_token(token).get("sub")
    stmt = select(User).where(User.email == email)
    user = (await session.execute(stmt)).scalar_one_or_none()
    if user is None:
        raise HTTPException(status_code=400, detail="User not found")
    user.is_active = True
    await session.commit()

    access_token = create_access_token(email)
    refresh_token = create_refresh_token(email)

    expires = datetime.utcnow() + timedelta(days=30)

    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        max_age=30 * 24 * 60 * 60,
        expires=int(expires.timestamp()),
        httponly=True,
        secure=False,
        samesite='lax'
    )
    return schemas.TokenResponse(access_token=access_token, message="Account verified", status="success")


@router.post("/login", status_code=status.HTTP_200_OK)
async def login_user(response: Response, user: User = Depends(get_validated_user)):
    access_token = create_access_token(user.email)
    refresh_token = create_refresh_token(user.email)

    expires = datetime.utcnow() + timedelta(days=30)

    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        max_age=30 * 24 * 60 * 60,
        expires=expires.strftime("%a, %d %b %Y %H:%M:%S GMT"),
        httponly=False,
        secure=False,
        samesite='lax'
    )
    return schemas.TokenResponse(access_token=access_token, message="Login successfully", status="success")


def verify_access_token(request: Request):
    access_token = request.cookies.get("access_token")
    if not access_token:
        raise HTTPException(
            status_code=401, detail="Foydalanuvchi tizimga kirmagan")
    return access_token


@router.get("/me")
async def get_me(current_user: User = Depends(get_current_user)):
    return {current_user}


@router.post("/refresh-token")
async def refresh_session(refresh_token: str = Cookie(None), session: AsyncSession = Depends(get_async_session)):
    if not refresh_token:
        raise HTTPException(
            status_code=400, detail="Refresh token not provided"
        )
    user = await verify_user_token(refresh_token, session, TokenType.REFRESH)
    access_token = create_access_token(email=user.email)

    return schemas.TokenResponse(access_token=access_token, message="Access token successfully refreshed", status="success")
