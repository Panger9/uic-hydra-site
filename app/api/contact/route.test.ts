import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/** Public contact form: only checked, escaped messages reach the configured inbox. */
const mocks = vi.hoisted(() => ({ fetch: vi.fn() }));

import { POST } from "./route";

const valid = { subject: "Scrim?", email: "coach@example.com", message: "Hallo\n<script>x</script>" };

function post(body: unknown) {
  return POST(new Request("https://site.test/api/contact", { method: "POST", body: typeof body === "string" ? body : JSON.stringify(body) }));
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubEnv("RESEND_API_KEY", "re_test");
  vi.stubEnv("CONTACT_FROM", "site@example.test");
  vi.stubEnv("CONTACT_TO", "team@example.test");
  vi.stubGlobal("fetch", mocks.fetch);
  mocks.fetch.mockResolvedValue(new Response("{}"));
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("contact route", () => {
  it("sends nothing while the mail service is not configured", async () => {
    vi.stubEnv("CONTACT_TO", "");
    expect((await post(valid)).status).toBe(500);
    expect(mocks.fetch).not.toHaveBeenCalled();
  });

  it("answers bots that fill the hidden field and broken bodies with ok, without sending", async () => {
    await expect((await post({ ...valid, website: "https://spam.example" })).json()).resolves.toEqual({ ok: true });
    await expect((await post("not json")).json()).resolves.toEqual({ ok: true });
    expect(mocks.fetch).not.toHaveBeenCalled();
  });

  it.each<[string, Record<string, unknown>]>([
    ["a missing subject", { subject: "   " }],
    ["a missing message", { message: "" }],
    ["a subject over 140 characters", { subject: "x".repeat(141) }],
    ["a message over 4000 characters", { message: "x".repeat(4001) }],
    ["an invalid address", { email: "coach@example" }],
    ["an address with a header break", { email: "coach@example.com\nbcc:x@y.z" }],
  ])("rejects %s without sending", async (_case, change) => {
    expect((await post({ ...valid, ...change })).status).toBe(400);
    expect(mocks.fetch).not.toHaveBeenCalled();
  });

  it("sends to the configured inbox with the sender as reply-to and escapes the HTML", async () => {
    expect((await post(valid)).status).toBe(200);

    const [url, init] = mocks.fetch.mock.calls[0]!;
    const mail = JSON.parse(init.body as string);
    expect(url).toBe("https://api.resend.com/emails");
    expect(mail).toMatchObject({
      from: "site@example.test",
      to: ["team@example.test"],
      reply_to: "coach@example.com",
      subject: "UIC Hydra Kontakt: Scrim?",
    });
    expect(mail.html).not.toContain("<script>");
    expect(mail.html).toContain("&lt;script&gt;");
  });

  it("reports a refused delivery", async () => {
    mocks.fetch.mockResolvedValue(new Response("{}", { status: 422 }));
    expect((await post(valid)).status).toBe(502);
  });
});
