<template>
  <div
    class="even:bg-white odd:bg-slate-200 border-b border-b-slate-700 grid grid-cols-1 grid-rows-3 md:grid-rows-1 md:grid-cols-4 sm:justify-between"
  >
    <div class="md:col-span-1 p-[10px] my-auto mx-auto">
      <img
        src="https://image.ceneostatic.pl/data/products/45863467/i-harry-potter-i-kamien-filozoficzny-tom-1.jpg"
        class="max-w-[200px] max-h-[200px] md:min-w-[100%] md:min-h-[100%] rounded-3xl"
      />
    </div>
    <div class="md:col-span-2 flex flex-col">
      <BookDescriptionSpan
        >Harry Potter and the Half-Blood Prince</BookDescriptionSpan
      >
      <BookDescriptionSpan> Gatunki: Akcja,Romans,Fantasy </BookDescriptionSpan>
      <BookDescriptionSpan>
        <span class="flex flex-row">
          Dostępność:
          <div
            class="mx-[10px] my-auto w-[10px] h-[10px] rounded-lg bg-green-600"
          ></div>
          Dostępna</span
        ></BookDescriptionSpan
      >
      <BookDescriptionSpan
        >Autorzy: J.K. Rowling, Mary GrandPre
      </BookDescriptionSpan>
      <BookDescriptionSpan>Wersja: 2.0 </BookDescriptionSpan>
      <BookDescriptionSpan>
        Data wydania: {{ dayjs("2005-07-16").format("DD/MM/YYYY") }}
      </BookDescriptionSpan>
    </div>
    <div class="md:col-span-1 my-auto mx-auto">
      <TheButton button-text="Śledź status" button-type="button" />
      <TheButton button-text="Wypożycz" button-type="button" />
      <TheButton v-if="isAdmin" button-text="Usuń" button-type="button" />
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { ref } from "vue";
import BookDescriptionSpan from "./BookDescriptionSpan.vue";
import TheButton from "./TheButton.vue";

const isAdmin = ref(true);
</script>

<style scoped></style>
