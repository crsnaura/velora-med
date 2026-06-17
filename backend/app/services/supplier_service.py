from sqlalchemy import text


def get_suppliers(db):

    result = db.execute(
        text("""
            SELECT
                v.vendor_name,
                COUNT(i.id) as total_items

            FROM vendors v

            LEFT JOIN inventory i
                ON v.id = i.vendor_id

            GROUP BY
                v.vendor_name

            ORDER BY
                v.vendor_name
        """)
    )

    return result.mappings().all()

def get_supplier_analytics(
    db,
    tenant_id
):

    result = db.execute(
        text("""
            SELECT
                v.vendor_name,
                SUM(si.quantity) as total_quantity

            FROM stock_in si

            JOIN vendors v
                ON si.vendor_id = v.id

            WHERE si.tenant_id = :tenant_id

            GROUP BY v.vendor_name

            ORDER BY total_quantity DESC
        """),
        {
            "tenant_id": tenant_id
        }
    )

    return result.mappings().all()