from sqlalchemy import text


def get_dashboard_stats(db, tenant_id):

    result = db.execute(
        text("""
        SELECT
            COUNT(*) as total_items,

            SUM(
                CASE
                    WHEN stock_status = 'Critical'
                    THEN 1
                    ELSE 0
                END
            ) as critical_items,

            SUM(
                CASE
                    WHEN stock_status = 'Warning'
                    THEN 1
                    ELSE 0
                END
            ) as warning_items,

            SUM(
                CASE
                    WHEN stock_status = 'Safe'
                    THEN 1
                    ELSE 0
                END
            ) as safe_items

        FROM inventory
        WHERE tenant_id = :tenant_id
        """),
        {
            "tenant_id": tenant_id
        }
    )

    return result.mappings().first()

def get_dashboard_alerts(db, tenant_id):

    result = db.execute(
        text("""
            SELECT
                it.item_name,
                i.current_stock,
                i.stock_status

            FROM inventory i

            LEFT JOIN items it
                ON i.item_id = it.id

            WHERE i.tenant_id = :tenant_id
            AND i.stock_status = 'Critical'

            ORDER BY i.current_stock ASC

            LIMIT 1
        """),
        {
            "tenant_id": tenant_id
        }
    )

    return result.mappings().first()

def get_chart_data(db, tenant_id):

    result = db.execute(
        text("""
            SELECT
                it.item_name,
                i.current_stock

            FROM inventory i

            LEFT JOIN items it
                ON i.item_id = it.id

            WHERE i.tenant_id = :tenant_id

            ORDER BY i.current_stock ASC

            LIMIT 5
        """),
        {
            "tenant_id": tenant_id
        }
    )

    return result.mappings().all()

def get_supply_chain_stats(
    db,
    tenant_id
):

    total_stock_in = db.execute(
        text("""
            SELECT
                COALESCE(
                    SUM(quantity),
                    0
                ) AS total_stock_in

            FROM stock_in

            WHERE tenant_id = :tenant_id
        """),
        {
            "tenant_id": tenant_id
        }
    ).mappings().first()

    total_stock_out = db.execute(
        text("""
            SELECT
                COALESCE(
                    SUM(quantity),
                    0
                ) AS total_stock_out

            FROM stock_out

            WHERE tenant_id = :tenant_id
        """),
        {
            "tenant_id": tenant_id
        }
    ).mappings().first()

    top_supplier = db.execute(
        text("""
            SELECT
                v.vendor_name,
                SUM(si.quantity) AS total

            FROM stock_in si

            JOIN vendors v
                ON si.vendor_id = v.id

            WHERE si.tenant_id = :tenant_id

            GROUP BY v.vendor_name

            ORDER BY total DESC

            LIMIT 1
        """),
        {
            "tenant_id": tenant_id
        }
    ).mappings().first()

    most_requested = db.execute(
        text("""
            SELECT
                i.item_name,
                SUM(so.quantity) AS total

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

    return {
        "total_stock_in":
            total_stock_in["total_stock_in"],

        "total_stock_out":
            total_stock_out["total_stock_out"],

        "top_supplier":
            top_supplier,

        "most_requested":
            most_requested
    }
    
def get_landing_stats(db):

    total_hospitals = db.execute(
        text("""
            SELECT COUNT(*)
            FROM tenants
        """)
    ).scalar()

    total_inventory = db.execute(
        text("""
            SELECT COUNT(*)
            FROM inventory
        """)
    ).scalar()

    critical_items = db.execute(
        text("""
            SELECT COUNT(*)
            FROM inventory
            WHERE stock_status = 'Critical'
        """)
    ).scalar()

    total_po = db.execute(
        text("""
            SELECT COUNT(*)
            FROM purchase_orders
        """)
    ).scalar()

    return {
        "total_hospitals": total_hospitals,
        "total_inventory": total_inventory,
        "critical_items": critical_items,
        "total_po": total_po
    }