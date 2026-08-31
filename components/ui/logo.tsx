/**
 * The Zidi mark: a doorway arch with a tone stroke above it — the acute accent
 * that sits over vowels in Yorùbá and Igbo. Monochrome, so it inherits colour
 * from its container and works on ivory or on kola.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 34"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M10.5 6.4 17.6 1.6"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 9.6c-6.075 0-11 4.925-11 11V33h22V20.6c0-6.075-4.925-11-11-11Zm0 5.4a5.6 5.6 0 0 0-5.6 5.6V33h11.2V20.6A5.6 5.6 0 0 0 14 15Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Logo({
  className,
  wordmarkClassName,
}: {
  className?: string;
  wordmarkClassName?: string;
}) {
  return (
    <span className={className}>
      <LogoMark className="h-[1.35em] w-auto text-clay" />
      <span className={wordmarkClassName}>Zidi</span>
    </span>
  );
}
