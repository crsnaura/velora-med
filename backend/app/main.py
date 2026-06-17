from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api.test_db import router as test_router
from app.api.inventory import router as inventory_router
from app.api.dashboard import router as dashboard_router
from app.api.tenants import router as tenants_router
from app.api.suppliers import router as suppliers_router
from app.api.forecast import router as forecast_router
from app.api import inventory_analytics
from app.api.stock_in import router as stock_in_router
from app.api.stock_out import router as stock_out_router
from app.api.items import router as items_router
from app.api.demand import (
    router as demand_router
)
from app.api.reorder import (
    router as reorder_router
)
from app.api.purchase_orders import (
    router as purchase_orders_router
)
from app.api.executive_dashboard import (
    router as executive_dashboard_router
)
from app.api.auth import (
    router as auth_router
)
from app.api.users import (
    router as users_router
)
from app.models.user import User
from app.core.database import (
    Base,
    engine
)

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.origins_list,  # <--- GANTI JADI INI ya!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(test_router)
app.include_router(inventory_router)
app.include_router(dashboard_router)
app.include_router(tenants_router)
app.include_router(
    users_router
)
app.include_router(suppliers_router)
app.include_router(forecast_router)
app.include_router(
    inventory_analytics.router,
    prefix="/api"
)
app.include_router(stock_in_router)
app.include_router(
    stock_out_router
)
app.include_router(items_router)
app.include_router(
    demand_router
)
app.include_router(
    reorder_router
)
app.include_router(
    purchase_orders_router
)
app.include_router(
    executive_dashboard_router
)
app.include_router(
    auth_router
)

@app.get("/")
def root():
    return {
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "status": "running"
    }

@app.get("/health")
def health():
    return {"status": "healthy"}