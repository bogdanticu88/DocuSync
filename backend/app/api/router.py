from fastapi import APIRouter
from .v1 import sync

api_router = APIRouter()
api_router.include_router(sync.router, prefix="/sync", tags=["sync"])
