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
                    <div class="quick-action-content-keys-item">
                        <svg width="6" height="4" viewBox="0 0 6 4" fill="none" xmlns="http://www.w3.org/2000/svg"
                            q:key="NT_0">
                            <path d="M3 0L6 4H0L3 0Z" fill="white"></path>
                        </svg>
                    </div>
                    <div class="quick-action-content-keys-item">
                        <svg width="6" height="4" viewBox="0 0 6 4" fill="none" xmlns="http://www.w3.org/2000/svg"
                            q:key="5y_0">
                            <path d="M3 4L0 0L6 5.24537e-07L3 4Z" fill="white"></path>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="quick-action-list">
                <QuickActionItem v-for="(item, index) in QaList" :key="index" :item="item" :focus="focusItem === index"
                    @focus="focusItem = index" @select="item.onSelect"></QuickActionItem>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import QuickActionItem from '../QaListItem/QaListItem.vue';
import { handleQaSearch } from '../../utils/QaSearch';
import { shortcutItem } from '../../store/store';

const searchValue = ref("")
const focusItem = ref(0)

const originalQaList: shortcutItem[] = [
    {
        name: 'Figma',
        role: 'group',
        tag: 'design',
        onSelect: () => {
            console.log('test');
        },

        children: [
            {
                name: 'Figma Child 1',
                role: 'application',
                onSelect: () => {
                    console.log('test child');
                },
            },
            {
                name: 'Figma Child 2',
                role: 'application',
                onSelect: () => {
                    console.log('test child');
                },
            },
            {
                name: 'Figma Child 3',
                role: 'application',
                onSelect: () => {
                    console.log('test child');
                },
            },
        ],
    },
    {
        name: 'AdobeXD',
        role: 'application',
        tag: 'design',
        onSelect: () => {
            console.log('test');
        },
    }
]

const QaList = ref<shortcutItem[]>([...originalQaList]);

watch(searchValue, () => {
    if (searchValue.value === "") {
        QaList.value = [...originalQaList];
    } else {
        QaList.value = handleQaSearch(searchValue, QaList.value);
    }
})

onMounted(() => {
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

<style src="./QaBox.scss" lang="scss" />
<style src="../../../assets/styles/QaBox/QaList.scss" lang="scss"/>
<style src="../../../assets/styles/QaBox/QaContent.scss" lang="scss"/>
<style src="../../../assets/styles/QaBox/QaSearch.scss" lang="scss"/>