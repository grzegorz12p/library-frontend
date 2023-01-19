<template>
  <div
    v-if="useUserStore().getIsAdmin()"
    class="w-full sm:w-[80%] rounded-md bg-white"
  >
    <label
      class="text-black text-[2.3em] justify-center flex p-10 font-bold cursor-pointer transition-[0.5s_easy-in-out]"
      >{{
        router.currentRoute.value.fullPath.includes("updateBook")
          ? "Zaktualizuj książkę"
          : "Dodaj książkę"
      }}</label
    >
    <form
      @submit.prevent="isUpdatePage ? updateBook() : createBook()"
      class="grid grid-cols-12 gap-3 p-5"
    >
      <TheInput
        class="col-span-12"
        :value="title"
        type="text"
        name="title"
        placeholder="Tytuł"
        :required="true"
        @value-changed="(value) => (title = value)"
      />
      <TheInput
        class="col-span-12"
        :value="year"
        type="date"
        name="year"
        placeholder="Data wydania"
        :required="true"
        @value-changed="(value) => (year = value)"
      />
      <TheInput
        class="col-span-6"
        :value="authorName"
        type="text"
        name="authorName"
        placeholder="Imię autora"
        :required="true"
        @value-changed="(value) => (authorName = value)"
      />
      <TheInput
        class="col-span-6"
        :value="authorLastName"
        type="text"
        name="authorLastName"
        placeholder="Nazwisko autora"
        :required="true"
        @value-changed="(value) => (authorLastName = value)"
      />
      <Multiselect
        class="col-span-12"
        v-model="genres"
        :close-on-select="false"
        :options="multiSelectOptions"
        placeholder="Gatunki"
        :required="true"
        mode="multiple"
      />
      <TheInput
        class="col-span-12"
        :value="version"
        type="number"
        name="version"
        placeholder="Wersja"
        :required="true"
        @value-changed="(value) => (version = value)"
      />
      <TheInput
        class="col-span-12"
        :value="imageUrl"
        type="text"
        name="imageUrl"
        placeholder="Url obrazka"
        :required="true"
        @value-changed="(value) => (imageUrl = value)"
      />
      <TheButton
        class="col-span-12"
        :button-text="isUpdatePage ? 'Zaaktualizuj' : 'Utwórz'"
        button-type="submit"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
import TheInput from "./TheInput.vue";
import { ref, watch, onBeforeMount } from "vue";
import TheButton from "./TheButton.vue";
import Multiselect from "@vueform/multiselect";
import { BookGenre, getSelectedGenresList } from "@/assets/api/types";
import { useBookStore } from "@/stores/bookStore";
import { useUserStore } from "@/stores/userStore";
import { POSITION, useToast } from "vue-toastification";
import router from "@/router";
import { useRoute } from "vue-router";
import dayjs from "dayjs";

interface Genre {
  value: number;
  label: string;
}

const toast = useToast();
const title = ref("");
const year = ref<string>("");
const authorName = ref("");
const authorLastName = ref("");
const genres = ref<number[]>([]);
const version = ref(1);
const imageUrl = ref("");
const selectedGenres = ref<number>(0);
const store = useBookStore();
const isUpdatePage = router.currentRoute.value.fullPath.includes("updateBook");
const id = ref(0);

const multiSelectOptions: Array<Genre> = [
  {
    value: BookGenre.Action,
    label: "Akcja",
  },
  {
    value: BookGenre.Comedy,
    label: "Komedia",
  },
  {
    value: BookGenre.Drama,
    label: "Dramat",
  },
  {
    value: BookGenre.Musical,
    label: "Musical",
  },
  {
    value: BookGenre.Thriller,
    label: "Thriller",
  },
  {
    value: BookGenre.Horror,
    label: "Horror",
  },
  {
    value: BookGenre.Romance,
    label: "Romance",
  },
  {
    value: BookGenre.Fantasy,
    label: "Fantasy",
  },
  {
    value: BookGenre.TravelLiterature,
    label: "Podróżnicza",
  },
];

const createBook = () => {
  if (selectedGenres.value === 0) {
    toast.error("Niepoprawny gatunek", {
      position: POSITION.BOTTOM_CENTER,
    });
    return;
  }
  store
    .addBook({
      author: { firstName: authorName.value, lastName: authorLastName.value },
      genres: selectedGenres.value,
      imageUrl: imageUrl.value,
      publicationDate: year.value,
      title: title.value,
      version: version.value,
    })
    .then((response) => {
      if (response) {
        toast.success("Ksiązka została utworzona.", {
          position: POSITION.BOTTOM_CENTER,
        });
        clearFields();
        setTimeout(() => {
          router.push("/home");
        }, 3000);
      } else {
        toast.error("Nie można utworzyć książki.", {
          position: POSITION.BOTTOM_CENTER,
        });
        clearFields();
      }
    });
};

const updateBook = () => {
  if (selectedGenres.value === 0) {
    toast.error("Niepoprawny gatunek", {
      position: POSITION.BOTTOM_CENTER,
    });
    return;
  }
  store
    .updateBook(id.value, {
      author: { firstName: authorName.value, lastName: authorLastName.value },
      genres: selectedGenres.value,
      imageUrl: imageUrl.value,
      publicationDate: year.value,
      title: title.value,
      version: version.value,
    })
    .then((response) => {
      if (response) {
        toast.success("Ksiązka została zaaktualizowana.", {
          position: POSITION.BOTTOM_CENTER,
        });
        clearFields();
        setTimeout(() => {
          router.push("/home");
        }, 3000);
      } else {
        toast.error("Nie można zaaktualizować książki.", {
          position: POSITION.BOTTOM_CENTER,
        });
        clearFields();
      }
    });
};

watch(
  () => genres.value,
  (newValue, oldValue) => {
    if (newValue === oldValue) {
      return;
    }
    selectedGenres.value = 0;
    for (let i = 0; i < genres.value.length; i++) {
      selectedGenres.value = selectedGenres.value | genres.value[i];
    }
  }
);

const clearFields = () => {
  title.value = "";
  year.value = "";
  authorName.value = "";
  authorLastName.value = "";
  genres.value = [];
  version.value = 1;
  imageUrl.value = "";
  selectedGenres.value = 0;
};

onBeforeMount(async () => {
  if (isUpdatePage) {
    const route = useRoute();
    id.value = Number(route.params.id);
    const response = await store.getBook(id.value);
    const book = response?.book;
    if (book) {
      title.value = book.title;
      year.value = dayjs(book.publicationDate).format("YYYY-MM-DD");
      imageUrl.value = book.imageUrl;
      genres.value = getSelectedGenresList(book.genres);
      version.value = book.version;
      authorName.value = book.author.firstName;
      authorLastName.value = book.author.lastName;
    }
  }
});
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
