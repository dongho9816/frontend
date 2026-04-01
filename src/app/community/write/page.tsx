"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Post } from "@/types/post";
import { getPosts, savePosts } from "@/lib/mockData"; // 금고지기 도구들

export default function WritePage() {
  const router = useRouter();
  
  // 사용자가 입력할 제목과 내용을 담아둘 실시간 바구니
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    // 아무것도 안 쓰고 버튼 누르면 경고창 띄우기
    if (!title || !content) return alert("제목과 내용을 모두 입력해주세요!");

    // 1. 새 글 상자 만들기
    const newPost: Post = {
      id: Date.now().toString(), // 현재 시간을 숫자로 바꿔서 고유 ID로 사용
      title: title,
      content: content,
      author: "익명 사자", // 작성자 이름
      createdAt: new Date().toISOString(), // 작성 시간
      likes: 0,
      comments: [],
    };

    // 2. 금고에서 기존 글들을 싹 가져오기
    const allPosts = getPosts();

    // 3. 기존 글들 맨 앞에 내 새 글을 끼워넣어서 다시 금고에 저장하기
    savePosts([newPost, ...allPosts]);

    // 4. 저장이 끝났으니 목록 페이지로 도망가기(이동)
    router.push("/community");
  };

    return (
      <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '20px' }}>✍️ 새 글 쓰기</h1>
        
        {/* 제목 입력창 */}
        <input 
          type="text" 
          placeholder="제목을 입력하세요" 
          value={title}
          onChange={(e) => setTitle(e.target.value)} // 글자를 칠 때마다 바구니에 저장
          style={{ width: '100%', padding: '12px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
  
        {/* 내용 입력창 */}
        <textarea 
          placeholder="어떤 이야기를 하고 싶나요?" 
          value={content}
          onChange={(e) => setContent(e.target.value)} // 글자를 칠 때마다 바구니에 저장
          style={{ width: '100%', height: '200px', padding: '12px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
  
        {/* 저장 버튼 */}
        <button 
          onClick={handleSubmit}
          style={{ width: '100%', padding: '15px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          작성 완료
        </button>
      </div>
    );
  } 
