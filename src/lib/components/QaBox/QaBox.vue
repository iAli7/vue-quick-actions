<template>
  <div class="quick-action">
    <div class="quick-action-search">
      <input
        v-model="searchValue"
        placeholder="Search for apps and commands..."
        autofocus
        class="quick-action-search-input"
        type="text"
      >
      <div
        v-if="isLoading"
        class="quick-action-search-loading-wrapper"
      >
        <div
          class="quick-action-search-loading"
        />
      </div>
    </div>
    <div class="quick-action-content">
      <transition-group
        name="fade"
        tag="div"
        class="quick-action-list"
      >
        <div class="quick-action-list">
          <QuickActionItem
            v-for="
              (item, index) in itemsToRender"
            :key="index"
            :item="item"
            :focus="focusItem === index"
            @focus="focusItem = index"
            @select="handleSelect(item)"
          />
        </div>
      </transition-group>
    </div>
    <div class="quick-action-bottom">
      <div class="quick-action-badge">
        <span
          v-for="(item, index) in activeParentPath"
          :key="index"
          class="quick-action-badge-item"
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
  ref, onMounted, watch, computed,
} from 'vue';

import figmaLogo from '../../../assets/images/figma.png';
import { shortcutItem } from '../../types/types';

import { handleQaSearch } from './search';

// eslint-disable-next-line
import QuickActionItem from '../QaListItem/QaListItem.vue';

interface Props{
  function: Function;
}

const userProvidedFunction = defineProps<Props>();

const emit = defineEmits<{
  searchChange: any
}>();

const searchValue = ref('');
const focusItem = ref(0);
const isLoading = ref(false);

const originalQaList = ref<shortcutItem[]>([
  {
    label: 'Figma',
    separator: true,
  },
  {
    label: 'Figma',
    icon: figmaLogo,
    alias: 'design',
    role: 'Group',
    onSelect: () => {
      console.log('test');
    },

    children: [
      {
        label: 'Figma Child 1',

        onSelect: () => {
          console.log('test child');
        },
        children: [
          {
            label: 'Figma Child 1 Child',

            onSelect: () => { },
          },
        ],
      },
      {
        label: 'Figma Child 2',

        onSelect: () => {
          console.log('test child');
        },
      },
      {
        label: 'Figma Child 3',

        onSelect: () => {
          console.log('test child');
        },
      },
    ],
  },
  {
    label: 'AdobeXD',
    separator: true,
  },
  {
    label: 'AdobeXD',
    alias: 'design',
    role: 'Test',
    onSelect: () => {
      console.log('test');
    },
  },
  {
    separator: true,
  },
  {
    label: 'AdobeXD',
    alias: 'design',
    onSelect: () => {
      console.log('test');
    },
  },
  {
    label: 'AdobeXD',
    alias: 'design',
    onSelect: () => {
      console.log('test');
    },
  },
  {
    label: 'AdobeXD',
    alias: 'design',
    onSelect: () => {
      console.log('test');
    },
  },
  {
    label: 'AdobeXD',
    alias: 'design',
    onSelect: () => {
      console.log('test');
    },
  },
  {
    label: 'AdobeXD',
    alias: 'design',
    onSelect: () => {
      console.log('test');
    },
  },
  {
    label: 'AdobeXD',
    alias: 'design',
    onSelect: () => {
      console.log('test');
    },
  },
  {
    label: 'AdobeXD',
    alias: 'design',
    onSelect: () => {
      console.log('test');
    },
  },
  {
    label: 'AdobeXD',
    alias: 'design',
    onSelect: () => {
      console.log('test');
    },
  },
]);

const activeParentPath = ref<shortcutItem[]>([]);

const qaList = ref<shortcutItem[]>([...originalQaList.value]);

const helpList = ref<shortcutItem[]>([
  {
    separator: true,
    label: 'Modes',
  },
  {
    label: 'Activate command mode',
  },
]);

const executeUserFunction = async () => {
  isLoading.value = true;
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await userProvidedFunction.function();

    if (!qaList.value.some((item) => item.label === userProvidedFunction.function().label)) {
      qaList.value.push(userProvidedFunction.function());
    }
  } catch (error) {
    console.error('Error executing user function:', error);
  } finally {
    isLoading.value = false;
  }
};

watch(searchValue, () => {
  if (searchValue.value === '') {
    qaList.value = [...originalQaList.value];
  } else {
    const searchResults = handleQaSearch(searchValue.value, originalQaList.value);
    qaList.value = searchResults.filter((item) => !item.separator);

    if (searchValue.value[0] === '>') {
      executeUserFunction();
    }

    if (searchValue.value[0] === '?') {
      qaList.value = helpList.value;
    }
  }

  emit('searchChange', searchValue.value);
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

const nextItem = () => {
  if (itemsToRender.value) {
    let index = focusItem.value;
    while (index < itemsToRender.value.length - 1) {
      index += 1;
      if (!itemsToRender.value[index].separator) {
        return index;
      }
    }
  }

  return focusItem.value;
};

const prevItem = () => {
  if (itemsToRender.value) {
    let index = focusItem.value;
    while (index > 0) {
      index -= 1;
      if (!itemsToRender.value[index].separator) {
        return index;
      }
    }
  }

  return focusItem.value;
};

onMounted(() => {
  window.addEventListener('keydown', (event) => {
    if (!itemsToRender.value) return;

    if (event.key === 'ArrowDown') {
      focusItem.value = nextItem();
    } else if (event.key === 'ArrowUp') {
      focusItem.value = prevItem();
    } else if (event.key === 'Enter') {
      const currentItem = itemsToRender.value[focusItem.value];
      if (currentItem && typeof currentItem.onSelect === 'function') {
        currentItem.onSelect();
        handleSelect(currentItem);
      }
    } else if (event.key === 'Escape') {
      activeParentPath.value.pop();
      focusItem.value = 0;
    }
    console.log(focusItem.value);
  });
});
</script>

<style src="./QaBox.scss" lang="scss" />
