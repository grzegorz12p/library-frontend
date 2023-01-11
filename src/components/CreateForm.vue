<template>
  <div class="w-full sm:w-[80%] rounded-md bg-white">
    <label
      class="text-black text-[2.3em] justify-center flex p-10 font-bold cursor-pointer transition-[0.5s_easy-in-out]"
      >Dodaj książkę</label
    >
    <div class="grid grid-cols-12 gap-3 p-5">
      <TheInput
        class="col-span-12"
        :value="title"
        type="text"
        name="Title"
        placeholder="Tytuł"
        :required="true"
      />
      <TheInput
        class="col-span-12"
        :value="year"
        type="text"
        name="Year"
        placeholder="Data wydania"
        :required="true"
      />
      <TheInput
        class="col-span-12"
        :value="author"
        type="text"
        name="Author"
        placeholder="Autor"
        :required="true"
      />
      <TheInput
        class="col-span-12"
        :value="genres"
        type="text"
        name="Genres"
        placeholder="Gatunki"
        :required="true"
      />
      <TheInput
        class="col-span-12"
        :value="version"
        type="text"
        name="Version"
        placeholder="Wersja"
        :required="true"
      />
      <TheButton class="col-span-12" button-text="Utwórz" button-type="button" />
    </div>
  </div>
</template>

<script setup lang="ts">
import TheInput from "./TheInput.vue";
import { ref } from "vue";
import TheButton from "./TheButton.vue";

const title = ref("");
const year = ref("");
const author = ref("");
const genres = ref("");
const version = ref("");
</script>

<style scoped></style>
