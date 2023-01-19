import { defineStore } from "pinia";
import axios from "axios";

interface UserLoginResponse {
  isAdmin: boolean;
  token: string;
}
export const useUserStore = defineStore("useUserStore", {
  state: () => {
    return {
      url: "https://localhost:44311/api/",
      isAdmin:
        localStorage.getItem("isAdmin") === "true" ? true : false || false,
      token: localStorage.getItem("token") ?? (undefined as unknown as string),
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
        localStorage.setItem("token", this.token);
        localStorage.setItem("isAdmin", String(this.isAdmin));
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
  },
});
