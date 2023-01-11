<template>
  <button @click="onHandleClick" :type="buttonType">{{ buttonText }}</button>
</template>

<script setup lang="ts">
defineProps<{
  buttonText: string;
  buttonType: "button" | "submit" | "reset" | undefined;
  onHandleClick?: () => void;
}>();
</script>

<style scoped>
button {
  width: 100%;
  height: 40px;
  margin: 10px auto;
  justify-content: center;
  display: block;
  color: #fff;
  background: #573b8a;
  font-size: 1em;
  font-weight: bold;
  margin-top: 20px;
  outline: none;
  border: none;
  border-radius: 5px;
  transition: 0.2s ease-in;
  cursor: pointer;
}
button:hover {
  background: #6d44b8;
}
</style>
