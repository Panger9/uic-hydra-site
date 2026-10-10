"use client";

import { Check, Send } from "lucide-react";
import { useId, useState, type FormEvent } from "react";
import { Button, Field, Input, Textarea } from "./ui";

type SubmitState = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const id = useId();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      subject: String(formData.get("subject") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      message: String(formData.get("message") || "").trim(),
      website: String(formData.get("website") || "").trim(),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(result?.error || "Die Anfrage konnte nicht gesendet werden.");
      }

      form.reset();
      setStatus("sent");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Die Anfrage konnte nicht gesendet werden.");
    }
  }

  if (status === "sent") {
    return (
      <div className="grid min-h-[22rem] place-items-center text-center" role="status">
        <div className="grid justify-items-center gap-4">
          <span className="grid size-16 animate-[rx-body-in_600ms_cubic-bezier(0.34,1.56,0.64,1)_both] place-items-center rounded-full bg-win/15 text-win ring-1 ring-win/30">
            <Check aria-hidden="true" className="size-7" strokeWidth={2.2} />
          </span>
          <div>
            <p className="font-display text-xl font-semibold text-fg">Gesendet.</p>
            <p className="mt-1 text-sm text-fg-muted">Deine Anfrage liegt im Postfach. Wir melden uns.</p>
          </div>
          <Button onClick={() => setStatus("idle")} size="sm" variant="ghost">
            Weitere Anfrage schreiben
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <input aria-hidden="true" autoComplete="off" className="hidden" name="website" tabIndex={-1} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field htmlFor={`${id}-subject`} label="Betreff">
          <Input id={`${id}-subject`} name="subject" placeholder="Scrim Anfrage, Prime League, Kontakt" required />
        </Field>
        <Field htmlFor={`${id}-email`} label="Deine E-Mail">
          <Input autoComplete="email" id={`${id}-email`} name="email" placeholder="name@example.com" required type="email" />
        </Field>
      </div>
      <Field htmlFor={`${id}-message`} label="Nachricht">
        <Textarea
          className="min-h-36 resize-none"
          id={`${id}-message`}
          name="message"
          placeholder="Kurz sagen, worum es geht. Zeitfenster, Format und relevante Infos reichen."
          required
        />
      </Field>
      <div className="flex flex-wrap items-center gap-3 pt-1">
        <Button
          icon={<Send aria-hidden="true" className="size-4" />}
          loading={status === "sending"}
          size="lg"
          type="submit"
          variant="primary"
        >
          {status === "sending" ? "Wird gesendet" : "Anfrage senden"}
        </Button>
        {status === "error" ? (
          <p className="text-sm text-loss" role="alert">
            {errorMessage}
          </p>
        ) : null}
      </div>
    </form>
  );
}
