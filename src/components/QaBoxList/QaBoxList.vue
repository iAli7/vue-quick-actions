<template>
  <div class="quick-action-list" v-for="(item, index) in QaList" :key="index">
    <div class="quick-action-list-item" @click="item.handleFunction()">
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
import { QuickActions, ShortcutItem } from '../../lib/utils/QuickActions/QuickActions';


const quickActions = QuickActions();
const QaList = ref<ShortcutItem[]>([]);

const variables: ShortcutItem[] = [
  {
    name: 'Test',
    role: 'application',
    handleFunction: () => {
      console.log('test');
    },
  },
  {
    name: 'as etet',
    role: 'application',
    handleFunction: () => {
      console.log('test');
    },
  },
  {
    name: 'basdasa',
    role: 'application',
    handleFunction: () => {
      console.log('test');
    },
  },
  {
    name: 'qweqweqw',
    role: 'application',
    handleFunction: () => {
      console.log('test');
    },
  },
  {
    name: 'tetete',
    role: 'application',
    handleFunction: () => {
      console.log('test');
    },
  },
  {
    name: 'asdasd',
    role: 'application',
    handleFunction: () => {
      console.log('test');
    },
  },
  {
    name: 'dgdsgsdg',
    role: 'application',
    handleFunction: () => {
      console.log('test');
    },
  },
];

onMounted(() => {
  quickActions.setShortcutItems(variables);
  QaList.value = quickActions.shortCutItems.items;
});
</script>
  
  <style src="./QaBoxList.scss" lang="scss" />
  