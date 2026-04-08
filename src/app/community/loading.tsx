import { LoadingBlock } from "@/components/LoadingBlock";
import { PageContainer } from "@/components/PageContainer";

export default function CommunityLoading() {
  return (
    <PageContainer>
      <div className="mb-6 h-8 w-40 animate-pulse rounded-lg bg-muted sm:h-9 sm:w-48" />
      <LoadingBlock />
      <LoadingBlock className="mt-4" />
    </PageContainer>
  );
}
