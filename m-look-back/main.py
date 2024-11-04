from fastapi import FastAPI
from api.auth import auth_router
from database.session import create_tables
from fastapi.middleware.cors import CORSMiddleware
from fastapi.concurrency import asynccontextmanager


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Creating tables-----")
    await create_tables()
    print("Tables created------")
    yield

app = FastAPI(
    title="FastAPI",
    description="FastAPI",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/api/docs",  
    redoc_url="/api/redoc",  
    openapi_url="/api/openapi.json", 
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api")
async def root():
    return {"message": "It works!!!"}

app.include_router(auth_router, prefix="/api")
