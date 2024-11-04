from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from api.product.product_service import ProductService
from models import Product
from database.session import get_async_session

router = APIRouter(prefix="/product", tags=["Product"])

product_service = ProductService(Product, model=Product, schema=Product)

@router.get("/", status_code=status.HTTP_201_CREATED)
async def get_products(session: AsyncSession = Depends(get_async_session)):
    products = await product_service.get_all(session)
    return products