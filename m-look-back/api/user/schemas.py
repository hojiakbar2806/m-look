from pydantic import BaseModel, ConfigDict, Field, EmailStr
from datetime import datetime
from typing import Optional

from core.enums import GenderEnum, RoleEnum


class TimeMix(BaseModel):
    created_at: datetime
    updated_at: Optional[datetime] = None


class UserBase(BaseModel):
    full_name: str
    username: str
    phone_number: str
    email: EmailStr
    is_active: bool

    class Config:
        from_attributes = True


class ProfileBase(BaseModel):
    gender: Optional[str] = None
    birth_date: Optional[datetime] = None
    bio: Optional[str] = None

    class Config:
        from_attributes = True


class ProfileOut(ProfileBase):
    class Config:
        from_attributes = True


class UserIn(UserBase):
    hashed_password: str = Field(alias="password")


class UserOut(UserBase, TimeMix):
    id: int
    last_login: datetime
    role: RoleEnum

    class Config:
        from_attributes = True


class UserProfileOut(UserOut):
    id: int
    last_login: datetime
    role: RoleEnum
    profile: Optional[ProfileOut] = None

    class Config:
        from_attributes = True


class UserUpdate(BaseModel):
    full_name: str
    username: str
    phone_number: str
    email: EmailStr
