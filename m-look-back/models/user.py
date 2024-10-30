from database.base import Base
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Date, ForeignKey, Integer, String, Text, DateTime, Enum, Boolean, LargeBinary,func
import enum

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(255))
    email = Column(String(255), unique=True, index=True)
    hashed_password = Column(LargeBinary, nullable=False)
    is_active = Column(Boolean, default=False)
    created_at = Column(DateTime, default=func.now()) 
    last_login = Column(DateTime, default=func.now()) 
    updated_at = Column(DateTime, default=None, onupdate=func.now()) 

    profiles = relationship("Profile", back_populates="user")

    def __repr__(self):
        return f"<User {self.email}>"

class Profile(Base):
    __tablename__ = "profiles"

    class GenderEnum(str, enum.Enum):
        male = "male"
        female = "female"

    id = Column(Integer, primary_key=True, index=True)
    gender = Column(Enum(GenderEnum), nullable=False)  
    birth_date = Column(Date, nullable=False)  
    profile_pic = Column(String(255), nullable=False)
    bio = Column(Text, nullable=False)

    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="profiles")
