import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

interface UserLoginResponse {
  isAdmin: boolean;
  token: string;
}

const url = "https://localhost:44311/api/";

export const useUserStore = defineStore("useUserStore", {
  state: () => {
    return {
      isAdmin: Boolean(localStorage.getItem("isAdmin")) ?? false,
      token: localStorage.getItem("token") ?? undefined as unknown as string,
    };
  },
  actions: {
    async logout() {
        this.isAdmin = false;
        this.token = undefined as unknown as string;
        localStorage.clear();
    },
    async login(login: string, password: string) {
      const response = await axios
        .post(url + "User", {
          username: login,
          password: password,
        })
        .then(function (response) {
          const data = response.data as UserLoginResponse;
          return data;
        })
        .catch(function () {
          return null;
        });
      if (response) {
        this.isAdmin = response.isAdmin;
        this.token = "Bearer " + response.token;
        localStorage.setItem("token", this.token);
        localStorage.setItem("isAdmin", String(this.isAdmin));
        return true;
      }
      return false;
    },
    createUser(login: string, email: string, password: string) {
        
    },
    getToken() {
      return this.token;
    },
    getIsAdmin() {
      return this.isAdmin;
    },
  },
});
