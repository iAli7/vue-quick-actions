<template>
    <div class="quick-action">
        <div class="quick-action-search">
            <input placeholder="Search for apps and commands..." v-model="searchValue" autofocus
                class="quick-action-search-input" type="text">
        </div>
        <div class="quick-action-content">
            <div class="quick-action-content-title">Suggestions</div>
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
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useQuickActions, shortcutItem } from '../../lib/utils/useQuickAction/useQuickAction';
import { handleQaSearch } from '../../lib/utils/QaSearch';

const searchValue = ref("")
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

watch(searchValue, () =>{
    QaList.value = handleQaSearch(searchValue)
})

onMounted(() => {
    useQuickActions().setShortcutItems(variables);
    QaList.value = useQuickActions().shortCutItems.items;
});

</script>

<style src="./QaBox.scss" lang="scss"/>
<style src="../QaBoxList/QaBoxList.scss" lang="scss"/>
<style src="../QaBoxSearch/QaBoxSearch.scss" lang="scss"/>
<style src="../QaBoxContent/QaBoxContent.scss" lang="scss"/>
