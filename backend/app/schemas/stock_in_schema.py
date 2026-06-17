from pydantic import BaseModel


class StockInCreate(BaseModel):

    tenant_id: str
    item_id: int
    vendor_id: int
    quantity: int
    received_date: str