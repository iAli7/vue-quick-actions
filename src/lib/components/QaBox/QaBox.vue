<template>
  <div
    v-if="showQuickAction"
    class="quick-action"
  >
    <div class="quick-action-search">
      <input
        v-model="searchValue"
        placeholder="Search for apps and commands..."
        autofocus
        class="quick-action-search-input"
        type="text"
      >
      <div
        v-if="loading"
        class="quick-action-search-loading-wrapper"
      >
        <div
          class="quick-action-search-loading"
        />
      </div>
    </div>
    <div class="quick-action-content">
      <div class="quick-action-list">
        <QuickActionItem
          v-for="
            (item, index) in itemsToRender"
          :key="item.key"
          :item="item"
          :focused="focusItem === index"
          @focus="focusItem = index"
          @select="handleSelect(item)"
        />
      </div>
    </div>
    <div class="quick-action-bottom">
      <div class="quick-action-badge">
        <span
          v-for="(item, index) in activeParentPath"
          :key="index"
          class="quick-action-badge-item"
          @click="handleClickPath(item)"
        >
          {{ item.label + (index < activeParentPath.length - 1 ? ' -> ' : '') }}
        </span>
      </div>
      <div class="quick-action-content-keys">
        <div class="quick-action-content-keys-item">
          ESC
        </div>
        <div class="quick-action-content-keys-item">
          Enter
        </div>
        <div class="quick-action-content-keys">
          <div class="quick-action-content-keys-item">
            <svg
              width="6"
              height="4"
              viewBox="0 0 6 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              q:key="NT_0"
            >
              <path
                d="M3 0L6 4H0L3 0Z"
                fill="white"
              />
            </svg>
          </div>
          <div class="quick-action-content-keys-item">
            <svg
              width="6"
              height="4"
              viewBox="0 0 6 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              q:key="5y_0"
            >
              <path
                d="M3 4L0 0L6 5.24537e-07L3 4Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref, onMounted, watch, computed, onBeforeUnmount,
} from 'vue';

import { shortcutItem } from '../../types/types';

import { handleQaSearch } from './search';

// eslint-disable-next-line
import QuickActionItem from '../QaListItem/QaListItem.vue';

const emit = defineEmits<{
  search: any
}>();

const props = defineProps<{
  items: shortcutItem[]
}>();

const searchValue = ref('');
const focusItem = ref(0);
const loading = ref(false);
const showQuickAction = ref(false);

const originalQaList = ref<shortcutItem[]>(props.items);

const activeParentPath = ref<shortcutItem[]>([]);

const qaList = ref<shortcutItem[]>(originalQaList.value);

watch(searchValue, () => {
  if (searchValue.value === '') {
    qaList.value = [...originalQaList.value];
  } else {
    const searchResults = handleQaSearch(searchValue.value, originalQaList.value);
    qaList.value = searchResults.filter((item) => !item.separator);
  }

  emit('search', searchValue.value);
});

const handleSelect = (item: shortcutItem) => {
  if (originalQaList.value.includes(item)) {
    activeParentPath.value = [];
  }

  if (item.children) {
    activeParentPath.value.push(item);
    focusItem.value = 0;
  }

  if (item.onSelect) {
    item.onSelect();
  }
};

const itemsToRender = computed(() => {
  if (activeParentPath.value.length > 0) {
    return activeParentPath.value[activeParentPath.value.length - 1].children;
  }

  return qaList.value;
});

const navigate = (direction: number) => {
  if (!itemsToRender.value) {
    return focusItem.value;
  }

  let index = focusItem.value;
  while (true) {
    index += direction;
    if (index >= itemsToRender.value.length) {
      index = 0;
    } else if (index < 0) {
      index = itemsToRender.value.length - 1;
    }

    if (!itemsToRender.value[index].separator) {
      return index;
    }
  }
};

const handleClickPath = (item: shortcutItem) => {
  const itemIndex = activeParentPath.value.findIndex((pathItem) => pathItem.key === item.key);

  if (itemIndex !== -1) {
    activeParentPath.value = activeParentPath.value.slice(0, itemIndex + 1);
  }

  focusItem.value = 0;
};

const handleKeyboard = (event: KeyboardEvent) => {
  if (!itemsToRender.value) return;

  if (event.key === 'ArrowDown') {
    focusItem.value = navigate(1);
  } else if (event.key === 'ArrowUp') {
    focusItem.value = navigate(-1);
  } else if (event.key === 'Enter') {
    const currentItem = itemsToRender.value[focusItem.value];

    if (currentItem.onSelect) {
      handleSelect(currentItem);
    }
  } else if (event.key === 'Backspace') {
    activeParentPath.value.pop();
    focusItem.value = 0;
  } else if (event.ctrlKey && event.key === 'k') {
    showQuickAction.value = true;
  } else if (event.key === 'Escape') {
    showQuickAction.value = false;
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyboard);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyboard);
});
</script>

<style src="./QaBox.scss" lang="scss" />
