<template>
  <div
    class="quick-action-list-item"
    :class="{ 'quick-action-list-item-focused': focus }"
    @click="$emit('select'), showChildren = !showChildren"
    @mouseenter="$emit('focus')"
  >
    <div class="quick-action-list-item-title">
      {{ item?.label }}
    </div>
    <div class="quick-action-list-item-role">
      {{ item?.role }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const showChildren = ref(false);

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  focus: Boolean,
});

defineEmits({
  select: null,
  focus: null,
});

const item = computed(() => props.item);
const focus = computed(() => props.focus);
</script>
