<template>
    <div class="quick-action">
        <div class="quick-action-search">
            <input placeholder="Search for apps and commands..." autofocus class="quick-action-search-input" type="text">
        </div>
        <QaBoxContent />
    </div>
</template>

<script setup lang="ts">
import QaBoxContent from "../QaBoxContent/QaBoxContent.vue"
</script>

<style src="./QaBox.scss" lang="scss" scoped/>