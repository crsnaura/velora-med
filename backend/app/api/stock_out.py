from fastapi import APIRouter
from fastapi import Depends

from app.core.database import SessionLocal

from app.api.deps import (
    get_current_tenant
)

from app.services.stock_out_service import (
    get_stock_out,
    create_stock_out
)

from app.schemas.stock_out_schema import (
    StockOutCreate
)

router = APIRouter(
    prefix="/api/stock-out",
    tags=["Stock Out"]
)


@router.get("")
def stock_out(
    tenant_id: str = Depends(
        get_current_tenant
    )
):

    db = SessionLocal()

    try:

        return get_stock_out(
            db,
            tenant_id
        )

    finally:
        db.close()


@router.post("")
def add_stock_out(
    payload: StockOutCreate
):

    db = SessionLocal()

    try:

        return create_stock_out(
            db,
            payload
        )

    finally:
        db.close()