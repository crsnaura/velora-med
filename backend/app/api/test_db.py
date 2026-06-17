from fastapi import APIRouter
from sqlalchemy import text

from app.core.database import SessionLocal

router = APIRouter()

@router.get("/db-test")
def db_test():
    db = SessionLocal()

    try:
        result = db.execute(
            text("SELECT COUNT(*) FROM tenants")
        )

        count = result.scalar()

        return {
            "status": "success",
            "tenant_count": count
        }

    finally:
        db.close()