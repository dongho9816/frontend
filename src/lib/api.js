import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

// 요청 인터셉터: 브라우저 저장소의 access token을 자동 첨부
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 게시글 목록 조회
export const fetchPosts = async () => {
  const res = await api.get("/posts");
  return res.data;
};

// 회원가입
export const register = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

// 로그인
export const login = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

// 내 정보 조회
export const getMe = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};

// 게시글 상세 조회
export const fetchPost = async (id) => {
  const res = await api.get(`/posts/${id}`);
  return res.data;
};

// 게시글 작성 (author는 서버에서 토큰 기반으로 처리)
export const createPost = async ({ title, content }) => {
  const res = await api.post("/posts", { title, content });
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

// 댓글 작성 (author는 서버에서 토큰 기반으로 처리)
export const createComment = async (postId, { content }) => {
  const res = await api.post(`/posts/${postId}/comments`, { content });
  return res.data;
};

// 댓글 삭제
export const deleteComment = async (commentId) => {
  const res = await api.delete(`/comments/${commentId}`);
  return res.data;
};

export default api;