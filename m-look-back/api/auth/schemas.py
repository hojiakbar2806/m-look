from pydantic import BaseModel, Field, EmailStr


class Register(BaseModel):
    full_name: str = Field(..., min_length=3, max_length=100)
    email: EmailStr
    username: str   
    phone_number: str
    hashed_password: str = Field(..., min_length=4, alias="password")


class LoginSchema(BaseModel):
    username: str
    password: str = Field(..., min_length=4)

    class Config:
        from_attributes = True


class TokenResponse(BaseModel):
    access_token: str
    type: str = "Bearer"
    message: str
