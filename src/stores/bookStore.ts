import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import type { Book } from "@/assets/api/types";
import { useUserStore } from "./userStore";

interface GetBooksResponse {
  books: Book[];
  count: number;
}

export const useBookStore = defineStore("useBookStore", {
  state: () => {
    return {
      books: [] as Book[],
      count: 0,
    };
  },
  actions: {
    async getBooks() {
      await axios
        .post(
          useUserStore().url + "Book/Books",
          {
            filters: [],
            sortingField: 0,
            isDesc: true,
          },
          {
            headers: {
              Authorization: `${useUserStore().getToken()}`,
            },
          }
        )
        .then((response) => {
          const data = response.data as GetBooksResponse;
          this.books = data.books;
          this.count = data.count;
        })
        .catch(() => {});
      return this.books;
    },
    async addBook(book: Book) {
      return await axios
        .post(
          useUserStore().url + "Book",
          {
            title: book.title,
            genres: book.genres,
            author: {
              firstName: book.author.firstName,
              lastName: book.author.lastName,
            },
            version: book.version,
            publicationDate: book.publicationDate,
            imageUrl: book.imageUrl,
          },
          {
            headers: {
              Authorization: `${useUserStore().getToken()}`,
            },
          }
        )
        .then(() => {
          return true;
        })
        .catch(() => {
          return false;
        });
    },
  },
});
