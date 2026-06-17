from fastapi import APIRouter
from app.core.database import SessionLocal

from app.services.user_service import (
    get_users
)
from app.schemas.user_schema import (
    CreateUserRequest
)

from app.services.user_service import (
    get_users,
    create_user
)

router = APIRouter(
    prefix="/api/users",
    tags=["Users"]
)


@router.get("")
def users():

    db = SessionLocal()

    try:

        return get_users(db)

    finally:

        db.close()
        
@router.post("")
def create_user_api(
    payload: CreateUserRequest
):

    db = SessionLocal()

    try:

        return create_user(
            db,
            payload.username,
            payload.password,
            payload.role,
            payload.tenant_id
        )

    finally:

        db.close()