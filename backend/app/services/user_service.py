from sqlalchemy import text


def get_users(db):

    result = db.execute(
        text("""
            SELECT
                u.username,
                u.role,
                u.tenant_id,
                t.nama_rs

            FROM users u

            LEFT JOIN tenants t
                ON u.tenant_id = t.tenant_id

            ORDER BY u.username
        """)
    )

    return result.mappings().all()


def create_user(
    db,
    username,
    password,
    role,
    tenant_id
):

    db.execute(
        text("""
            INSERT INTO users
            (
                username,
                password,
                role,
                tenant_id
            )
            VALUES
            (
                :username,
                :password,
                :role,
                :tenant_id
            )
        """),
        {
            "username": username,
            "password": password,
            "role": role,
            "tenant_id": tenant_id
        }
    )

    db.commit()

    return {
        "message": "User created"
    }