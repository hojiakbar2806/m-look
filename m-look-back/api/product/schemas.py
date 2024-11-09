from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from core.enums import CurrencyEnum, GenderEnum


class ProductBase(BaseModel):
    title: Optional[str] = None
    description: str
    stock_in: int
    color: str
    selling_count: int
    discount: float
    for_whom: GenderEnum
    category_id: Optional[int]
    price_id: Optional[int]

    class Config:
        orm_mode = True


class ProductPrice(BaseModel):
    amount: int
    currency: CurrencyEnum


class ProductIn(BaseModel):
    title: Optional[str] = None
    description: str
    stock_in: int
    color: str
    selling_count: int
    discount: float
    for_whom: GenderEnum
    category_id: Optional[int]
    price: ProductPrice


class ProductUpdate(ProductBase):
    title: Optional[str] = None
    description: Optional[str] = None
    stock_in: Optional[int] = None
    color: Optional[str] = None
    selling_count: Optional[int] = None
    discount: Optional[float] = None
    for_whom: Optional[GenderEnum] = None
    category_id: Optional[int] = None
    price_id: Optional[int] = None


class ProductFilters(BaseModel):
    category: str
    min_price: Optional[float] = None
    max_price: Optional[float] = None
    min_rating: Optional[float] = None
    max_rating: Optional[float] = None
    brand: Optional[str] = None
    rating: Optional[float] = None
    sort_by: Optional[str] = None
    order: Optional[str] = "asc"
    page_limit: Optional[int] = 10
    page: Optional[int] = 1
