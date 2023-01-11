<template>
  <div class="min-h-[100vh]">
    <div
      class="w-full rounded-md sm:w-[80%] mb-5 grid grid-rows-2 gap-2 md:grid-rows-1 md:grid-cols-4"
    >
      <TheButton
        class="col-span-4 md:col-span-2"
        button-text="Utwórz Książkę"
        button-type="button"
        :on-handle-click="moveToCreatePage"
      />
      <TheButton
        class="col-span-4 md:col-span-2"
        button-text="Wyświetl ksiązki"
        button-type="button"
        :on-handle-click="moveToHomePage"
      />
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import TheButton from "./TheButton.vue";
const moveToCreatePage = () => {
  if (!router.currentRoute.value.fullPath.includes("/create")) {
    router.push("/create");
  }
};

const moveToHomePage = () => {
  if (!router.currentRoute.value.fullPath.includes("/home")) {
    router.push("/home");
  }
};
</script>

<style scoped></style>
