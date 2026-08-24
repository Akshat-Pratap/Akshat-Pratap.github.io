"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-ink px-6 text-center">
      <h1 className="font-display text-4xl font-bold">
        Something <span className="text-gradient-ember">broke</span>.
      </h1>
      <p className="max-w-md text-ash">
        An unexpected error occurred while rendering. Try again — if it
        persists, refresh the page.
      </p>
      <button
        onClick={reset}
        className="rounded-full bg-bone px-6 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-ember hover:text-bone"
      >
        Try again
      </button>
      <p className="text-xs text-ash/60">{error.message}</p>
    </div>
  );
}
