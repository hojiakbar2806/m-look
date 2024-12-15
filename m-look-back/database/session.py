from core.config import settings
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker

async_engine = create_async_engine(settings.DB.URL, echo=settings.DEBUG)
AsyncSessionLocal = async_sessionmaker(async_engine, expire_on_commit=False)


async def get_async_session() -> AsyncSession:  # type: ignore
    async with AsyncSessionLocal() as session:
        yield session


# async def create_tables() -> None:
#     async with async_engine.begin() as conn:
#         await conn.run_sync(Base.metadata.create_all)
#     print("Ma'lumotlar ombori tiklandi")
