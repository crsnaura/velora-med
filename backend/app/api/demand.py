from fastapi import APIRouter, Depends

from app.core.database import SessionLocal
from app.api.deps import get_current_tenant

from app.services.demand_service import (
    get_demand_analytics
)

router = APIRouter(
    prefix="/api/demand",
    tags=["Demand Analytics"]
)


@router.get("/analytics")
def demand_analytics(
    tenant_id: str = Depends(
        get_current_tenant
    )
):

    db = SessionLocal()

    try:

        return get_demand_analytics(
            db,
            tenant_id
        )

    finally:
        db.close()