from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.api.deps import get_current_tenant
from app.services.inventory_analytics_service import (
    get_inventory_analytics
)

router = APIRouter()


@router.get("/inventory/analytics")
def inventory_analytics(
    tenant_id: str = Depends(get_current_tenant),
    db: Session = Depends(get_db)
):
    print("Analytics Tenant:", tenant_id)

    return get_inventory_analytics(
        db,
        tenant_id
    )