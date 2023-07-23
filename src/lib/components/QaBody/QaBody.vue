<template>
  <div class="quick-action-body">
    <QaList
      :items="itemsToRender"
      :focused-item-index="focusedItemIndex"
      @select="handleSelect($event)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { Item } from '../../types/types';
// eslint-disable-next-line
import QaList from '../QaList/QaList.vue';

const props = defineProps<{
    items: Item[];
    focusedItemIndex: number;
  }>();

const itemsToRender = computed(() => props.items);

const emit = defineEmits(['select']);
const handleSelect = (item: Item) => {
  emit('select', item);
};

</script>

<style src="./QaBody.scss" lang="scss" />
