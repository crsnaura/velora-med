from sqlalchemy import text


def get_reorder_recommendations(
    db,
    tenant_id
):

    result = db.execute(
        text("""
            SELECT
                it.item_name,
                v.vendor_name,
                i.current_stock,
                i.avg_usage_per_day,
                i.days_until_stockout,
                i.restock_lead_time,
                i.stock_status,
                (
                    (i.avg_usage_per_day * i.restock_lead_time)
                    - i.current_stock
                ) AS reorder_score,

                (
                    (i.avg_usage_per_day * i.restock_lead_time)
                    * 2
                ) AS recommended_purchase

            FROM inventory i

            JOIN items it
                ON i.item_id = it.id

            LEFT JOIN vendors v
                ON i.vendor_id = v.id

            WHERE i.tenant_id = :tenant_id
                AND i.stock_status = 'Critical'
            
            ORDER BY i.days_until_stockout ASC
        """),
        {
            "tenant_id": tenant_id
        }
    )

    return result.mappings().all()

