"use client";

import { Post } from "@/types/post";
import { useRouter } from "next/navigation"; // 추가됨!

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const router = useRouter(); // 추가됨!

  return (
    <div 
      onClick={() => router.push(`/community/${post.id}`)} // 클릭 시 이동 기능!
      style={{ border: '1px solid #ddd', padding: '15px', margin: '10px 0', cursor: 'pointer', borderRadius: '8px' }}
    >
      <h2>{post.title}</h2>
      <p>작성자: {post.author}</p>
      <p>작성일: {new Date(post.createdAt).toLocaleDateString()}</p>
      <div>
        <span>👍 {post.likes}</span>
        <span style={{ marginLeft: '10px' }}>💬 {post.comments.length}</span>
      </div>
    </div>
  );
}