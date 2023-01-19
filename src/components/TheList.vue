<template>
  <div class="flex flex-col w-full sm:w-[80%]">
    <ListRow v-for="book in books" :book="book" />
  </div>
</template>

<script setup lang="ts">
import type { Book } from "@/assets/api/types";
import { useBookStore } from "@/stores/bookStore";
import { onBeforeMount, ref } from "vue";
import ListRow from "./ListRow.vue";

const bookStore = useBookStore();
const books = ref<Book[]>();

onBeforeMount(async () => {
  books.value = await bookStore.getBooks();
});
</script>

<style scoped></style>
