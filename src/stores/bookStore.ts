import { defineStore } from "pinia";
import axios from "axios";
import { useUserStore } from "./userStore";
import type { Book } from "@/assets/api/types";

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
    async getBooks(sortingField?: number, isDesc?: boolean) {
      await axios
        .post(
          useUserStore().url + "Book/Books",
          {
            filters: [],
            sortingField: sortingField ?? 0,
            isDesc: isDesc ?? true,
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
    async getMyBooks() {
      return await axios
        .get(
          useUserStore().url + `Book/MyBooks/${useUserStore().getUserId()}`,
          {
            headers: {
              Authorization: `${useUserStore().getToken()}`,
            },
          }
        )
        .then((response) => {
          const data = response.data as GetBooksResponse;
          return data.books;
        })
        .catch(() => {
          return [];
        });
    },
    async getBook(id: number) {
      return await axios
        .get(useUserStore().url + `Book/${id}`, {
          headers: {
            Authorization: `${useUserStore().getToken()}`,
          },
        })
        .then((response) => {
          return response.data as { book: Book };
        })
        .catch(() => {
          return null;
        });
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
    async deleteBook(id: number) {
      return await axios
        .delete(`${useUserStore().url}Book/${id}`, {
          headers: {
            Authorization: `${useUserStore().getToken()}`,
          },
        })
        .then(async () => {
          await this.getBooks();
          return true;
        })
        .catch(() => {
          return false;
        });
    },
    async borrowBook(id: number) {
      return await axios
        .put(
          `${useUserStore().url}Book/borrow`,
          {
            bookId: id,
            userId: Number(useUserStore().getUserId()),
          },
          {
            headers: {
              Authorization: `${useUserStore().getToken()}`,
            },
          }
        )
        .then(async () => {
          await this.getBooks();
          return true;
        })
        .catch(() => {
          return false;
        });
    },
    async returnBook(id: number) {
      return await axios
        .put(
          `${useUserStore().url}Book/return`,
          {
            bookId: id,
          },
          {
            headers: {
              Authorization: `${useUserStore().getToken()}`,
            },
          }
        )
        .then(async () => {
          await this.getBooks();
          return true;
        })
        .catch(() => {
          return false;
        });
    },
    async spectateBook(id: number) {
      return await axios
        .put(
          `${useUserStore().url}Book/spectate`,
          {
            bookId: id,
            userId: Number(useUserStore().getUserId()),
          },
          {
            headers: {
              Authorization: `${useUserStore().getToken()}`,
            },
          }
        )
        .then(async () => {
          await this.getBooks();
          return true;
        })
        .catch(() => {
          return false;
        });
    },
    async updateBook(id: number, book: Book) {
      return await axios
        .put(
          `${useUserStore().url}Book/${id}`,
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
        .then(async () => {
          return true;
        })
        .catch(() => {
          return false;
        });
    },
    async searchBooks(property: string, value: string, condition: number) {
      await axios
        .post(
          useUserStore().url + "Book/Books",
          {
            filters: [
              {
                property: property,
                value: value,
                condition: condition,
              },
            ],
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
  },
});
