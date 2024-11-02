from pydantic import BaseModel
from fastapi import HTTPException
from sqlalchemy.future import select
from typing import Type, TypeVar, Generic, List
from sqlalchemy.ext.asyncio import AsyncSession

ModelType = TypeVar("ModelType")
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)


class CRUDBase(Generic[ModelType, CreateSchemaType, UpdateSchemaType]):
    def __init__(self, model: Type[ModelType], schema: Type[CreateSchemaType], update_schema: Type[UpdateSchemaType]):
        self.model = model

    async def get(self, db: AsyncSession, id: int) -> ModelType:
        result = await db.execute(select(self.model).where(self.model.id == id))
        obj = result.scalars().first()
        if not obj: raise HTTPException(status_code=404, detail=f"{ self.model.__name__} not found")
        return obj

    async def get_all(self, db: AsyncSession) -> List[ModelType]:
        result = await db.execute(select(self.model))
        return result.scalars().all()

    async def create(self, db: AsyncSession, obj_in: CreateSchemaType) -> ModelType:
        obj_data = obj_in.dict()
        db_obj = self.model(**obj_data)
        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj

    async def update(self, db: AsyncSession, id: int, obj_in: UpdateSchemaType) -> ModelType:
        db_obj = await self.get(db, id)
        if not db_obj: raise HTTPException(status_code=404, detail=f"{ self.model.__name__} not found")
        update_data = obj_in.dict(exclude_unset=True)
        for field in update_data: setattr(db_obj, field, update_data[field])
        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj

    async def delete(self, db: AsyncSession, id: int) -> ModelType:
        db_obj = await self.get(db, id)
        if not db_obj: raise HTTPException(status_code=404, detail=f"{self.model.__name__} not found")
        await db.delete(db_obj)
        await db.commit()
        return db_obj
