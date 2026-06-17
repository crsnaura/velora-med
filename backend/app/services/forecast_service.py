from sqlalchemy import text
import joblib
import pandas as pd

def get_drug_codes(db):

    result = db.execute(
        text("""
            SELECT DISTINCT
                drug_code
            FROM sales_history
            ORDER BY drug_code
        """)
    )

    return result.mappings().all()


def get_sales_history(
    db,
    drug_code
):

    result = db.execute(
        text("""
            SELECT
                sales_date,
                SUM(sales_qty) AS sales_qty
            FROM sales_history
            WHERE drug_code = :drug_code
            GROUP BY sales_date
            ORDER BY sales_date
        """),
        {
            "drug_code": drug_code
        }
    )

    return result.mappings().all()

def predict_sales(drug_code):

    model = joblib.load(
        "ml/models/m01ab_t001.pkl"
    )

    future_days = pd.DataFrame({
        "day_number": range(2106, 2118)
    })

    predictions = model.predict(
        future_days
    )

    result = []

    for i, value in enumerate(predictions):

        result.append({
            "day": i + 1,
            "predicted_sales": round(
                float(value),
                2
            )
        })

    return result