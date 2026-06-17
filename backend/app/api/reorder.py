from fastapi import APIRouter, Depends

from app.core.database import SessionLocal
from app.api.deps import get_current_tenant

from app.services.reorder_service import (
    get_reorder_recommendations
)

router = APIRouter(
    prefix="/api/reorder",
    tags=["Reorder"]
)


@router.get("/recommendations")
def reorder_recommendations(
    tenant_id: str = Depends(
        get_current_tenant
    )
):

    db = SessionLocal()

    try:

        return get_reorder_recommendations(
            db,
            tenant_id
        )

    finally:
        db.close()