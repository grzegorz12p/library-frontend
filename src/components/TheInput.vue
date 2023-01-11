<template>
  <input
    class="h-10 w-full bg-[#e0dede] justify-center flex my-auto p-2.5 outline-none rounded-[5px]"
    v-model="inputValue"
    :type="type"
    :name="name"
    :placeholder="placeholder"
    :required="required"
  />
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  value: string;
  type: string;
  name: string;
  placeholder: string;
  required: boolean;
}>();

const inputValue = ref(props.value);
const emit = defineEmits(["valueChanged"]);

watch(
  () => inputValue.value,
  (newValue, oldValue) => {
    if (newValue === oldValue) {
      return;
    }
    emit("valueChanged", newValue);
  }
);

watch(
  () => props.value,
  (newValue, oldValue) => {
    if (newValue === oldValue) {
      return;
    }
    inputValue.value = newValue;
  }
);
</script>

<style scoped></style>
