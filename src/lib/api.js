import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

// 게시글 목록 조회
export const fetchPosts = async () => {
  const res = await api.get("/posts");
  return res.data;
};

// 게시글 상세 조회
export const fetchPost = async (id) => {
  const res = await api.get(`/posts/${id}`);
  return res.data;
};

// 게시글 작성
export const createPost = async (data) => {
  const res = await api.post("/posts", data);
  return res.data;
};

// 게시글 삭제
export const deletePost = async (id) => {
  const res = await api.delete(`/posts/${id}`);
  return res.data;
};

// 좋아요 토글
export const toggleLike = async (id) => {
  const res = await api.patch(`/posts/${id}/like`);
  return res.data;
};

// 댓글 작성
export const createComment = async (postId, data) => {
  const res = await api.post(`/posts/${postId}/comments`, data);
  return res.data;
};

// 댓글 삭제
export const deleteComment = async (commentId) => {
  const res = await api.delete(`/comments/${commentId}`);
  return res.data;
};

export default api;