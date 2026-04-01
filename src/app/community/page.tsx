"use client";

import { useState, useEffect } from "react";
import { Post } from "@/types/post";
import { getPosts } from "@/lib/mockData"; // 금고에서 글 가져오는 기계
import PostCard from "@/components/PostCard"; // 아까 만든 명함 부품
import { useRouter } from "next/navigation";

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([]); // 게시글들을 담을 바구니
  const router = useRouter(); // 글쓰기 페이지로 이동할 리모컨


useEffect(() => {
  // 페이지가 로드되면 금고(localStorage)에서 글을 가져와 바구니에 담음
  const savedPosts = getPosts();
  setPosts(savedPosts);
}, []);

return (
  <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h1>🏛️ 커뮤니티</h1>
      <button 
        onClick={() => router.push('/community/write')}
        style={{ padding: '10px 20px', cursor: 'pointer' }}
      >
        글 쓰기
      </button>
    </div>
    <hr style={{ margin: '20px 0' }} />

    {/* 바구니(posts)에 담긴 글 개수만큼 PostCard를 반복해서 그려라! */}
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  </div>
);
} 