import { cn } from "@/lib/utils";

export function PageContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-2xl px-4 py-6 sm:px-6 sm:py-8 md:py-10",
        className
      )}
    >
      {children}
    </div>
  );
}
