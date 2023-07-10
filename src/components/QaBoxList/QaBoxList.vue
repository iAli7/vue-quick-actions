<template>
    <div class="quick-action-list" v-for="(item, index) in QaList" :key="index">
        <div class="quick-action-list-title">
            {{ item.name }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { QuickActions } from '../../lib/QucikActions/QuickActions';

const quickActions = QuickActions();
const QaList = ref<{name: string}[]>([]);

const variables = [{ name: 'Test' }];

onMounted(() => {
  quickActions.setShortcutItems(variables);
  QaList.value = quickActions.shortCutItems.items;
});
</script>

<style src="./QaBoxList.scss" lang="scss" />