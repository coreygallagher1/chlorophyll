from datetime import date

from pydantic import BaseModel


class SubscriptionRead(BaseModel):
    id: int
    client_id: int
    property_id: int
    amount_monthly: float
    next_bill_date: date


class ProjectProfitabilityRead(BaseModel):
    project_id: int
    revenue: float
    labor_costs: float
    material_costs: float
    margin_percent: float


class InvoiceLine(BaseModel):
    description: str
    quantity: float
    unit_price: float
    tax_rate: float
    is_taxable: bool


class InvoicePreview(BaseModel):
    contract_id: int
    subtotal: float
    tax_total: float
    total: float
    lines: list[InvoiceLine]


