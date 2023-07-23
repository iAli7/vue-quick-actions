<template>
  <div
    class="quick-action-search"
    :class="{'quick-action-search-active' : activeParentPath.length > 0}"
  >
    <div
      v-if="activeParentPath.length > 0"
      class="quick-action-search-back"
      @click="handleBackButton"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-arrow-left"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path
          stroke="none"
          d="M0 0h24v24H0z"
          fill="none"
        />
        <path d="M5 12l14 0" />
        <path d="M5 12l6 6" />
        <path d="M5 12l6 -6" />
      </svg>
    </div>
    <input
      v-model="searchValue"
      placeholder="Search for apps and commands..."
      autofocus
      class="quick-action-search-input"
      type="text"
      @input="handleInput"
    >
    <div
      v-if="loading"
      class="quick-action-search-loading-wrapper"
    >
      <div class="quick-action-search-loading" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref, watch, defineProps, defineEmits, emit,
} from 'vue';

const emit = defineEmits({
  'update:modelValue': (value: string) => true,
  search: (value: string) => true,
  backButtonClicked: true,
});

const props = defineProps({
  value: {
    type: String,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
  activeParentPath: {
    type: Array,
    default: () => [],
  },
});

const searchValue = ref(props.value);

watch(() => props.value, (newValue) => {
  searchValue.value = newValue;
});

const handleInput = (event: InputEvent) => {
  const { value } = event.target as HTMLInputElement;
  searchValue.value = value;
  emit('update:modelValue', value);
  emit('search', value);
};

const handleBackButton = () => {
  emit('backButtonClicked');
};
</script>

<style src="./QaSearch.scss" lang="scss" />
