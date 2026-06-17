from fastapi import APIRouter
from sqlalchemy import text

from app.core.database import SessionLocal

router = APIRouter(
    prefix="/api/tenants",
    tags=["Tenants"]
)

@router.get("")
def get_tenants():

    db = SessionLocal()

    try:

        result = db.execute(text("""
            SELECT
                tenant_id,
                nama_rs,
                kelas_rs
            FROM tenants
            ORDER BY tenant_id
        """))

        rows = result.mappings().all()

        return rows

    finally:
        db.close()