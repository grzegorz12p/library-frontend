<template>
  <label class="switch">
    <input type="checkbox" v-model="switchValue" />
    <span class="slider round"></span>
  </label>
  <span class="text-white my-auto text-[16px] justify-center">{{
    switchValue ? "Rosnaco" : "Malejaco"
  }}</span>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{ switchValue: boolean }>();

const switchValue = ref(props.switchValue);
const emit = defineEmits(["switchValueChanged"]);

watch(
  () => switchValue.value,
  (newValue, oldValue) => {
    if (newValue === oldValue) {
      return;
    }
    emit("switchValueChanged", newValue);
  }
);
watch(
  () => props.switchValue,
  (newValue, oldValue) => {
    if (newValue === oldValue) {
      return;
    }
    switchValue.value = newValue;
  }
);
</script>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #573b8a;
}

input:focus + .slider {
  box-shadow: 0 0 1px #573b8a;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
