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
      <BookDescriptionSpan v-if="!isBookPage">
        <span class="flex flex-row">
          Dostępność:
          <div
            class="mx-[10px] my-auto w-[10px] h-[10px] rounded-lg"
            :class="
              book.status === BookStatus.Dostępna
                ? 'bg-[#00FF00]'
                : 'bg-[#ff0000]'
            "
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
    <div v-if="!isBookPage" class="md:col-span-1 my-auto mx-auto">
      <TheButton
        v-if="book.status === BookStatus.Wypożyczona"
        button-text="Śledź status"
        button-type="button"
        @handle-click="spectateBook"
      />
      <TheButton
        v-if="book.status === BookStatus.Dostępna"
        button-text="Wypożycz"
        button-type="button"
        @handle-click="borrowBook"
      />
      <TheButton
        v-if="
          book.status === BookStatus.Wypożyczona &&
          String(book.userId) === userStore.getUserId()
        "
        button-text="Zwróć"
        button-type="button"
        @handle-click="returnBook"
      />
      <TheButton
        v-if="userStore.isAdmin"
        button-text="Zaktualizuj"
        button-type="button"
        @handle-click="updateBook"
      />
      <TheButton
        v-if="userStore.isAdmin"
        button-text="Usuń"
        button-type="button"
        @handle-click="deleteBook"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  BookStatus,
  type Book,
  getSelectedBookGenre,
} from "@/assets/api/types";
import { useBookStore } from "@/stores/bookStore";
import { useUserStore } from "@/stores/userStore";
import dayjs from "dayjs";
import BookDescriptionSpan from "./BookDescriptionSpan.vue";
import TheButton from "./TheButton.vue";
import {  useToast } from "vue-toastification";
import router from "@/router";

const props = defineProps<{ book: Book; isBookPage?: boolean }>();

const userStore = useUserStore();
const bookStore = useBookStore();
const toast = useToast();

const deleteBook = () => {
  bookStore.deleteBook(props.book.bookId!).then((response) => {
    if (response) {
      toast.success("Usunięto książkę.");
    } else {
      toast.error("Nie udało się usunąć książki.");
    }
  });
};

const updateBook = () => {
  router.push(`/updateBook/${props.book.bookId!}`);
};

const spectateBook = () => {
  bookStore.spectateBook(props.book.bookId!).then((response) => {
    if (response) {
      toast.success("Zaczęto śledzenie strony.");
    } else {
      toast.error("Nie udało się rozpocząć śledzenia.");
    }
  });
};

const borrowBook = () => {
  bookStore.borrowBook(props.book.bookId!).then((response) => {
    if (response) {
      toast.success("Wypożyczono książkę.");
    } else {
      toast.error("Nie udało się wypożyczyć książki.");
    }
  });
};

const returnBook = () => {
  bookStore.returnBook(props.book.bookId!).then((response) => {
    if (response) {
      toast.success("Zwrócono książkę.");
    } else {
      toast.error("Nie udało się zwrócić książki.");
    }
  });
};
</script>

<style scoped></style>
