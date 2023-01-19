<template>
  <div
    class="w-full lg:w-[80%] grid grid-rows-2 grid-cols-4 gap-2 md:grid-rows-2 md:grid-cols-4"
  >
    <TheSelect
      class="col-span-2 md:col-span-1"
      :items="filterProperties"
      @select-option="
        (value) => {
          selectedProperty = value;
          textSearch = '';
        }
      "
    />
    <TheSelect
      class="col-span-2 md:col-span-1"
      :items="conditions"
      @select-option="(value) => (selectedCondition = value)"
    />
    <TheInput
      class="col-span-2 md:col-span-1 h-10 bg-[#e0dede] justify-center flex my-auto p-2.5 outline-none rounded-[5px]"
      :type="selectedProperty === Property.Date.toString() ? 'date' : 'text'"
      :value="textSearch"
      name="textSearch"
      placeholder="Wyszukiwanie"
      :required="true"
      @value-changed="(value) => (textSearch = value)"
    />
    <TheButton
      class="col-span-2 md:col-span-1"
      button-text="Wyszukaj"
      button-type="button"
      @handle-click="search"
    />
    <TheSelect
      class="col-span-2 md:col-span-1"
      :items="sortingProperties"
      @select-option="(value) => (sortingField = value)"
    />
    <div class="col-span-2 md:col-span-1 my-auto flex flex-row gap-2 mb-5">
      <SwitchButton
        :switch-value="switchValue"
        @switch-value-changed="(value) => (switchValue = value)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { filterProperties, sortingProperties } from "@/assets/api/constants";
import { BookSorting, Condition, Property } from "@/assets/api/types";
import SwitchButton from "@/components/SwitchButton.vue";
import TheButton from "@/components/TheButton.vue";
import TheInput from "@/components/TheInput.vue";
import TheSelect from "@/components/TheSelect.vue";
import { useBookStore } from "@/stores/bookStore";
import { computed, ref, watch } from "vue";

const selectedProperty = ref(Property.Title.toString());
const selectedCondition = ref(0);
const switchValue = ref(true);
const textSearch = ref("");
const store = useBookStore();
const sortingField = ref<number>(BookSorting.Title);

const search = async () => {
  await store.searchBooks(
    selectedProperty.value,
    textSearch.value,
    selectedCondition.value
  );
};

const filterBooks = async () => {
  await store.getBooks(sortingField.value, switchValue.value);
};

watch(
  () => sortingField.value,
  (newValue, oldValue) => {
    if (newValue === oldValue) {
      return;
    }
    filterBooks();
  }
);

watch(
  () => switchValue.value,
  (newValue, oldValue) => {
    if (newValue === oldValue) {
      return;
    }
    filterBooks();
  }
);

const conditions = computed(() => {
  switch (selectedProperty.value) {
    case Property.Title.toString():
      return [
        {
          key: "Zawiera",
          value: Condition.Contains,
        },
        {
          key: "Równe",
          value: Condition.Equal,
        },
      ];
    case Property.Date.toString():
      return [
        {
          key: "Większe niż",
          value: Condition.GreaterThan,
        },
        {
          key: "Mniejsze niż",
          value: Condition.LesserThan,
        },
      ];
    case Property.Version.toString():
      return [
        {
          key: "Równe",
          value: Condition.Equal,
        },
        {
          key: "Większe niż",
          value: Condition.GreaterThan,
        },
        {
          key: "Mniejsze niż",
          value: Condition.LesserThan,
        },
      ];
    default:
      return [
        {
          key: "Zawiera",
          value: Condition.Contains,
        },
        {
          key: "Równe",
          value: Condition.Equal,
        },
      ];
  }
});

</script>

<style scoped></style>
