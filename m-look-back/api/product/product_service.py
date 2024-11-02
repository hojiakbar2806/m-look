from typing import Optional, List
from sqlalchemy import asc, desc
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from api.base_crud import CRUDBase
from models.product import Product

class ProductService(CRUDBase):
      async def get_all(self, db: AsyncSession, category: Optional[str] = None, 
                        minPrice: Optional[float] = None, maxPrice: Optional[float] = None, 
                        minRating: Optional[float] = None, maxRating: Optional[float] = None,
                        sortBy: Optional[str] = None, order: Optional[str] = "asc", brand: Optional[str] = None, 
                        rating: Optional[str] = None, pageLimit: Optional[int] = 10,page: Optional[int] = 1) -> List[Product]:
            
            query = select(self.model)

            if category: query = query.where(self.model.category == category)
            if minPrice is not None: query = query.where(self.model.price >= minPrice)
            if maxPrice is not None:  query = query.where(self.model.price <= maxPrice)
            if minRating is not None: query = query.where(self.model.rating >= minRating)
            if maxRating is not None: query = query.where(self.model.rating <= maxRating)
            if brand: query = query.where(self.model.brand == brand)
            if rating: query = query.where(self.model.rating == rating)
            if sortBy: order_func = asc if order == "asc" else desc

            if page and pageLimit: offset = (page - 1) * pageLimit
            query = query.limit(pageLimit).offset(offset)
            query = query.order_by(order_func(getattr(self.model, sortBy)))

            result = await db.execute(query)
            return result.scalars().all()
      


product_service = ProductService(Product,model=Product, schema=Product)