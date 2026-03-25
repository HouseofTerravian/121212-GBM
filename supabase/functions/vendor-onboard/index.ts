// Initiates Stripe Connect onboarding for a vendor
// Creates Express account and returns onboarding URL
export default async function handler(_req: Request): Promise<Response> {
  return new Response(JSON.stringify({ error: 'Not implemented' }), {
    status: 501,
    headers: { 'Content-Type': 'application/json' },
  });
}
