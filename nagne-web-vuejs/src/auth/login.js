import axios from "axios";
import apiClient from '@/apiClient.js';

const login = async (username, password) => {
  return await apiClient
    .post("/api/users/login", {
      username: username,
      password: password,
    })
    .then(({ data }) => {
      //로그인 성공
      const token = data.response.token;
      const userId = data.response.userInfo.id;
      return { token, userId };
    })
    .catch((err) => {
      // 로그인 실패
      if (err.response && err.response.status === 401) {
        // 401 Unauthorized 오류 처리
        alert("이메일 또는 비밀번호가 잘못되었습니다. 다시 시도해주세요.");
      } else {
        // 기타 오류 처리
        alert("로그인 실패! 다시 시도해주세요.");
      }
      return { token: "", userId: "" };
    });
};

export { login };
