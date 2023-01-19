import { useUserStore } from "@/stores/userStore";
import BooksPage from "@/views/BooksPage.vue";
import CreateBookPage from "@/views/CreateBookPage.vue";
import HomePage from "@/views/HomePage.vue";
import UpdateBookPage from "@/views/UpdateBookPage.vue";
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
        if (isLoggedIn && useUserStore().getIsAdmin()) {
          return next();
        }
        next("/login");
      },
    },
    {
      path: "/books",
      name: "books",
      component: BooksPage,
      beforeEnter: (to, from, next) => {
        const isLoggedIn = useUserStore().getToken();
        if (isLoggedIn) {
          return next();
        }
        next("/login");
      },
    },
    {
      path: "/updateBook/:id",
      name: "updateBook",
      component: UpdateBookPage,
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
