// Container healthcheck: answers as soon as the server runs.
export function GET() {
  return Response.json({ ok: true });
}
