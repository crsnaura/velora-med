from sqlalchemy import text


def get_executive_dashboard(
    db,
    tenant_id
):

    critical_items = db.execute(
        text("""
            SELECT COUNT(*)

            FROM inventory

            WHERE tenant_id = :tenant_id
            AND stock_status = 'Critical'
        """),
        {
            "tenant_id": tenant_id
        }
    ).scalar()

    pending_po = db.execute(
        text("""
            SELECT COUNT(*)
            FROM purchase_orders
            WHERE tenant_id = :tenant_id
            AND status = 'Pending'
        """),
        {
            "tenant_id": tenant_id
        }
    ).scalar()

    approved_po = db.execute(
        text("""
            SELECT COUNT(*)
            FROM purchase_orders
            WHERE tenant_id = :tenant_id
            AND status = 'Approved'
        """),
        {
            "tenant_id": tenant_id
        }
    ).scalar()

    total_procurement = db.execute(
        text("""
            SELECT
                COALESCE(
                    SUM(quantity),
                    0
                )
            FROM purchase_orders
            WHERE tenant_id = :tenant_id
        """),
        {
            "tenant_id": tenant_id
        }
    ).scalar()

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

    safe_count = db.execute(
        text("""
            SELECT COUNT(*)
            FROM inventory
            WHERE tenant_id=:tenant_id
            AND stock_status='Safe'
        """),
        {"tenant_id": tenant_id}
    ).scalar()

    warning_count = db.execute(
        text("""
            SELECT COUNT(*)
            FROM inventory
            WHERE tenant_id=:tenant_id
            AND stock_status='Warning'
        """),
        {"tenant_id": tenant_id}
    ).scalar()

    return {
        "critical_items": critical_items,
        "pending_po": pending_po,
        "approved_po": approved_po,
        "total_procurement": total_procurement,
        "top_supplier": top_supplier,
        "most_requested": most_requested
    }