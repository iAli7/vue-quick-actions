<template>
  <div class="quick-action-search">
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
  ref, watch, defineProps, defineEmits,
} from 'vue';

const emit = defineEmits({
  'update:modelValue': (value: string) => true,
  search: (value: string) => true,
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
</script>

<style src="./QaSearch.scss" lang="scss" />
