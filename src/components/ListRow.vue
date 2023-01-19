<template>
  <div
    class="even:bg-white odd:bg-slate-200 border-b border-b-slate-700 grid grid-cols-1 grid-rows-3 md:grid-rows-1 md:grid-cols-4 sm:justify-between"
  >
    <div class="md:col-span-1 p-[10px] my-auto mx-auto">
      <img
        :src="book.imageUrl"
        class="max-w-[200px] max-h-[200px] md:min-w-[100%] md:min-h-[100%] rounded-3xl"
      />
    </div>
    <div class="md:col-span-2 flex flex-col">
      <BookDescriptionSpan class="text-[20px] md:text-[32px]">{{
        book.title
      }}</BookDescriptionSpan>
      <BookDescriptionSpan>
        Gatunki: {{ getSelectedBookGenre(book.genres) }}
      </BookDescriptionSpan>
      <BookDescriptionSpan>
        <span class="flex flex-row">
          Dostępność:
          <div
            class="mx-[10px] my-auto w-[10px] h-[10px] rounded-lg bg-green-600"
          ></div>
          {{ BookStatus[book.status!] }}</span
        ></BookDescriptionSpan
      >
      <BookDescriptionSpan
        >Autor: {{ book.author.firstName }} {{ book.author.lastName }}
      </BookDescriptionSpan>
      <BookDescriptionSpan>Wersja: {{ book.version }} </BookDescriptionSpan>
      <BookDescriptionSpan>
        Data wydania: {{ dayjs(book.publicationDate).format("DD/MM/YYYY") }}
      </BookDescriptionSpan>
    </div>
    <div class="md:col-span-1 my-auto mx-auto">
      <TheButton button-text="Śledź status" button-type="button" />
      <TheButton button-text="Wypożycz" button-type="button" />
      <TheButton
        v-if="userStore.isAdmin"
        button-text="Usuń"
        button-type="button"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  BookStatus,
  type Book,
  BookGenre,
  getSelectedBookGenre,
} from "@/assets/api/types";
import { useUserStore } from "@/stores/userStore";
import dayjs from "dayjs";
import { ref } from "vue";
import BookDescriptionSpan from "./BookDescriptionSpan.vue";
import TheButton from "./TheButton.vue";

defineProps<{ book: Book }>();

const userStore = useUserStore();

const deleteBook = () => {};
</script>

<style scoped></style>
