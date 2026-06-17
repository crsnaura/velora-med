from sqlalchemy import text


def get_inventory_data(
    db,
    tenant_id,
    search=None
):

    query = """
        SELECT
            i.tenant_id,
            it.item_name,
            v.vendor_name,
            i.current_stock,
            i.stock_status

        FROM inventory i

        LEFT JOIN items it
            ON i.item_id = it.id

        LEFT JOIN vendors v
            ON i.vendor_id = v.id

        WHERE i.tenant_id = :tenant_id
    """

    params = {
        "tenant_id": tenant_id
    }

    if search:

        query += """
            AND LOWER(it.item_name)
            LIKE LOWER(:search)
        """

        params["search"] = f"%{search}%"

    query += """
        ORDER BY i.current_stock ASC
        LIMIT 20
    """

    result = db.execute(
        text(query),
        params
    )

    return result.mappings().all()