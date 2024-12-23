import uvicorn
from fastapi import FastAPI, APIRouter
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from core.config import settings
from router import user
from router import auth

app = FastAPI(
    version="1.0.0",
    title="M-look API",
    description="M-look API",
    openapi_url=f"{settings.API_ENDPOINT}/openapi.json",
    docs_url=f"{settings.API_ENDPOINT}/docs",
    redoc_url=f"{settings.API_ENDPOINT}/redoc",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
app.mount("/media", StaticFiles(directory="media"), name="media")

router = APIRouter(prefix=settings.API_ENDPOINT)


@router.get("/")
async def root():
    return {"message": "It works!!!"}

router.include_router(auth.router)
router.include_router(user.router)

app.include_router(router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
