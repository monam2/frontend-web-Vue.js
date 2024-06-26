// src/store/auth.js
import { defineStore } from "pinia";
import { login } from "@/auth/login.js";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref(false);
  const token = ref("");
  const loginUserId = ref(null);
  const userEmail = ref("");
  const password = ref("");

  const loadAuthState = () => {
    isAuthenticated.value = !!sessionStorage.getItem('token');
  };

  const getToken = async () => {
    const result = await login(userEmail.value, password.value);
    if (result.token !== "") {
      // 로그인 성공시
      token.value = result.token;
      isAuthenticated.value = true;
      loginUserId.value = result.userId;
      sessionStorage.setItem('token', token.value);
      sessionStorage.setItem('loginUserId', loginUserId.value);
    } else {
      // 로그인 실패
      token.value = "";
      isAuthenticated.value = false;
    }
  };

  const getLogout = () => {
    token.value = "";
    isAuthenticated.value = false;
    userEmail.value = "";
    password.value = "";
    loginUserId.value = null;
    sessionStorage.clear();
  };

  return { loadAuthState, getLogout, getToken, isAuthenticated, token, userEmail, password, loginUserId };
});
