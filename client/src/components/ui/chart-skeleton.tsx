import { cn } from "@/lib/utils";

const BAR_HEIGHTS = ["35%", "55%", "45%", "70%", "60%", "85%", "75%", "95%"] as const;

export function ChartSkeleton({ className }: { className?: string }) {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-live="polite"
      className={cn(
        "h-full w-full rounded-md bg-muted/60 animate-pulse motion-reduce:animate-none",
        "flex items-end gap-1 p-3",
        className,
      )}
      data-testid="chart-skeleton"
    >
      {BAR_HEIGHTS.map((h, i) => (
        <span
          key={i}
          aria-hidden
          className="flex-1 rounded-sm bg-muted-foreground/15"
          style={{ height: h }}
        />
      ))}
      <span className="sr-only">Grafiek wordt geladen…</span>
    </div>
  );
}
