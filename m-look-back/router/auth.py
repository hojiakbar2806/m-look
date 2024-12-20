from sqlalchemy import select
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import APIRouter, Depends, HTTPException, Cookie

from core.security import jwt
from core.enums import TokenType
from schemas import auth as schemas
from models.user import Profile, User
from dependencies import auth as auth_deps

from database.session import get_async_session
from core.security.hashing import hash_password
from core.security.utils import verify_user_token
from utils.utils import set_refresh_token_cookie, create_tokens

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/register")
async def register_user(
    user: schemas.Register = Depends(auth_deps.get_not_exist_user),
    session: AsyncSession = Depends(get_async_session),
):
    user.hashed_password = hash_password(user.hashed_password)
    new_user = User(**user.model_dump())
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
    refresh_token, access_token = create_tokens(new_user.username)
    response = JSONResponse(
        status_code=200,
        content={
            "message": "Activation link sent to your email",
            "access_token": access_token
        })
    set_refresh_token_cookie(response, refresh_token)
    return response


@router.post("/activate/{token}")
async def activate_user(token: str, session: AsyncSession = Depends(get_async_session)):
    sub = jwt.decode_activation_token(token).get("sub")
    stmt = select(User)
    query = stmt.where(User.username == sub)
    result = await session.execute(query)
    user_in_db = result.scalar_one_or_none()
    if user_in_db is None:
        raise HTTPException(status_code=400, detail="User not found")
    user_in_db.is_active = True
    await session.commit()
    return JSONResponse(
        status_code=200,
        content={"message": "Account verified"}
    )


@router.post("/login", response_model=schemas.TokenResponse)
async def login_user(user: User = Depends(auth_deps.get_verified_user)):
    refresh_token, access_token = create_tokens(user.username)
    response = JSONResponse(
        status_code=200,
        content={"message": "Login successfully", "access_token": access_token}
    )
    set_refresh_token_cookie(response, refresh_token)
    return response


@router.post("/logout")
def logout_user(refresh_token: str = Cookie(None)):
    if not refresh_token:
        raise HTTPException(status_code=404, detail="You are not logged in")
    response = JSONResponse(
        status_code=200,
        content={"message": "Logout successfully"}
    )
    response.set_cookie(
        key="refresh_token",
        httponly=True,
        secure=True,
        samesite="None",
        expires=0
    )
    return response


@router.post("/refresh-token")
async def refresh_session(
    refresh_token: str = Cookie(None),
    session: AsyncSession = Depends(get_async_session)
):
    if not refresh_token:
        raise HTTPException(status_code=400, detail="You are not logged in")

    user = await verify_user_token(refresh_token, session, TokenType.REFRESH)
    access_token = jwt.create_access_token(user.username)

    return JSONResponse(
        status_code=200,
        content={
            "message": "Access token successfully refreshed",
            "access_token": access_token
        }
    )
