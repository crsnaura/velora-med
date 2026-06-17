from fastapi import APIRouter

from app.core.database import SessionLocal

from app.services.supplier_service import (
    get_suppliers,
    get_supplier_analytics
)
from app.api.deps import get_current_tenant
from fastapi import Depends

router = APIRouter(
    prefix="/api/suppliers",
    tags=["Suppliers"]
)


@router.get("")
def suppliers():

    db = SessionLocal()

    try:

        return get_suppliers(db)

    finally:
        db.close()
        
@router.get("/analytics")
def supplier_analytics(
    tenant_id: str = Depends(
        get_current_tenant
    )
):

    db = SessionLocal()

    try:

        return get_supplier_analytics(
            db,
            tenant_id
        )

    finally:
        db.close()