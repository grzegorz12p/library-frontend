import CreateBookPage from "@/views/CreateBookPage.vue";
import HomePage from "@/views/HomePage.vue";
import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/LoginPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/home",
      name: "home",
      component: HomePage,
    },
    {
      path: "/create",
      name: "create",
      component: CreateBookPage,
    },
  ],
});

export default router;
