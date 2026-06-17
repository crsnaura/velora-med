from sqlalchemy import text
from sqlalchemy import text


def create_stock_out(
    db,
    data
):

    db.execute(
        text("""
            INSERT INTO stock_out
            (
                tenant_id,
                item_id,
                quantity,
                destination,
                issued_date
            )
            VALUES
            (
                :tenant_id,
                :item_id,
                :quantity,
                :destination,
                :issued_date
            )
        """),
        data.dict()
    )

    db.execute(
        text("""
            UPDATE inventory

            SET current_stock =
                current_stock - :quantity

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
        "message": "Stock Out berhasil"
    }

def get_stock_out(
    db,
    tenant_id
):

    result = db.execute(
        text("""
            SELECT
                so.id,
                i.item_name,
                so.quantity,
                so.destination,
                so.issued_date

            FROM stock_out so

            JOIN items i
                ON so.item_id = i.id

            WHERE so.tenant_id = :tenant_id

            ORDER BY so.issued_date DESC
        """),
        {
            "tenant_id": tenant_id
        }
    )

    return result.mappings().all()