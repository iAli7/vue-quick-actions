<template>
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
        <img :src="item.icon">
      </div>
      <div class="quick-action-list-item-title">
        {{ item.label }}
      </div>
    </div>
    <div class="quick-action-list-item-role">
      {{ item.role }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';

import { shortcutItem } from '../../types/types';

const showChildren = ref(false);

defineProps({
  item: {
    type: Object as PropType<shortcutItem>,
    required: true,
  },
  focused: Boolean,
});

const emit = defineEmits({
  select: () => Boolean,
  focus: () => Boolean,
});

const handleClickItem = () => {
  emit('select');

  showChildren.value = !showChildren.value;
};
</script>
