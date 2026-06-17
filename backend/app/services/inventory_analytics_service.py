from sqlalchemy import text


def get_inventory_analytics(
    db,
    tenant_id
):

    result = db.execute(
    text("""
        SELECT
            i.item_name,
            inv.current_stock,
            inv.min_required,
            inv.max_capacity,
            inv.avg_usage_per_day,
            inv.days_until_stockout,
            inv.stock_status,
            inv.needs_reorder

        FROM inventory inv

        JOIN items i
            ON inv.item_id = i.id

        WHERE inv.tenant_id = :tenant_id
    """),
    {
        "tenant_id": tenant_id
    }
)

    data = result.mappings().all()

    print("=" * 50)
    print("TENANT =", tenant_id)
    print("ROWS =", len(data))
    print("=" * 50)
    total_items = len(data)

    critical = len([
        x for x in data
        if x["stock_status"] == "Critical"
    ])

    warning = len([
        x for x in data
        if x["stock_status"] == "Warning"
    ])

    safe = len([
        x for x in data
        if x["stock_status"] == "Safe"
    ])

    restock = sorted(
        data,
        key=lambda x: x["current_stock"]
    )[:5]

    unique_items = {}

    for item in data:

        item_name = item["item_name"]

        if (
            item_name not in unique_items
            or
            item["avg_usage_per_day"]
            >
            unique_items[item_name]["avg_usage_per_day"]
        ):
            unique_items[item_name] = item

    fast_moving = sorted(
        unique_items.values(),
        key=lambda x: x["avg_usage_per_day"],
        reverse=True
    )[:5]

    stockout = [
    {
        "item_name": item["item_name"],
        "days_left": item["days_until_stockout"]
    }
    for item in data
]

    stockout = sorted(
        stockout,
        key=lambda x: x["days_left"]
    )[:5]

    health_score = round(
        (safe / total_items) * 100
    )
    
    predictions = db.execute(
        text("""
            SELECT
                i.item_name,
                inv.current_stock,
                inv.avg_usage_per_day,
                inv.days_until_stockout

            FROM inventory inv

            JOIN items i
                ON inv.item_id = i.id

            WHERE inv.tenant_id = :tenant_id

            ORDER BY inv.days_until_stockout ASC

            LIMIT 10
        """),
        {
            "tenant_id": tenant_id
        }
    ).mappings().all()
    critical_items = [
        x for x in data
        if x["stock_status"] == "Critical"
    ]

    warning_items = [
        x for x in data
        if x["stock_status"] == "Warning"
    ]

    safe_items = [
        x for x in data
        if x["stock_status"] == "Safe"
    ]
    return {
        "total_items": total_items,
        "critical": critical,
        "warning": warning,
        "safe": safe,
        "health_score": health_score,

        "restock": restock,
        "fast_moving": fast_moving,
        "stockout": stockout,

        "predictions": predictions,
        "critical_items": critical_items,
"warning_items": warning_items,
"safe_items": safe_items,
    }

