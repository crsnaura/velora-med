from fastapi import APIRouter, Depends

from app.core.database import SessionLocal
from app.api.deps import get_current_tenant
from app.services.dashboard_service import (
    get_dashboard_stats,
    get_dashboard_alerts,
    get_chart_data,
    get_supply_chain_stats,
    get_landing_stats
)
router = APIRouter(
    prefix="/api/dashboard",
    tags=["Dashboard"]
)

@router.get("/stats")
def dashboard_stats(
    tenant_id: str = Depends(get_current_tenant)
):

    db = SessionLocal()

    try:

        return get_dashboard_stats(
            db,
            tenant_id
        )

    finally:
        db.close()

@router.get("/alerts")
def dashboard_alerts(
    tenant_id: str = Depends(get_current_tenant)
):

    db = SessionLocal()

    try:

        return get_dashboard_alerts(
            db,
            tenant_id
        )

    finally:
        db.close()
        
@router.get("/chart")
def dashboard_chart(
    tenant_id: str = Depends(get_current_tenant)
):

    db = SessionLocal()

    try:

        return get_chart_data(
            db,
            tenant_id
        )

    finally:
        db.close()
        
@router.get("/supply-chain")
def supply_chain_stats(
    tenant_id: str = Depends(
        get_current_tenant
    )
):

    db = SessionLocal()

    try:

        return get_supply_chain_stats(
            db,
            tenant_id
        )

    finally:
        db.close()
        
@router.get("/landing-stats")
def landing_stats():

    db = SessionLocal()

    try:

        return get_landing_stats(db)

    finally:
        db.close()