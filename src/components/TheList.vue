<template>
  <div class="flex flex-col w-full lg:w-[80%]">
    <ListRow v-for="book in books" :book="book" :is-book-page="isBookPage" />
  </div>
</template>

<script setup lang="ts">
import type { Book } from "@/assets/api/types";
import { useBookStore } from "@/stores/bookStore";
import { onBeforeMount, ref, watch } from "vue";
import ListRow from "./ListRow.vue";

const props = defineProps<{ isBookPage?: boolean }>();
const bookStore = useBookStore();
const books = ref<Book[]>();

onBeforeMount(async () => {
  if (props.isBookPage) {
    books.value = await bookStore.getMyBooks();
  } else {
    books.value = await bookStore.getBooks();
  }
});

watch(
  () => bookStore.books,
  (newValue, oldValue) => {
    if (newValue === oldValue) {
      return;
    }
    books.value = newValue;
  }
);
</script>

<style scoped></style>
