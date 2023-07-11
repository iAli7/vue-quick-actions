<template>
    <div class="quick-action">
        <div class="quick-action-search">
            <input placeholder="Search for apps and commands..." v-model="searchValue" autofocus
                class="quick-action-search-input" type="text">
        </div>
        <div class="quick-action-content">
            <div class="quick-action-content-top">
                <div class="quick-action-content-title">Suggestions</div>
                <div class="quick-action-content-keys">
                    <div class="quick-action-content-keys-item"><svg width="6" height="4" viewBox="0 0 6 4" fill="none" xmlns="http://www.w3.org/2000/svg" q:key="NT_0"><path d="M3 0L6 4H0L3 0Z" fill="white"></path></svg></div>
                    <div class="quick-action-content-keys-item"><svg width="6" height="4" viewBox="0 0 6 4" fill="none" xmlns="http://www.w3.org/2000/svg" q:key="5y_0"><path d="M3 4L0 0L6 5.24537e-07L3 4Z" fill="white"></path></svg></div>
                </div>
            </div>
            <div class="quick-action-list">
                <div class="quick-action-list-item" @click="item.onSelect()" :class="{ 'quick-action-list-item-focused': index === focusItem }" v-for="(item, index) in QaList" :key="index">
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
import { useQuickActions, shortcutItem } from '../../utils/useQuickAction/useQuickAction';
import { handleQaSearch } from '../../utils/QaSearch';

const searchValue = ref("")
const focusItem = ref(0)

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
    {
        name: 'Twitter',
        role: 'application',
        onSelect: () => {
            console.log('test');
        },
    },
    {
        name: 'Instagram',
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

    window.addEventListener("keydown", (event) => {
        if (event.key === "ArrowDown") {
            if (focusItem.value < QaList.value.length - 1) {
                focusItem.value++;
            }
        } else if (event.key === "ArrowUp") {
            if (focusItem.value > 0) {
                focusItem.value--;
            }
        } else if (event.key === "Enter") {
            QaList.value[focusItem.value].onSelect();
        }
    });
});

</script>

<style src="./QaBox.scss" lang="scss"/>
<style src="../QaBoxList/QaBoxList.scss" lang="scss"/>
<style src="../QaBoxSearch/QaBoxSearch.scss" lang="scss"/>
<style src="../QaBoxContent/QaBoxContent.scss" lang="scss"/>
