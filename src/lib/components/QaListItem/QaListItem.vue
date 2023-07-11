<template>
    <div class="quick-action-list-item" @click="$emit('select'), showChildren = !showChildren"
        :class="{ 'quick-action-list-item-focused': focus }" @mouseenter="$emit('focus')">
        <div class="quick-action-list-item-title">
            {{ item?.name }}
        </div>
        <div class="quick-action-list-item-role">
            {{ item?.role }}
        </div>
    </div>
    <div v-if="item?.children && showChildren">
        <QaListItem v-for="(childItem, index) in item.children" :key="index" :item="childItem" @focus="$emit('focus')"
            @select="childItem.onSelect">
        </QaListItem>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const showChildren = ref(false)

const { item, focus } = defineProps({
    item: {
        type: Object,
        required: true,
    },
    focus: Boolean
});
</script>
