import { defineStore } from "pinia";
import axios from "axios";

interface UserLoginResponse {
  isAdmin: boolean;
  token: string;
  userId: number;
}
export const useUserStore = defineStore("useUserStore", {
  state: () => {
    return {
      url: "https://localhost:44311/api/",
      isAdmin:
        localStorage.getItem("isAdmin") === "true" ? true : false || false,
      token: localStorage.getItem("token") ?? (undefined as unknown as string),
      userId:
        localStorage.getItem("userId") ?? (undefined as unknown as string),
    };
  },
  actions: {
    async logout() {
      this.isAdmin = false;
      this.token = undefined as unknown as string;
      this.userId = undefined as unknown as string;
      localStorage.clear();
    },
    async login(login: string, password: string) {
      const response = await axios
        .post(this.url + "User", {
          login: login,
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
        this.userId = String(response.userId);
        localStorage.setItem("token", this.token);
        localStorage.setItem("isAdmin", String(this.isAdmin));
        localStorage.setItem("userId", this.userId);
        return true;
      }
      return false;
    },
    async createUser(login: string, email: string, password: string) {
      return await axios
        .post(this.url + "User/createUser", {
          login: login,
          password: password,
          emailAddress: email,
        })
        .then(function () {
          return true;
        })
        .catch(function () {
          return false;
        });
    },
    getToken() {
      return this.token;
    },
    getIsAdmin() {
      return this.isAdmin;
    },
    getUserId() {
      return this.userId;
    },
  },
});
