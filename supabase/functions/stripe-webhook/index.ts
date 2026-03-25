// Webhook stub for Stripe events
// When deployed: handles checkout.session.completed, creates order records
export default async function handler(req: Request): Promise<Response> {
  void req;
  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
