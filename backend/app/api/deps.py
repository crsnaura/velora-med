from fastapi import Header, HTTPException

VALID_TENANTS = {
    "T001",
    "T002",
    "T003",
    "T004"
}

def get_current_tenant(
    x_tenant_id: str = Header(...)
):
    if x_tenant_id not in VALID_TENANTS:
        raise HTTPException(
            status_code=400,
            detail="Tenant tidak valid"
        )

    return x_tenant_id