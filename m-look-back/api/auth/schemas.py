from fastapi import FastAPI
from pydantic import BaseModel, Field, EmailStr


class UserInSchema(BaseModel):
    full_name: str = Field(..., min_length=3, max_length=100)
    email: EmailStr  
    hashed_password: str = Field(..., min_length=4, max_length=16, alias="password")


class LoginSchema(BaseModel):
    username: str = Field(..., min_length=4)
    password: str = Field(..., min_length=4)

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    refresh_token: str
    type: str = "Bearer"
