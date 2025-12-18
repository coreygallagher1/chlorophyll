from app.schemas.fiscal import (
    InvoiceLine,
    InvoicePreview,
    ProjectProfitabilityRead,
    SubscriptionRead,
)


class FiscalService:
    """
    Fiscal & Compliance Service.

    Will eventually integrate with Stripe and encode MN sales tax rules.
    """

    async def get_subscription(self, subscription_id: int) -> SubscriptionRead:
        return SubscriptionRead(
            id=subscription_id,
            client_id=123,
            property_id=1,
            amount_monthly=350.0,
            next_bill_date=None,  # type: ignore[arg-type]
        )

    async def get_project_profitability(
        self,
        project_id: int,
    ) -> ProjectProfitabilityRead:
        revenue = 25_000.0
        labor = 9_000.0
        materials = 6_000.0
        margin = (revenue - labor - materials) / revenue * 100
        return ProjectProfitabilityRead(
            project_id=project_id,
            revenue=revenue,
            labor_costs=labor,
            material_costs=materials,
            margin_percent=margin,
        )

    async def preview_invoice(self, contract_id: int) -> InvoicePreview:
        lines = [
            InvoiceLine(
                description="Weekly weeding (taxable)",
                quantity=4,
                unit_price=100.0,
                tax_rate=0.06875,
                is_taxable=True,
            ),
            InvoiceLine(
                description="Plant installation (tax-exempt)",
                quantity=1,
                unit_price=600.0,
                tax_rate=0.0,
                is_taxable=False,
            ),
        ]
        subtotal = sum(l.quantity * l.unit_price for l in lines)
        tax_total = sum(
            l.quantity * l.unit_price * l.tax_rate for l in lines if l.is_taxable
        )
        total = subtotal + tax_total
        return InvoicePreview(
            contract_id=contract_id,
            subtotal=subtotal,
            tax_total=tax_total,
            total=total,
            lines=lines,
        )


