from fastapi import APIRouter

from app.core.database import SessionLocal

from app.services.item_service import (
    get_items
)

router = APIRouter(
    prefix="/api/items",
    tags=["Items"]
)


@router.get("")
def items():

    db = SessionLocal()

    try:
        return get_items(db)

    finally:
        db.close()