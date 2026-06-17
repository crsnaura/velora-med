from fastapi import APIRouter

from app.core.database import SessionLocal

from app.services.purchase_order_service import (
    create_purchase_order,
    get_purchase_orders,
    approve_purchase_order,
    reject_purchase_order
)

from app.schemas.purchase_order_schema import (
    PurchaseOrderCreate,
    ApprovePORequest
)
from fastapi import Query

router = APIRouter(
    prefix="/api/purchase-orders",
    tags=["Purchase Orders"]
)


@router.post("")
def create_po(
    payload: PurchaseOrderCreate
):

    db = SessionLocal()

    try:

        return create_purchase_order(
            db,
            payload
        )

    finally:
        db.close()


@router.get("")
def get_po(
    tenant_id: str | None = Query(None)
):

    db = SessionLocal()

    try:

        return get_purchase_orders(
            db,
            tenant_id
        )

    finally:
        db.close()
        
@router.put("/{po_id}/approve")
def approve_po(
    po_id: int,
    payload: ApprovePORequest
):

    db = SessionLocal()

    try:

        return approve_purchase_order(
            db,
            po_id,
            payload.vendor_name
        )

    finally:
        db.close()
        
@router.put("/{po_id}/reject")
def reject_po(
    po_id: int
):

    db = SessionLocal()

    try:

        return reject_purchase_order(
            db,
            po_id
        )

    finally:
        db.close()