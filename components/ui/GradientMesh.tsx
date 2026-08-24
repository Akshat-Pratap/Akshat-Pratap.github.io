export default function GradientMesh({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div className="absolute -left-[15%] top-[-20%] h-[55vmax] w-[55vmax] animate-drift-a rounded-full bg-ember/20 blur-[130px]" />
      <div className="absolute bottom-[-25%] right-[-15%] h-[50vmax] w-[50vmax] animate-drift-b rounded-full bg-glow/15 blur-[140px]" />
      <div className="absolute left-[35%] top-[45%] h-[30vmax] w-[30vmax] rounded-full bg-rose-600/10 blur-[110px]" />
    </div>
  );
}
