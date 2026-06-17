from pydantic import BaseModel


class PurchaseOrderCreate(BaseModel):

    tenant_id: str
    item_name: str
    quantity: int
    
class ApprovePORequest(BaseModel):
    vendor_name: str