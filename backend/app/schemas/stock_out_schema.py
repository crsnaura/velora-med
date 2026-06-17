from pydantic import BaseModel


class StockOutCreate(BaseModel):

    tenant_id: str
    item_id: int
    quantity: int
    destination: str
    issued_date: str