import { cn } from "@/lib/utils";

export function LoadingBlock({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl border border-border/50 bg-card/30 p-6",
        className
      )}
    >
      <div className="h-4 w-1/3 rounded bg-muted" />
      <div className="mt-4 h-3 w-full rounded bg-muted/80" />
      <div className="mt-2 h-3 w-5/6 rounded bg-muted/60" />
      <div className="mt-2 h-3 w-2/3 rounded bg-muted/40" />
    </div>
  );
}
