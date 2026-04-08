import { LoadingBlock } from "@/components/LoadingBlock";
import { PageContainer } from "@/components/PageContainer";

export default function PostDetailLoading() {
  return (
    <PageContainer>
      <div className="mb-6 h-5 w-24 animate-pulse rounded bg-muted" />
      <LoadingBlock />
      <LoadingBlock className="mt-4" />
    </PageContainer>
  );
}
