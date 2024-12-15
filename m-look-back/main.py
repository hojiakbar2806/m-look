from fastapi.responses import JSONResponse
import uvicorn
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
# from fastapi.concurrency import asynccontextmanager
from api.user import user_router
from api.auth import auth_router
from api.product import product_router


# @asynccontextmanager
# async def lifespan(app: FastAPI):
#     print("Creating tables-----")
#     await create_tables()
#     print("Tables created------")
#     yield

app = FastAPI(
    version="1.0.0",
    title="FastAPI",
    # lifespan=lifespan,
    description="FastAPI",
    openapi_url="/m-look/api/openapi.json"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "It works!!!"}


@app.get("/openapi.json")
async def custom_openapi():
    openapi_schema = app.openapi()
    return JSONResponse(openapi_schema)

app.include_router(auth_router)
app.include_router(product_router)
app.include_router(user_router)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
