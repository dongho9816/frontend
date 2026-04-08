"use client";

import { useEffect, useState } from "react";
import { Post, PostSection } from "@/types/post";
import { getPosts } from "@/lib/mockData";
import PostCard from "@/components/PostCard";
import { useRouter } from "next/navigation";
import { PageContainer } from "@/components/PageContainer";
import { EmptyState } from "@/components/EmptyState";
import { LoadingBlock } from "@/components/LoadingBlock";

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [activeSection, setActiveSection] = useState<PostSection>("notice");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    try {
      setPosts(getPosts());
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }, []);

  const filteredPosts = posts.filter((post) => post.section === activeSection);

  return (
    <PageContainer>
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            aria-label="메뉴 열기"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border/70 bg-card/50 hover:bg-card"
          >
            <span className="sr-only">메뉴</span>
            <span className="flex w-4 flex-col gap-1">
              <span className="h-0.5 w-full rounded bg-foreground/90" />
              <span className="h-0.5 w-full rounded bg-foreground/90" />
              <span className="h-0.5 w-full rounded bg-foreground/90" />
            </span>
          </button>
          <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            커뮤니티
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            게시글을 확인하고 참여해 보세요.
          </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => router.push("/community/write")}
          className="shrink-0 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90"
        >
          글 쓰기
        </button>
      </header>

      <div className="my-6 h-px w-full bg-border/80" />
      <div className="mb-5 flex gap-2">
        <button
          type="button"
          onClick={() => setActiveSection("notice")}
          className={`rounded-full px-4 py-2 text-sm ${
            activeSection === "notice"
              ? "bg-primary text-primary-foreground"
              : "border border-border/70 bg-card/40 text-foreground"
          }`}
        >
          공지
        </button>
        <button
          type="button"
          onClick={() => setActiveSection("free")}
          className={`rounded-full px-4 py-2 text-sm ${
            activeSection === "free"
              ? "bg-primary text-primary-foreground"
              : "border border-border/70 bg-card/40 text-foreground"
          }`}
        >
          자유게시판
        </button>
      </div>

      {status === "loading" ? (
        <div className="space-y-4">
          <LoadingBlock />
          <LoadingBlock />
        </div>
      ) : status === "error" ? (
        <EmptyState
          title="목록을 불러오지 못했습니다"
          description="저장된 데이터에 문제가 있을 수 있습니다. 브라우저 저장소를 확인하거나 새로고침해 주세요."
        />
      ) : posts.length === 0 ? (
        <EmptyState
          title="아직 게시글이 없습니다"
          description="첫 글을 작성해 보세요."
        />
      ) : filteredPosts.length === 0 ? (
        <EmptyState
          title="이 섹션에는 게시글이 없습니다"
          description="다른 섹션을 보거나 새 글을 작성해 보세요."
        />
      ) : (
        <ul className="space-y-3 sm:space-y-4">
          {filteredPosts.map((post) => (
            <li key={post.id}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <aside className="h-full w-1/3 min-w-64 max-w-sm border-r border-border/70 bg-background p-5 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold">메뉴</h2>
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-md border border-border/70 px-2 py-1 text-sm"
              >
                닫기
              </button>
            </div>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => {
                  setActiveSection("notice");
                  setIsMenuOpen(false);
                }}
                className="w-full rounded-lg border border-border/70 bg-card/40 px-3 py-2 text-left text-sm"
              >
                공지
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveSection("free");
                  setIsMenuOpen(false);
                }}
                className="w-full rounded-lg border border-border/70 bg-card/40 px-3 py-2 text-left text-sm"
              >
                자유게시판
              </button>
            </div>
          </aside>
          <button
            type="button"
            onClick={() => setIsMenuOpen(false)}
            className="h-full flex-1 bg-black/40"
            aria-label="메뉴 닫기 배경"
          />
        </div>
      )}
    </PageContainer>
  );
}
