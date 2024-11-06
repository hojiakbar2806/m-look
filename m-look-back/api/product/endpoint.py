from typing import List
from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from api.product.product_service import ProductService
from models import Product
from database.session import get_async_session
from api.product.schemas import ProductBase, ProductFilters, ProductUpdate

router = APIRouter(prefix="/products", tags=["Product"])

product_service = ProductService(Product, ProductBase, ProductUpdate)


@router.get("/")
async def get_products(
    session: AsyncSession = Depends(get_async_session),
    filters: ProductFilters = Depends()
):
    products = await product_service.get_all(session, filters)
    return products


@router.post('/', status_code=status.HTTP_201_CREATED)
async def post_prodict(session: AsyncSession = Depends(get_async_session)):
    print("")
