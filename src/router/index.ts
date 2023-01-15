import { useUserStore } from "@/stores/userStore";
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
      beforeEnter: (to, from, next) => {
        const isLoggedIn = useUserStore().getToken();
        if (isLoggedIn) {
          return next("/home");
        }
        next();
      },
    },
    {
      path: "/home",
      name: "home",
      component: HomePage,
      beforeEnter: (to, from, next) => {
        const isLoggedIn = useUserStore().getToken();
        if (isLoggedIn) {
          return next();
        }
        next("/login");
      },
    },
    {
      path: "/create",
      name: "create",
      component: CreateBookPage,
      beforeEnter: (to, from, next) => {
        const isLoggedIn = useUserStore().getToken();
        if (isLoggedIn) {
          return next();
        }
        next("/login");
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notFound",
      component: LoginPage,
      beforeEnter: (to, from, next) => {
        const isLoggedIn = useUserStore().getToken();
        if (isLoggedIn) {
          return next("/home");
        }
        next("/");
      },
    },
  ],
});

export default router;
