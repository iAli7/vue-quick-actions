<template>
    <div class="quick-action">
        <QaBoxSearch />
        <QaBoxContent />
    </div>
</template>

<script setup lang="ts">
import QaBoxContent from "../QaBoxContent/QaBoxContent.vue"
import QaBoxSearch from "../QaBoxSearch/QaBoxSearch.vue"
</script>

<style src="./QaBox.scss" lang="scss" scoped/>