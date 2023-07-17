<template>
  <div class="quick-action-list">
    <QaListItem
      v-for="(item, index) in items"
      :key="item.key"
      :item="item"
      :focused="focusedItemIndex === index"
      @focus="$emit('focus', index)"
      @select="$emit('select', item)"
    />
  </div>
</template>

<script setup lang="ts">
import { Item } from '../../types/types';
// eslint-disable-next-line
import QaListItem from '../QaListItem/QaListItem.vue';

const props = defineProps<{
    items: Item[];
    focusedItemIndex: number;
  }>();
</script>

<style src="./QaList.scss" lang="scss" />
