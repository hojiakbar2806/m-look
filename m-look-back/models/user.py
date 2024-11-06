import sqlalchemy as sa
from core.enums import GenderEnum, RoleEnum
from database.base import Base
from models.mixin import TimeStampMixin
from sqlalchemy.orm import relationship


class User(Base, TimeStampMixin):
    __tablename__ = "users"

    id = sa.Column(sa.Integer, primary_key=True)
    full_name = sa.Column(sa.String(250), nullable=False)
    email = sa.Column(sa.String(200), nullable=False, index=True)
    hashed_password = sa.Column(sa.LargeBinary, nullable=False)
    is_active = sa.Column(sa.Boolean, default=False, nullable=False)
    last_login = sa.Column(sa.DateTime, default=sa.func.now())
    role = sa.Column(sa.Enum(RoleEnum), default=RoleEnum.USER, nullable=False)

    profile = relationship("Profile", back_populates="user", uselist=False)
    reviews = relationship("ProductReview", back_populates="user")


class Profile(Base, TimeStampMixin):
    __tablename__ = "profiles"

    id = sa.Column(sa.Integer, primary_key=True, index=True)
    gender = sa.Column(sa.Enum(GenderEnum), nullable=True)
    birth_date = sa.Column(sa.Date, nullable=True)
    profile_pic = sa.Column(sa.String, nullable=True)
    bio = sa.Column(sa.Text, nullable=True)

    user_id = sa.Column(sa.ForeignKey("users.id"))
    user = relationship("User", back_populates="profile", uselist=False)
