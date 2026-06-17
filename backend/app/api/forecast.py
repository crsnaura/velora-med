from fastapi import APIRouter
from app.core.database import SessionLocal

from app.services.forecast_service import (
    get_drug_codes,
    get_sales_history,
    predict_sales
)
router = APIRouter(
    prefix="/api/forecast",
    tags=["Forecast"]
)


@router.get("/drugs")
def drugs():

    db = SessionLocal()

    try:

        return get_drug_codes(db)

    finally:
        db.close()

@router.get("/history/{drug_code}")
def history(drug_code: str):

    db = SessionLocal()

    try:

        return get_sales_history(
            db,
            drug_code
        )

    finally:
        db.close()
        
@router.get("/predict/{drug_code}")
def predict(drug_code: str):

    return predict_sales(
        drug_code
    )