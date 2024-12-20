from sqlalchemy import select
from sqlalchemy.orm import selectinload

from schemas import user as user_schemas
from core.enums import RoleEnum
from dependencies.auth import current_auth_user, get_not_exist_user
from models.user import Profile, User
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from core.protected_route import protected_route
from core.security.hashing import hash_password
from database.session import get_async_session

router = APIRouter(prefix="/user", tags=["User"])


@router.get("/me", response_model=user_schemas.UserProfileOut)
async def get_me(
    current_user: User = Depends(current_auth_user),
    session: AsyncSession = Depends(get_async_session)
):
    stmt = select(User)
    query = stmt.options(selectinload(User.profile))
    query = query.where(User.id == current_user.id)

    result = await session.execute(query)
    user_with_profile = result.scalars().first()

    if not user_with_profile:
        raise HTTPException(status_code=404, detail="User not found")

    return user_with_profile


@router.post("/user")
@protected_route([RoleEnum.USER])
async def create_user(
    current_user: User = Depends(current_auth_user),
    user: user_schemas.UserIn = Depends(get_not_exist_user),
    session: AsyncSession = Depends(get_async_session)
) -> user_schemas.UserOut:
    hashed_password = hash_password(user.hashed_password)
    db_user = User(**user.model_dump())
    db_user.hashed_password = hashed_password
    db_user.is_active = True
    session.add(db_user)

    new_profile = Profile(user=db_user, gender=None, birth_date=None, bio=None)
    session.add(new_profile)

    await session.commit()
    await session.refresh(db_user)
    await session.refresh(new_profile)
    return db_user


@router.patch("/user")
async def updated_user(user: user_schemas.UserUpdate):
    pass
