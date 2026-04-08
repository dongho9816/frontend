import { LoadingBlock } from "@/components/LoadingBlock";
import { PageContainer } from "@/components/PageContainer";

export default function Loading() {
  return (
    <PageContainer>
      <p className="mb-4 text-sm text-muted-foreground">불러오는 중…</p>
      <LoadingBlock />
      <LoadingBlock className="mt-4" />
    </PageContainer>
  );
}
