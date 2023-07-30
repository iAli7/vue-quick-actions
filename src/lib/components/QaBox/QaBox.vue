<template>
  <div
    v-if="showQuickAction"
    class="quick-action"
  >
    <QaSearch
      v-model="searchValue"
      :loading="props.loading"
      :active-parent-path="activeParentPath"
      @backButtonClicked="handleBack"
    />
    <QaBody
      :items="itemsToRender"
      :focused-item-index="focusedItemIndex"
      @select="handleSelect($event)"
    />
    <QaFooter
      :active-parent-path="activeParentPath"
      @clickPath="handleClickPath"
    />
  </div>
</template>

<script setup lang="ts">
import {
  ref, onMounted, watch, computed, onBeforeUnmount,
} from 'vue';

import { Item } from '../../types/types';

// eslint-disable-next-line
import QaSearch from '../QaSearch/QaSearch.vue';
// eslint-disable-next-line
import QaBody from '../QaBody/QaBody.vue';
// eslint-disable-next-line
import QaFooter from '../QaFooter/QaFooter.vue';
import { getItemsByQuery } from './search';

const emit = defineEmits<{
  search: String
}>();

const props = defineProps<{
  items: Item[],
  loading: boolean,
}>();

const searchValue = ref('');
const focusedItemIndex = ref(1);
const showQuickAction = ref(false);
const activeParentPath = ref<Item[]>([]);

watch(searchValue, () => {
  emit('search', searchValue.value);
});

const handleSelect = (item: Item) => {
  if (props.items.includes(item)) {
    activeParentPath.value = [];
  }

  if (!item.children) {
    showQuickAction.value = false;
  }

  if (item.children) {
    activeParentPath.value.push(item);
    focusedItemIndex.value = 1;
  }

  item.onSelect?.();
};

const itemsToRender = computed(() => {
  if (activeParentPath.value.length > 0) {
    return activeParentPath.value[activeParentPath.value.length - 1].children;
  }

  if (searchValue.value === '') {
    return props.items;
  }

  const searchResults = getItemsByQuery(searchValue.value, props.items);

  return searchResults;
});

const navigate = (direction: number) => {
  if (!itemsToRender.value) {
    return focusedItemIndex.value;
  }

  let index = focusedItemIndex.value;
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

const handleClickPath = (item: Item) => {
  const itemIndex = activeParentPath.value.findIndex(
    (pathItem) => pathItem.key === item.key,
  );

  if (itemIndex !== -1) {
    activeParentPath.value = activeParentPath.value.slice(0, itemIndex + 1);
  }

  focusedItemIndex.value = 1;
};

const handleBack = () => {
  activeParentPath.value.pop();
  focusedItemIndex.value = 1;
};

const handleKeyboard = (event: KeyboardEvent) => {
  if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
    event.preventDefault();
    showQuickAction.value = true;
  }

  if (!showQuickAction.value) return;

  if (!itemsToRender.value) return;

  if (event.key === 'ArrowDown') {
    focusedItemIndex.value = navigate(1);
  } else if (event.key === 'ArrowUp') {
    focusedItemIndex.value = navigate(-1);
  } else if (event.key === 'Enter') {
    const currentItem = itemsToRender.value[focusedItemIndex.value];

    if (currentItem.onSelect) {
      handleSelect(currentItem);
    }
    if (!currentItem.children) {
      showQuickAction.value = false;
      activeParentPath.value = [];
    }
  } else if (event.key === 'Backspace') {
    handleBack();
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
