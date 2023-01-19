<template>
  <div class="min-h-[100vh]">
    <div
      class="w-full rounded-md lg:w-[80%] mb-5 grid grid-rows-2 gap-2 md:grid-rows-1 md:grid-cols-4"
    >
      <TheButton
        class="col-span-2 md:col-start-3 md:col-span-1"
        button-text="Moje śledzone książki"
        button-type="button"
        :on-handle-click="moveToBookPage"
      />
      <TheButton
        class="col-span-2 md:col-start-4 md:col-span-1"
        button-text="Wyloguj"
        button-type="button"
        :on-handle-click="logout"
      />
      <TheButton
        v-if="store.getIsAdmin()"
        class="col-span-4 md:col-span-2"
        button-text="Utwórz książkę"
        button-type="button"
        :on-handle-click="moveToCreatePage"
      />
      <TheButton
        :class="store.getIsAdmin() ? 'col-span-4 md:col-span-2' : 'col-span-4'"
        button-text="Wyświetl książki"
        button-type="button"
        :on-handle-click="moveToHomePage"
      />
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/userStore";
import TheButton from "./TheButton.vue";

const store = useUserStore();

const moveToCreatePage = () => {
  router.push("/create");
};

const moveToHomePage = () => {
  router.push("/home");
};

const moveToBookPage = () => {
  router.push("/books");
};

const logout = () => {
  store.logout().then(() => {
    router.push("/");
  });
};
</script>

<style scoped></style>
