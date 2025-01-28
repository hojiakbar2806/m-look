from sqlalchemy.orm import selectinload
from sqlalchemy.sql import select, asc, desc
from api.product.schemas import ProductFilters
from models.product import Product
from api.base_crud import CRUDBase
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List


class ProductService(CRUDBase):
    async def get_multi(self, db: AsyncSession, filters: ProductFilters) -> List[Product]:
        query = select(self.model)

        if filters.category:
            query = query.where(self.model.category.has(name=filters.category))
        if filters.min_price is not None:
            query = query.where(self.model.price >= filters.min_price)
        if filters.max_price is not None:
            query = query.where(self.model.price <= filters.max_price)
        if filters.min_rating is not None:
            query = query.where(self.model.rating >= filters.min_rating)
        if filters.max_rating is not None:
            query = query.where(self.model.rating <= filters.max_rating)
        if filters.brand:
            query = query.where(self.model.brand == filters.brand)
        if filters.rating is not None:
            query = query.where(self.model.rating == filters.rating)

        if filters.sort_by:
            order_func = asc if filters.order == "asc" else desc
            query = query.order_by(order_func(
                getattr(self.model, filters.sort_by)))

        offset = (filters.page - 1) * filters.page_limit
        query = query.limit(filters.page_limit).offset(offset)

        result = await db.execute(query)
        return result.scalars().all()
