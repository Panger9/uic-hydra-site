// Copies of the few RiftOps design-system pieces this site uses.
import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

/** Joins class names; later Tailwind classes override conflicting earlier ones. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return twMerge(classes.filter(Boolean).join(" "));
}

type BadgeTone = "neutral" | "accent" | "win";

const badgeTones: Record<BadgeTone, string> = {
  neutral: "border-line-strong bg-surface-2 text-fg-muted",
  accent: "border-accent/30 bg-accent/10 text-accent",
  win: "border-win/30 bg-win/10 text-win",
};

const badgeDots: Record<BadgeTone, string> = {
  neutral: "bg-fg-subtle",
  accent: "bg-accent",
  win: "bg-win",
};

/** Compact status label. Pair color with text; never rely on color alone. */
export function Badge({ tone = "neutral", dot = false, children }: { tone?: BadgeTone; dot?: boolean; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex h-6 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 text-xs font-medium",
        badgeTones[tone],
      )}
    >
      {dot ? <span aria-hidden="true" className={cn("size-1.5 rounded-full", badgeDots[tone])} /> : null}
      {children}
    </span>
  );
}

type ButtonVariant = "primary" | "accent" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-inverse text-on-inverse hover:bg-inverse/88 shadow-[0_1px_0_rgb(255_255_255/0.12)_inset]",
  accent: "bg-accent text-on-accent hover:bg-accent-strong shadow-[0_4px_14px_-10px_var(--rx-accent)]",
  secondary: "border border-line-strong bg-surface-2 text-fg hover:border-fg-subtle/60 hover:bg-surface-3",
  ghost: "text-fg-muted hover:bg-surface-2 hover:text-fg",
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: "h-8 gap-1.5 rounded-[9px] px-3 text-[13px]",
  md: "h-10 gap-2 rounded-[10px] px-4 text-sm",
  lg: "h-12 gap-2 rounded-xl px-5 text-[15px]",
};

const buttonBase =
  "inline-flex shrink-0 select-none items-center justify-center whitespace-nowrap font-medium transition-[background-color,border-color,color,transform,box-shadow,opacity] duration-150 ease-out active:scale-[0.97] disabled:pointer-events-none disabled:opacity-45";

export function buttonClasses({
  variant = "secondary",
  size = "md",
  className,
}: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}) {
  return cn(buttonBase, buttonVariants[variant], buttonSizes[size], className);
}

export function Button({
  variant,
  size,
  loading = false,
  icon,
  className,
  children,
  disabled,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; size?: ButtonSize; loading?: boolean; icon?: ReactNode }) {
  return (
    <button
      {...props}
      aria-busy={loading || undefined}
      className={buttonClasses({ variant, size, className })}
      disabled={disabled || loading}
      type={type}
    >
      {loading ? (
        <span aria-hidden="true" className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent opacity-80" />
      ) : (
        icon
      )}
      {children}
    </button>
  );
}

export function IconButton({
  label,
  className,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) {
  return (
    <button
      {...props}
      aria-label={label}
      className={cn(buttonBase, buttonVariants.ghost, "size-10 rounded-[10px]", className)}
      title={props.title ?? label}
      type={type}
    />
  );
}

export function Avatar({ src, name, size = 36, className }: { src?: string | null; name: string; size?: number; className?: string }) {
  const initials = name
    .split(/[\s#]+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <span
      className={cn(
        "relative inline-grid shrink-0 place-items-center overflow-hidden rounded-full bg-surface-3 font-medium text-fg-muted ring-1 ring-line",
        className,
      )}
      style={{ width: size, height: size, fontSize: Math.max(10, size * 0.36) }}
    >
      {src ? <img alt="" className="size-full object-cover" src={src} /> : initials || "?"}
    </span>
  );
}

const controlClasses =
  "w-full min-w-0 rounded-[10px] border border-line-strong bg-surface-2 px-3 text-[15px] text-fg outline-none transition-[border-color,box-shadow,background-color] duration-150 placeholder:text-fg-subtle hover:border-fg-subtle/50 focus:border-fg-muted focus:bg-surface focus:shadow-[0_0_0_3px_var(--rx-focus-soft)] disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm";

/** Label and control stacked with consistent spacing. */
export function Field({ label, htmlFor, children }: { label: ReactNode; htmlFor: string; children: ReactNode }) {
  return (
    <div className="grid content-start gap-1.5">
      <label className="text-[13px] font-medium text-fg-muted" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
    </div>
  );
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(controlClasses, "h-10", className)} />;
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn(controlClasses, "min-h-28 py-2.5 leading-6", className)} />;
}
