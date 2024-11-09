from pydantic import BaseModel, Field, EmailStr


class UserInSchema(BaseModel):
    full_name: str = Field(..., min_length=3, max_length=100)
    email: EmailStr
    hashed_password: str = Field(..., min_length=4,
                                 max_length=16, alias="password")


class LoginSchema(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=4)

    class Config:
        from_attributes = True


class TokenResponse(BaseModel):
    access_token: str
    type: str = "Bearer"
    message: str
    status: str
