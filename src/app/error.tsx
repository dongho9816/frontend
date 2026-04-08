"use client";

import { useEffect } from "react";
import { PageContainer } from "@/components/PageContainer";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <PageContainer className="flex min-h-[50dvh] flex-col justify-center">
      <div className="rounded-2xl border border-destructive/30 bg-card/40 p-8">
        <h1 className="text-lg font-semibold text-foreground">문제가 발생했습니다</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          잠시 후 다시 시도해 주세요. 문제가 계속되면 페이지를 새로고침해 주세요.
        </p>
        {error?.message ? (
          <pre className="mt-4 max-h-32 overflow-auto rounded-lg border border-border/60 bg-muted/30 p-3 text-xs text-muted-foreground">
            {error.message}
          </pre>
        ) : null}
        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 inline-flex rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          다시 시도
        </button>
      </div>
    </PageContainer>
  );
}
