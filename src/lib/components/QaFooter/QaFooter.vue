<template>
  <div class="quick-action-footer">
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
    <div class="quick-action-footer-keys">
      <div class="quick-action-footer-keys-item">
        ESC
      </div>
      <div class="quick-action-footer-keys-item">
        Enter
      </div>
      <div class="quick-action-footer-keys">
        <div class="quick-action-footer-keys-item">
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
        <div class="quick-action-footer-keys-item">
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
