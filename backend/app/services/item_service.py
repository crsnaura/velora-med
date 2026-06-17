from sqlalchemy import text


def get_items(db):

    result = db.execute(
        text("""
            SELECT
                id,
                item_name
            FROM items
            ORDER BY item_name
        """)
    )

    return result.mappings().all()