import { create } from "zustand";
import { User } from "@/types/post";

interface AuthState {
  token: string | null;
  user: User | null;
  isLoggedIn: boolean;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isLoggedIn: false,

  setAuth: (token, user) => {
    set({
      token,
      user,
      isLoggedIn: true,
    });

    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", token);
      localStorage.setItem("user", JSON.stringify(user));
    }
  },

  logout: () => {
    set({
      token: null,
      user: null,
      isLoggedIn: false,
    });

    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
    }
  },

  initialize: () => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("access_token");
    const userRaw = localStorage.getItem("user");

    if (!token || !userRaw) {
      set({
        token: null,
        user: null,
        isLoggedIn: false,
      });
      return;
    }

    try {
      const user = JSON.parse(userRaw) as User;
      set({
        token,
        user,
        isLoggedIn: true,
      });
    } catch {
      set({
        token: null,
        user: null,
        isLoggedIn: false,
      });
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
    }
  },
}));
