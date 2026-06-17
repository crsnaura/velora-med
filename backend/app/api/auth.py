from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.schemas.auth_schema import (
    LoginRequest
)

from app.services.auth_service import (
    login_user
)

router = APIRouter(
    prefix="/api",
    tags=["Authentication"]
)


@router.post("/login")
def login(
    payload: LoginRequest,
    db: Session = Depends(get_db)
):

    result = login_user(
        db,
        payload.username,
        payload.password
    )

    if not result:
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )

    return result