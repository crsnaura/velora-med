from sqlalchemy import text


def create_purchase_order(
    db,
    data
):

    db.execute(
        text("""
            INSERT INTO purchase_orders
            (
                tenant_id,
                vendor_name,
                item_name,
                quantity,
                status
            )
            VALUES
            (
                :tenant_id,
                NULL,
                :item_name,
                :quantity,
                'Draft'
            )
        """),
        data.dict()
    )

    db.commit()

    return {
        "message": "Purchase Order berhasil dibuat"
    }


def get_purchase_orders(
    db,
    tenant_id=None
):

    if tenant_id:

        result = db.execute(
            text("""
                SELECT *
                FROM purchase_orders
                WHERE tenant_id = :tenant_id
                ORDER BY created_at DESC
            """),
            {
                "tenant_id": tenant_id
            }
        )

    else:

        result = db.execute(
            text("""
                SELECT *
                FROM purchase_orders
                ORDER BY created_at DESC
            """)
        )

    return result.mappings().all()
def approve_purchase_order(
    db,
    po_id,
    vendor_name
):

    db.execute(
        text("""
            UPDATE purchase_orders

            SET
                vendor_name = :vendor_name,
                status = 'Approved'

            WHERE id = :id
        """),
        {
            "id": po_id,
            "vendor_name": vendor_name
        }
    )

    db.commit()

    return {
        "message": "PO Approved"
    }
    
def reject_purchase_order(
    db,
    po_id
):

    db.execute(
        text("""
            UPDATE purchase_orders

            SET status = 'Rejected'

            WHERE id = :po_id
        """),
        {
            "po_id": po_id
        }
    )

    db.commit()

    return {
        "message": "PO rejected"
    }