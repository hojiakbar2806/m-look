from sqlalchemy import select
from sqlalchemy.orm import selectinload
from api.auth.dependency import valid_user
from api.user import schemas
from core.enums import RoleEnum
from models.user import Profile, User
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from core.protected_route import protected_route
from core.dependency import current_auth_user
from core.security.hashing import hash_password
from database.session import get_async_session

router = APIRouter(prefix="/user", tags=["User"])


@router.get("/me", response_model=schemas.UserProfileOut)
async def get_me(
    current_user: User = Depends(current_auth_user),
    session: AsyncSession = Depends(get_async_session)
):
    stmt = select(User).options(selectinload(User.profile)
                                ).filter(User.id == current_user.id)

    result = await session.execute(stmt)
    user_with_profile = result.scalars().first()

    if not user_with_profile:
        raise HTTPException(status_code=404, detail="User not found")

    return user_with_profile


@router.post("/user")
@protected_route([RoleEnum.USER])
async def create_user(
    current_user: User = Depends(current_auth_user),
    user: schemas.UserIn = Depends(valid_user),
    session: AsyncSession = Depends(get_async_session)
) -> schemas.UserOut:
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
async def updated_user(user: schemas.UserUpdate):
    pass
