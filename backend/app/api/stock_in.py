from fastapi import APIRouter, Header

from app.core.database import SessionLocal

from app.services.stock_in_service import (
    get_stock_in,
    create_stock_in
)
from app.schemas.stock_in_schema import (
    StockInCreate
)
router = APIRouter(
    prefix="/api/stock-in",
    tags=["Stock In"]
)


@router.get("")
def stock_in(
    x_tenant_id: str = Header(...)
):

    db = SessionLocal()

    try:

        return get_stock_in(
            db,
            x_tenant_id
        )

    finally:
        db.close()
        
@router.post("")
def add_stock_in(
    payload: StockInCreate
):

    db = SessionLocal()

    try:

        return create_stock_in(
            db,
            payload
        )

    finally:
        db.close()