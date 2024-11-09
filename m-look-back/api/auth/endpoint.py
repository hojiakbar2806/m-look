from sqlalchemy import select
from datetime import datetime, timedelta
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import APIRouter, Depends, HTTPException, Response, status, Cookie

from api.auth import schemas
from models.user import User
from core.security import jwt
from core.enums import TokenType
from core.dependency import get_current_user
from database.session import get_async_session
from core.security.hashing import hash_password
from core.security.utils import verify_user_token
from api.auth.dependency import ensure_username, get_validated_user

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register_user(
    session: AsyncSession = Depends(get_async_session),
    user: schemas.UserInSchema = Depends(ensure_username),
):
    user.hashed_password = hash_password(user.hashed_password)
    new_user = User(**user.dict())
    token = jwt.generate_activation_token(new_user.email)

    session.add(new_user)
    await session.commit()
    await session.refresh(new_user)

    return {"token": token}


@router.post("/activate/{token}", status_code=status.HTTP_200_OK)
async def activate_user(response: Response, token: str, session: AsyncSession = Depends(get_async_session)):
    email = jwt.decode_activation_token(token).get("sub")
    stmt = select(User).where(User.email == email)
    user = (await session.execute(stmt)).scalar_one_or_none()
    if user is None:
        raise HTTPException(status_code=400, detail="User not found")
    user.is_active = True
    await session.commit()

    access_token = jwt.create_access_token(email)
    refresh_token = jwt.create_refresh_token(email)

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
    refresh_token = jwt.create_refresh_token(user.email)

    expires = datetime.utcnow() + timedelta(days=30)

    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=True,
        samesite="None",
        max_age=2592000,
        expires=int(expires.timestamp())
    )

    return {"message": "Login successfully", "status": "success"}


@router.post("/logout")
def logout_user(response: Response, refresh_token: str = Cookie(None)):
    if not refresh_token:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="You are not logged in")
    response.set_cookie(
        key="refresh_token",
        value="",
        httponly=True,
        secure=True,
        samesite="None",
        max_age=0,
        expires=0
    )
    return {"message": "Logged out successfully"}


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
    access_token = jwt.create_access_token(email=user.email)

    return schemas.TokenResponse(access_token=access_token, message="Access token successfully refreshed", status="success")
