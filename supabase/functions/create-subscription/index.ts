// Creates a Stripe subscription for Merchant ($49/mo) or Mogul ($200/mo)
// When deployed: creates Stripe Customer + Subscription
// Updates vendor tier, platform_fee_pct, listing_limit in DB
export default async function handler(_req: Request): Promise<Response> {
  return new Response(JSON.stringify({ error: 'Not implemented' }), {
    status: 501,
    headers: { 'Content-Type': 'application/json' },
  });
}
