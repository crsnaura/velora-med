from fastapi import APIRouter, Depends

from app.core.database import SessionLocal
from app.api.deps import get_current_tenant

from app.services.executive_dashboard_service import (
    get_executive_dashboard
)

router = APIRouter(
    prefix="/api/executive-dashboard",
    tags=["Executive Dashboard"]
)


@router.get("")
def executive_dashboard(
    tenant_id: str = Depends(
        get_current_tenant
    )
):

    db = SessionLocal()

    try:

        return get_executive_dashboard(
            db,
            tenant_id
        )

    finally:
        db.close()