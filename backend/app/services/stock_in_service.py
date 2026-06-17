from sqlalchemy import text


def get_stock_in(
    db,
    tenant_id
):

    result = db.execute(
        text("""
            SELECT
                si.id,
                i.item_name,
                v.vendor_name,
                si.quantity,
                si.received_date

            FROM stock_in si

            JOIN items i
                ON si.item_id = i.id

            JOIN vendors v
                ON si.vendor_id = v.id

            WHERE si.tenant_id = :tenant_id

            ORDER BY si.received_date DESC
        """),
        {
            "tenant_id": tenant_id
        }
    )

    return result.mappings().all()

def create_stock_in(
    db,
    data
):

    db.execute(
        text("""
            INSERT INTO stock_in
            (
                tenant_id,
                item_id,
                vendor_id,
                quantity,
                received_date
            )
            VALUES
            (
                :tenant_id,
                :item_id,
                :vendor_id,
                :quantity,
                :received_date
            )
        """),
        data.dict()
    )

    db.execute(
        text("""
            UPDATE inventory

            SET current_stock =
                current_stock + :quantity

            WHERE tenant_id = :tenant_id
            AND item_id = :item_id
        """),
        {
            "tenant_id": data.tenant_id,
            "item_id": data.item_id,
            "quantity": data.quantity
        }
    )

    db.commit()

    return {
        "message": "Stock In berhasil"
    }