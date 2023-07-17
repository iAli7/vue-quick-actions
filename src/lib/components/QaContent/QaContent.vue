<template>
  <div class="quick-action-content">
    <QaList
      :items="itemsToRender"
      :focused-item-index="focusedItemIndex"
      @focus="focusedItemIndex = $event"
      @select="handleSelect($event)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { shortcutItem } from '../../types/types';

// eslint-disable-next-line
import QaList from '../QaList/QaList.vue';

const props = defineProps<{
    items: shortcutItem[];
    focusedItemIndex: number;
  }>();

const itemsToRender = computed(() => props.items);
</script>

<style src="./QaContent.scss" lang="scss" />
