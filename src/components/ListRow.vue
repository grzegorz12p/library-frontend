<template>
  <div
    class="even:bg-white odd:bg-slate-200 border-b border-b-slate-700 grid grid-rows-1 grid-cols-3 sm:justify-between"
  >
    <div class="col-span-1 p-[10px] my-auto mx-auto">
      <img
        src="https://image.ceneostatic.pl/data/products/45863467/i-harry-potter-i-kamien-filozoficzny-tom-1.jpg"
        class="min-w-[200px] max-w-[300px] max-h-[300px] min-h-[200px] rounded-3xl"
      />
    </div>
    <div class="col-span-2 flex flex-col">
      <span
        class="p-[10px] my-auto font-semibold text-black font-serif text-[32px]"
      >
        Harry Potter and the Half-Blood Prince
      </span>
      <span
        class="p-[10px] my-auto font-semibold text-black font-serif text-[20px]"
      >
        Gatunki: Akcja,Romans,Fantasy
      </span>
      <span
        class="p-[10px] my-auto font-semibold text-black font-serif text-[20px]"
      >
        <span class="flex flex-row">
          Dostępność:
          <div
            class="mx-[10px] my-auto w-[10px] h-[10px] rounded-lg bg-green-600"
          ></div>
          Dostępna</span
        >
      </span>
      <span
        class="p-[10px] my-auto font-semibold text-black font-serif text-[20px]"
      >
        Autorzy: J.K. Rowling, Mary GrandPre
      </span>
      <span
        class="p-[10px] my-auto font-semibold text-black font-serif text-[20px]"
      >
        Wersja: 2.0
      </span>
      <span
        class="p-[10px] my-auto font-semibold text-black font-serif text-[20px]"
      >
        Data wydania: {{ dayjs("2005-07-16").format("DD/MM/YYYY") }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
</script>

<style scoped></style>
