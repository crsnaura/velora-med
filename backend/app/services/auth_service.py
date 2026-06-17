from sqlalchemy import text


def login_user(
    db,
    username,
    password
):

    user = db.execute(
        text("""
            SELECT
                u.username,
                u.password,
                u.role,
                u.tenant_id,
                t.nama_rs

            FROM users u

            LEFT JOIN tenants t
                ON u.tenant_id = t.tenant_id

            WHERE u.username = :username
        """),
        {
            "username": username
        }
    ).mappings().first()

    if not user:
        return None

    if user["password"] != password:
        return None

    return {
        "username": user["username"],
        "role": user["role"],
        "tenant_id": user["tenant_id"],
        "tenant_name": user["nama_rs"]
    }