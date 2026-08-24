import { useId, type CSSProperties } from "react";

export default function Bat({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  const rawId = useId();
  const gid = `bat-g-${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;
  const wing =
    "M62 24 C68 12 82 4 96 6 C104 7 110 9 112 12 C106 20 100 24 96 34 C90 26 84 30 78 42 C72 34 68 38 62 50 Z";

  return (
    <svg viewBox="0 0 120 64" className={className} style={style} aria-hidden="true">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF5E1F" />
          <stop offset="100%" stopColor="#FFB25E" />
        </linearGradient>
      </defs>
      <g fill={`url(#${gid})`}>
        <path d={wing} />
        <g transform="translate(120,0) scale(-1,1)">
          <path d={wing} />
        </g>
        <ellipse cx="60" cy="32" rx="7" ry="14" />
        <path d="M56 20 L50 4 L60 16 Z" />
        <path d="M64 20 L70 4 L60 16 Z" />
      </g>
    </svg>
  );
}
