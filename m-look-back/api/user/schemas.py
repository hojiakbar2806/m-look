from pydantic import BaseModel, Field
from datetime import datetime
from typing import Literal

class ProfileInSchema(BaseModel):
    gender: Literal["male", "female"] = "male"  
    birth_date: datetime
    profile_pic: str
    bio: str = Field(..., min_length=3, max_length=255)
