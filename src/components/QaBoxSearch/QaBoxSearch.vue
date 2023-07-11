<template>
    <div class="quick-action-search">
        <input placeholder="Search for apps and commands..." v-model="searchValue" autofocus class="quick-action-search-input" type="text">
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import {handleQaSearch} from "../../lib/utils/handleQaSearch"

const searchValue = ref("")

watch(searchValue, () =>{
    handleQaSearch(searchValue)
})
</script>

<style src="./QaBoxSearch.scss" lang="scss" />
