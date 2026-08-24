export default function Marquee({
  items,
  reverse = false,
  className = "",
}: {
  items: string[];
  reverse?: boolean;
  className?: string;
}) {
  const doubled = [...items, ...items];
  return (
    <div className={`marquee-track mask-fade-x overflow-hidden ${className}`}>
      <div
        className={`marquee-inner flex w-max ${
          reverse ? "animate-marquee-right" : "animate-marquee-left"
        }`}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="mx-3 flex shrink-0 items-center rounded-full border border-white/10 bg-white/[0.03] px-7 py-3 font-display text-lg text-bone/90"
          >
            {item}
            <span className="ml-6 h-1.5 w-1.5 rounded-full bg-ember/70" />
          </span>
        ))}
      </div>
    </div>
  );
}
