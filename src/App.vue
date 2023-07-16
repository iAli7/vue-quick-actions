<template>
  <QaBox :function="test" />
</template>

<script setup lang="ts">
// eslint-disable-next-line
import QaBox from "./lib/components/QaBox/QaBox.vue"
import { shortcutItem } from './lib/types/types';

function test() {
  const array:shortcutItem = {
    label: 'test',
  };

  return array;
}

</script>

<style src="./assets/styles/base/body.scss" lang="scss" />
<style src="./assets/styles/QaBox/QaList.scss" lang="scss" />
<style src="./assets/styles/QaBox/QaContent.scss" lang="scss" />
<style src="./assets/styles/QaBox/QaSearch.scss" lang="scss" />
