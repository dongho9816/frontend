"use client";

import { Post } from "@/types/post";
import { useRouter } from "next/navigation";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const router = useRouter();

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => router.push(`/community/${post.id}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          router.push(`/community/${post.id}`);
        }
      }}
      className="group cursor-pointer rounded-xl border border-border/60 bg-card/40 p-4 shadow-sm transition hover:border-border hover:bg-card/70 sm:p-5"
    >
      <p
        className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${
          post.section === "notice"
            ? "bg-rose-500/15 text-rose-300"
            : "bg-sky-500/15 text-sky-300"
        }`}
      >
        {post.section === "notice" ? "공지" : "자유게시판"}
      </p>
      <h2 className="text-base font-semibold leading-snug text-foreground transition group-hover:text-primary sm:text-lg">
        {post.title}
      </h2>
      <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
        {post.author}
        <span className="mx-2 text-border">·</span>
        {new Date(post.createdAt).toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground sm:text-sm">
        <span>
          <span aria-hidden>❤️</span>{" "}
          <span className="tabular-nums">{post.likes}</span>
        </span>
        <span>
          <span aria-hidden>💬</span>{" "}
          <span className="tabular-nums">{post.comments.length}</span>
        </span>
      </div>
    </article>
  );
}
