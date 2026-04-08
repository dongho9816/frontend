"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import CommentItem from "@/components/CommentItem";
import { getPosts, savePosts } from "@/lib/mockData";
import { fetchPost } from "@/lib/api";
import { Comment, PostDetail } from "@/types/post";
import { PageContainer } from "@/components/PageContainer";
import { EmptyState } from "@/components/EmptyState";
import { LoadingBlock } from "@/components/LoadingBlock";

type LoadState = "loading" | "notfound" | "ready" | "error";

function formatPostDate(iso: string) {
  return new Date(iso).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string | undefined;

  const [post, setPost] = useState<PostDetail | null>(null);
  const [commentInput, setCommentInput] = useState("");
  const [loadState, setLoadState] = useState<LoadState>("loading");

  useEffect(() => {
    if (!id) {
      setLoadState("notfound");
      return;
    }

    const loadPost = async () => {
      setLoadState("loading");
      try {
        const data = await fetchPost(id);
        setPost(data);
        setLoadState("ready");
      } catch (error: any) {
        if (error?.response?.status === 404) {
          setLoadState("notfound");
        } else {
          setLoadState("error");
        }
      }
    };

    loadPost();
  }, [id]);

  const handleLike = () => {
    if (!post) return;
    const posts = getPosts();
    const updatedPosts = posts.map((item) =>
      item.id === post.id ? { ...item, likes: item.likes + 1 } : item
    );
    savePosts(updatedPosts);
    const updatedPost = updatedPosts.find((item) => item.id === post.id) ?? null;
    setPost(updatedPost);
  };

  const handleComment = () => {
    if (!post) return;
    if (!commentInput.trim()) {
      alert("댓글 내용을 입력해주세요!");
      return;
    }
    const newComment: Comment = {
      id: Date.now().toString(),
      content: commentInput.trim(),
      author: "익명 사자",
      createdAt: new Date().toISOString(),
    };
    const posts = getPosts();
    const updatedPosts = posts.map((item) =>
      item.id === post.id ? { ...item, comments: [...item.comments, newComment] } : item
    );
    savePosts(updatedPosts);
    const updatedPost = updatedPosts.find((item) => item.id === post.id) ?? null;
    setPost(updatedPost);
    setCommentInput("");
  };

  const handleDeletePost = () => {
    if (!post) return;
    const confirmed = confirm("이 게시글을 삭제하시겠습니까?");
    if (!confirmed) return;

    const posts = getPosts();
    const updatedPosts = posts.filter((item) => item.id !== post.id);
    savePosts(updatedPosts);
    router.push("/community");
  };

  const handleDeleteComment = (commentId: string) => {
    if (!post) return;
    const confirmed = confirm("이 댓글을 삭제하시겠습니까?");
    if (!confirmed) return;

    const posts = getPosts();
    const updatedPosts = posts.map((item) =>
      item.id === post.id
        ? { ...item, comments: item.comments.filter((comment) => comment.id !== commentId) }
        : item
    );
    savePosts(updatedPosts);
    const updatedPost = updatedPosts.find((item) => item.id === post.id) ?? null;
    setPost(updatedPost);
  };

  if (loadState === "loading") {
    return (
      <PageContainer>
        <LoadingBlock />
        <LoadingBlock className="mt-4" />
      </PageContainer>
    );
  }

  if (loadState === "error") {
    return (
      <PageContainer className="flex min-h-[40dvh] flex-col justify-center">
        <EmptyState
          title="게시글을 불러오지 못했습니다"
          description="데이터를 읽는 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."
        />
        <button
          type="button"
          onClick={() => router.push("/community")}
          className="mt-6 rounded-lg border border-border/80 bg-secondary/50 px-4 py-2.5 text-sm font-medium text-secondary-foreground"
        >
          목록으로
        </button>
      </PageContainer>
    );
  }

  if (loadState === "notfound" || !post) {
    return (
      <PageContainer className="flex min-h-[40dvh] flex-col justify-center">
        <EmptyState
          title="게시글을 찾을 수 없습니다"
          description="삭제되었거나 주소가 잘못되었을 수 있습니다."
        />
        <button
          type="button"
          onClick={() => router.push("/community")}
          className="mt-6 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
        >
          목록으로 돌아가기
        </button>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <button
        type="button"
        onClick={() => router.push("/community")}
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition hover:text-foreground"
      >
        ← 목록으로
      </button>

      <article className="rounded-2xl border border-border/60 bg-card/35 p-5 shadow-sm sm:p-7">
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            {post.title}
          </h1>
          <button
            type="button"
            onClick={handleDeletePost}
            className="shrink-0 inline-flex items-center rounded-lg border border-red-400/50 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-300 transition hover:bg-red-500/20 sm:text-sm"
          >
            게시글 삭제
          </button>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          <span className="text-foreground/90">{post.author}</span>
          <span className="mx-2 text-border">·</span>
          <time dateTime={post.createdAt}>{formatPostDate(post.createdAt)}</time>
        </p>
        <div className="mt-6 whitespace-pre-wrap text-pretty text-sm leading-relaxed text-foreground/95">
          {post.content}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleLike}
            className="inline-flex items-center gap-2 rounded-lg border border-border/70 bg-secondary/40 px-4 py-2 text-sm font-medium text-secondary-foreground transition hover:bg-secondary/70"
          >
            <span aria-hidden>❤️</span>
            좋아요 <span className="tabular-nums text-muted-foreground">{post.likes}</span>
          </button>
        </div>
      </article>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-foreground">
          댓글 <span className="tabular-nums text-muted-foreground">{post.comments.length}</span>
        </h2>

        <div className="mt-4 space-y-3">
          {post.comments.length === 0 ? (
            <EmptyState
              title="아직 댓글이 없습니다"
              description="첫 댓글을 남겨 대화를 시작해 보세요."
            />
          ) : (
            post.comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} onDelete={handleDeleteComment} />
            ))
          )}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="댓글을 입력하세요"
            className="min-w-0 flex-1 rounded-lg border border-input bg-card/40 px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground/70 focus:border-ring focus:ring-1 focus:ring-ring"
          />
          <button
            type="button"
            onClick={handleComment}
            className="shrink-0 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            작성
          </button>
        </div>
      </section>
    </PageContainer>
  );
}
