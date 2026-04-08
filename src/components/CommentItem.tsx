import { Comment } from "@/types/post";

interface CommentItemProps {
  comment: Comment;
  onDelete?: (commentId: string) => void;
}

export default function CommentItem({ comment, onDelete }: CommentItemProps) {
  const dateLabel = `${String(new Date(comment.createdAt).getMonth() + 1).padStart(2, "0")}.${String(
    new Date(comment.createdAt).getDate()
  ).padStart(2, "0")}`;

  return (
    <div className="rounded-lg border border-border/50 bg-muted/25 px-4 py-3 sm:px-4 sm:py-3.5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div className="flex min-w-0 flex-wrap items-baseline gap-2">
          <strong className="text-sm font-medium text-foreground">{comment.author}</strong>
          <time
            dateTime={comment.createdAt}
            className="text-xs text-muted-foreground tabular-nums"
          >
            {dateLabel}
          </time>
        </div>
        {onDelete ? (
          <button
            type="button"
            onClick={() => onDelete(comment.id)}
            className="rounded-md border border-border/70 px-2 py-1 text-xs text-muted-foreground transition hover:bg-secondary/60 hover:text-foreground"
          >
            삭제
          </button>
        ) : null}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-foreground/90">{comment.content}</p>
    </div>
  );
}
