from fastapi import APIRouter, Depends, Query

from app.core.database import SessionLocal
from app.api.deps import get_current_tenant

from app.services.inventory_service import (
    get_inventory_data
)

router = APIRouter(
    prefix="/api/inventory",
    tags=["Inventory"]
)

@router.get("")
def get_inventory(
    tenant_id: str = Depends(get_current_tenant),
    search: str | None = Query(None)
):

    db = SessionLocal()

    try:

        return get_inventory_data(
            db,
            tenant_id,
            search
        )

    finally:
        db.close()