<template>
  <div class="quick-action-list" v-for="(item, index) in QaList" :key="index">
    <div class="quick-action-list-item" @click="item.onSelect()">
      <div class="quick-action-list-item-title">
        {{ item.name }}
      </div>
      <div class="quick-action-list-item-role">
        {{ item.role }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useQuickActions, shortcutItem } from '../../lib/utils/useQuickAction/useQuickAction';

const QaList = ref<shortcutItem[]>([]);

const variables: shortcutItem[] = [
  {
    name: 'Figma',
    role: 'application',
    onSelect: () => {
      console.log('test');
    },
  },
  {
    name: 'YouTube',
    role: 'application',
    onSelect: () => {
      console.log('test');
    },
  },
];

onMounted(() => {
  useQuickActions().setShortcutItems(variables);
  QaList.value = useQuickActions().shortCutItems.items;
});
</script>
  
  <style src="./QaBoxList.scss" lang="scss" />
  