<template>
  <div class="quick-action-list-wrapper">
    <div
      v-if="item.separator"
      class="quick-action-list-separator"
      :class="{'quick-action-list-separator-line': !item.label}"
    >
      {{ item.label }}
    </div>
    <div
      v-else
      class="quick-action-list-item"
      :class="{ 'quick-action-list-item-focused': focused }"
      @click="handleClickItem"
      @mouseenter="$emit('focus')"
    >
      <div class="quick-action-list-item-left">
        <div
          v-if="item.icon"
          class="quick-action-list-item-icon"
        >
          <div v-if="typeof item.icon === 'string'">
            <img :src="item.icon">
          </div>
          <div v-else>
            <component :is="item.icon" />
          </div>
        </div>
        <div class="quick-action-list-item-label">
          {{ item.label }}
        </div>
      </div>
      <div class="quick-action-list-item-role">
        {{ item.role }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

import { Item } from '../../types/types';

defineProps({
  item: {
    type: Object as PropType<Item>,
    required: true,
  },
  focused: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits({
  select: () => Boolean,
  focus: () => Boolean,
});

const handleClickItem = () => {
  emit('select');
};
</script>
