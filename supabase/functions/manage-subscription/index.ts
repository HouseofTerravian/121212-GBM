// Manages plan changes (upgrade/downgrade/cancel)
// When deployed: modifies Stripe subscription, updates vendor record
export default async function handler(_req: Request): Promise<Response> {
  return new Response(JSON.stringify({ error: 'Not implemented' }), {
    status: 501,
    headers: { 'Content-Type': 'application/json' },
  });
}
