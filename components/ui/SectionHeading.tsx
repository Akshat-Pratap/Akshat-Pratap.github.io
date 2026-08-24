export default function SectionHeading({
  index,
  title,
}: {
  index: string;
  title: string;
}) {
  return (
    <div className="mb-14 flex items-center gap-4">
      <span className="font-display text-sm font-medium text-ember">
        /{index}
      </span>
      <h2 className="font-display text-sm uppercase tracking-[0.35em] text-ash">
        {title}
      </h2>
      <span className="h-px flex-1 bg-white/10" />
    </div>
  );
}
