export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export type PostSection = "notice" | "free";

// 목록 조회용 (commentCount가 숫자로 옴)
export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  likes: number;
  comments: Comment[];
  section: PostSection;
  // API 응답 호환용(선택): 목록 API가 count만 줄 때를 대비
  commentCount?: number;
}

// 상세 조회용 (comments 배열이 옴)
export interface PostDetail extends Post {
  comments: Comment[];
}