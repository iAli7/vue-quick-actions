<template>
  <div
    v-if="activeParentPath.length > 0"
    class="quick-action-footer"
  >
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
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  activeParentPath: {
    type: Array,
    required: true,
  },
}>();

const emit = defineEmits<{
  clickPath: Object
}>();

const handleClickPath = (item) => {
  emit('clickPath', item);
};

</script>

<style src="./QaFooter.scss" lang="scss" />
