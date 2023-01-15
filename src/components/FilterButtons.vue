<template>
  <div
    class="w-full sm:w-[80%] grid grid-rows-4 gap-2 md:grid-rows-2 md:grid-cols-4"
  >
    <TheSelect
      class="md:col-span-1"
      :items="[
        { key: 'Tytul', value: 'Tytul' },
        { key: '1234', value: '1234' },
      ]"
      @select-option="changeSelectedValue"
    />
    <TheSelect
      class="md:col-span-1"
      :items="[
        { key: 'Zawiera', value: 'Zawiera' },
        { key: '1234', value: '1234' },
      ]"
      @select-option="changeSelectedValue"
    />
    <TheInput
      class="md:col-span-1 h-10 bg-[#e0dede] justify-center flex my-auto p-2.5 outline-none rounded-[5px]"
      type="text"
      :value="textSearch"
      name="textSearch"
      placeholder="Wyszukiwanie"
      :required="true"
    />
    <TheButton
      class="md:col-span-1"
      button-text="Wyszukaj"
      button-type="submit"
    />
    <TheSelect
      class="md:col-span-1"
      :items="[
        { key: 'Tytuł', value: 'Tytuł' },
        { key: '1234', value: '1234' },
      ]"
      @select-option="changeSelectedValue"
    />
    <div class="md:col-span-1 my-auto flex flex-row gap-2">
      <SwitchButton
        :switch-value="switchValue"
        @switch-value-changed="(value) => (switchValue = value)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import SwitchButton from "@/components/SwitchButton.vue";
import TheButton from "@/components/TheButton.vue";
import TheInput from "@/components/TheInput.vue";
import TheSelect from "@/components/TheSelect.vue";
import { ref } from "vue";

const changeSelectedValue = (value: string) => {};

const switchValue = ref(true);
const textSearch = ref("");
</script>

<style scoped></style>
