from sqlalchemy import text


def get_demand_analytics(
    db,
    tenant_id
):

    most_requested = db.execute(
        text("""
            SELECT
                i.item_name,
                SUM(so.quantity) as total

            FROM stock_out so

            JOIN items i
                ON so.item_id = i.id

            WHERE so.tenant_id = :tenant_id

            GROUP BY i.item_name

            ORDER BY total DESC

            LIMIT 1
        """),
        {
            "tenant_id": tenant_id
        }
    ).mappings().first()

    total_distributed = db.execute(
        text("""
            SELECT
                SUM(quantity) as total

            FROM stock_out

            WHERE tenant_id = :tenant_id
        """),
        {
            "tenant_id": tenant_id
        }
    ).mappings().first()

    top_department = db.execute(
        text("""
            SELECT
                destination,
                SUM(quantity) as total

            FROM stock_out

            WHERE tenant_id = :tenant_id

            GROUP BY destination

            ORDER BY total DESC

            LIMIT 1
        """),
        {
            "tenant_id": tenant_id
        }
    ).mappings().first()

    return {
        "most_requested": most_requested,
        "total_distributed": total_distributed,
        "top_department": top_department
    }