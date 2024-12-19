import uvicorn
from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware

from core.config import settings


from api.user import user_router
from api.auth import auth_router
from api.product import product_router


app = FastAPI(
    version="1.0.0",
    title="FastAPI",
    description="FastAPI ilovasi",
    openapi_url=f"{settings.API_ENDPOINT}/openapi.json",
    docs_url=f"{settings.API_ENDPOINT}/docs",
    redoc_url=f"{settings.API_ENDPOINT}/redoc",
)


app.add_middleware(
    CORSMiddleware,

    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


router = APIRouter(prefix=settings.API_ENDPOINT)


@router.get("/")
async def root():
    return {"message": "It works!!!"}

router.include_router(auth_router)
router.include_router(product_router)
router.include_router(user_router)

app.include_router(router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
