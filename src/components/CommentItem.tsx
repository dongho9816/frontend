import { Comment } from "@/types/post";

interface CommentItemProps {
  comment: Comment;
}

export default function CommentItem({ comment }: CommentItemProps) {
  return (
    <div style={{ 
      padding: '12px', 
      borderBottom: '1px solid #eee', 
      backgroundColor: '#f9f9f9',
      borderRadius: '5px',
      marginBottom: '8px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
        {/* 작성자 이름 */}
        <strong style={{ fontSize: '14px' }}>{comment.author}</strong>
        {/* 작성 시간 */}
        <span style={{ fontSize: '12px', color: '#888' }}>
          {new Date(comment.createdAt).toLocaleString()}
        </span>
      </div>
      
      {/* 댓글 내용 */}
      <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.4' }}>
        {comment.content}
      </p>
    </div>
  );
}