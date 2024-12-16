from sqlalchemy import select
from datetime import datetime, timedelta
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.responses import JSONResponse
from fastapi import APIRouter, Depends, HTTPException, Cookie

from api.auth import schemas
from models.user import Profile, User
from core.security import jwt
from core.enums import TokenType
from database.session import get_async_session
from core.security.hashing import hash_password
from core.security.utils import verify_user_token
from api.auth.dependency import get_verified_user, valid_user
from core.config import settings

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/register")
async def register_user(
    user: schemas.Register = Depends(valid_user),
    session: AsyncSession = Depends(get_async_session),
):

    user.hashed_password = hash_password(user.hashed_password)
    new_user = User(**user.model_dump())
    token = jwt.generate_activation_token(new_user.username)
    session.add(new_user)
    await session.commit()
    new_profile = Profile(
        user_id=new_user.id,
        gender=None,
        birth_date=None,
        bio=None,
    )
    session.add(new_profile)
    await session.commit()
    await session.refresh(new_user)
    return JSONResponse(
        status_code=200,
        content={"message": "Activation link sent to your email", "token": token}
    )


@router.post("/activate/{token}")
async def activate_user(token: str, session: AsyncSession = Depends(get_async_session)):
    sub = jwt.decode_activation_token(token).get("sub")
    stmt = select(User).where(User.username == sub)
    user = (await session.execute(stmt)).scalar_one_or_none()
    if user is None:
        raise HTTPException(status_code=400, detail="User not found")
    user.is_active = True
    await session.commit()
    refresh_token = jwt.create_refresh_token(sub)
    expires = datetime.utcnow() + timedelta(days=30)
    response = JSONResponse(
        status_code=200,
        content={"message": "Account verified"}
    )
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        max_age=30 * 24 * 60 * 60,
        expires=int(expires.timestamp()),
        httponly=True,
        secure=True,
        samesite='None'
    )
    return response


@router.post("/login", response_model=schemas.TokenResponse)
async def login_user(user: User = Depends(get_verified_user)):
    refresh_token = jwt.create_refresh_token(user.username)
    expires = datetime.utcnow() + timedelta(days=30)
    response = JSONResponse(
        status_code=200,
        content={"message": "Login successfully"}
    )
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        expires=int(expires.timestamp()),
        httponly=True,
        secure=True,
        samesite='None'
    )
    return response


@router.post("/logout")
def logout_user(refresh_token: str = Cookie(None)):
    if not refresh_token:
        raise HTTPException(status_code=404, detail="You are not logged in")
    response = JSONResponse(status_code=200, content={
                            "message": "Logout successfully"})
    response.set_cookie(
        key="refresh_token",
        value="",
        httponly=True,
        secure=True,
        samesite="None",
        max_age=0,
        expires=0
    )
    return response


@router.post("/refresh-token")
async def refresh_session(
    refresh_token: str = Cookie(None),
    session: AsyncSession = Depends(get_async_session)
):
    if not refresh_token:
        raise HTTPException(status_code=400, detail="You are not registered")

    user = await verify_user_token(refresh_token, session, TokenType.REFRESH)
    token = jwt.create_access_token(user.username)

    return JSONResponse(status_code=200, content={"message": "Access token successfully refreshed", "access_token": token})
