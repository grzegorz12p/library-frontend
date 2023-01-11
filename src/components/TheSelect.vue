<template>
  <div class="w-full">
    <select
      v-model="selectedValue"
      class="h-10 bg-[#e0dede] m-[20px_auto] border border-solid border-black outline-none rounded-md p-1.5 w-full mb-5"
    >
      <template v-for="option in items" :key="option.key">
        <option :value="option.value">{{ option.key }}</option>
      </template>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

interface Option {
  key: string;
  value: string;
}

const props = defineProps<{ items: Array<Option> }>();

const selectedValue = ref(props.items[0].value);
const emit = defineEmits(["selectOption"]);

watch(
  () => selectedValue.value,
  (newValue, oldValue) => {
    if (newValue === oldValue) {
      return;
    }
    emit("selectOption", newValue);
  }
);
</script>

<style scoped></style>
