// Edge function stub for Stripe checkout
// When deployed:
// 1. Receives cart items + buyer ID
// 2. Groups items by vendor
// 3. Calculates platform fees (20%/10%/4% by tier)
// 4. Creates Stripe Checkout Session with application_fee_amount
// 5. Returns checkout URL
export default async function handler(req: Request): Promise<Response> {
  // TODO: Implement when Stripe keys are configured
  void req;
  return new Response(JSON.stringify({ error: 'Not implemented' }), {
    status: 501,
    headers: { 'Content-Type': 'application/json' },
  });
}
