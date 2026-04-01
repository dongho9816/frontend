"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Post } from "@/types/post";
import { getPosts, savePosts } from "@/lib/mockData";
import CommentItem from "@/components/CommentItem"; // Step 4에서 만든 부품 가져오기

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  
  const [post, setPost] = useState<Post | null>(null); // 게시글 정보를 담을 바구니
  const [commentInput, setCommentInput] = useState(""); // 내가 쓸 댓글 담는 바구니

  // 1. 페이지가 열리면 주소창의 번호(id)를 보고 해당 글을 금고에서 찾아옴
  useEffect(() => {
    const allPosts = getPosts();
    const targetPost = allPosts.find((p) => p.id === params.id);
    if (targetPost) {
      setPost(targetPost);
    }
  }, [params.id]);

  // 2. [댓글 등록] 버튼을 눌렀을 때 실행되는 마법
  const handleCommentSubmit = () => {
    if (!commentInput.trim() || !post) return;

    // 새 댓글 상자 만들기
    const newComment = {
      id: Date.now().toString(),
      author: "익명 사자",
      content: commentInput,
      createdAt: new Date().toISOString(),
    };

    // 금고 업데이트: 전체 글 중에서 현재 글만 찾아 댓글을 추가함
    const allPosts = getPosts();
    const updatedPosts = allPosts.map((p) => 
      p.id === post.id ? { ...p, comments: [...p.comments, newComment] } : p
    );
    
    savePosts(updatedPosts); // 금고(localStorage)에 저장
    setPost({ ...post, comments: [...post.comments, newComment] }); // 화면 실시간 갱신
    setCommentInput(""); // 입력창 비우기
  };

  if (!post) return <div style={{ padding: '20px' }}>로딩 중...</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      {/* 뒤로가기 버튼 */}
      <button onClick={() => router.back()} style={{ marginBottom: '20px', cursor: 'pointer' }}>
        ← 뒤로가기
      </button>

      {/* 게시글 내용 */}
      <h1 style={{ fontSize: '28px', marginBottom: '10px' }}>{post.title}</h1>
      <p style={{ color: '#666', marginBottom: '20px' }}>작성자: {post.author} | {new Date(post.createdAt).toLocaleDateString()}</p>
      <div style={{ 
        minHeight: '200px', 
        padding: '20px', 
        border: '1px solid #eee', 
        borderRadius: '8px',
        lineHeight: '1.6',
        marginBottom: '40px' 
      }}>
        {post.content}
      </div>

      <hr />

      {/* 댓글 섹션 */}
      <h3 style={{ marginTop: '30px' }}>댓글 ({post.comments.length})</h3>
      
      <div style={{ marginTop: '20px' }}>
        {post.comments.length === 0 ? (
          <p style={{ color: '#999' }}>첫 댓글을 남겨보세요!</p>
        ) : (
          post.comments.map((c) => (
            <CommentItem key={c.id} comment={c} />
          ))
        )}
      </div>

      {/* 댓글 입력 폼 */}
      <div style={{ marginTop: '30px', display: 'flex', gap: '10px' }}>
        <input 
          type="text"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          placeholder="따뜻한 댓글을 남겨주세요"
          style={{ flex: 1, padding: '12px', borderRadius: '5px', border: '1px solid #ddd' }}
        />
        <button 
          onClick={handleCommentSubmit}
          style={{ padding: '10px 20px', background: '#000', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          등록
        </button>
      </div>
    </div>
  );
}