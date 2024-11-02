import datetime
from pydantic import BaseModel, Field
from typing import List


class ProductInSchema(BaseModel):
      name: str = Field(..., min_length=3, max_length=100)
      category: str = Field(..., min_length=3, max_length=100)
      price: float = Field(..., ge=0)
      brand: str = Field(..., min_length=3, max_length=100)
      rating: float = Field(..., ge=0, le=5)
      description: str = Field(..., min_length=3, max_length=255)
      img: str = Field(..., min_length=3, max_length=255)   

class ProductOutSchema(BaseModel):
      id: int
      name: str
      category: str
      price: float
      brand: str
      rating: float
      description: str
      img: str
      created_at: datetime    
      updated_at: datetime    


class ProductsOutSchema(BaseModel):
      products: List[ProductOutSchema]
      total: int
      page: int
      page_limit: int

      class Config:
            from_attributes = True


class ProductUpdateSchema(BaseModel):
      name: str = Field(..., min_length=3, max_length=100)
      category: str = Field(..., min_length=3, max_length=100)
      price: float = Field(..., ge=0)
      brand: str = Field(..., min_length=3, max_length=100)
      rating: float = Field(..., ge=0, le=5)
      description: str = Field(..., min_length=3, max_length=255)

      