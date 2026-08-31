type IconProps = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: "false" as const,
};

export function ArrowRight({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M3.5 10h13M11.5 5l5 5-5 5" />
    </svg>
  );
}

export function ArrowLeft({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M16.5 10h-13M8.5 15l-5-5 5-5" />
    </svg>
  );
}

export function Check({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M4 10.5 8 14.5 16 5.5" />
    </svg>
  );
}

export function Plus({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M10 4v12M4 10h12" />
    </svg>
  );
}

export function Close({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M5 5l10 10M15 5 5 15" />
    </svg>
  );
}

export function Menu({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <path d="M3 6h14M3 13h14" />
    </svg>
  );
}

export function Alert({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} {...base}>
      <circle cx="10" cy="10" r="7.25" />
      <path d="M10 6.4v4.2M10 13.4h.01" />
    </svg>
  );
}

export function Spinner({ className }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true" focusable="false">
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.25" />
      <path
        d="M17.5 10A7.5 7.5 0 0 0 10 2.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
