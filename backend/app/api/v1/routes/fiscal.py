from fastapi import APIRouter

from app.schemas.fiscal import (
    InvoicePreview,
    ProjectProfitabilityRead,
    SubscriptionRead,
)
from app.services.fiscal import FiscalService


router = APIRouter()
service = FiscalService()


@router.get("/subscriptions/{subscription_id}", response_model=SubscriptionRead)
async def get_subscription(subscription_id: int) -> SubscriptionRead:
    return await service.get_subscription(subscription_id)


@router.get("/projects/{project_id}/profitability", response_model=ProjectProfitabilityRead)
async def get_project_profitability(project_id: int) -> ProjectProfitabilityRead:
    return await service.get_project_profitability(project_id)


@router.get("/invoices/{contract_id}/preview", response_model=InvoicePreview)
async def preview_invoice(contract_id: int) -> InvoicePreview:
    """
    Show how MN sales tax would be applied for a given maintenance contract.
    """
    return await service.preview_invoice(contract_id)


