<template>
  <QaBox
    :items="qaList"
    @search="handleSearch"
  />
</template>

<script setup lang="ts">
// eslint-disable-next-line
import QaBox from "./lib/components/QaBox/QaBox.vue"
// eslint-disable-next-line
import home from "./assets/images/homeIcon.vue"
// eslint-disable-next-line
import store from "./assets/images/storeIcon.vue"
// eslint-disable-next-line
import support from "./assets/images/supportIcon.vue"
import { Item } from './lib/types/types';

const qaList: Item[] = [
  {
    label: 'Pages',
    separator: true,
    key: 'Pages-separator',
  },
  {
    label: 'Home Page',
    key: 'home-page',
    icon: home,
    role: 'Page',
  },
  {
    label: 'Store',
    key: 'store',
    icon: store,
    role: 'Page',
    children: [
      {
        label: 'Products',
        key: 'products',
        role: 'Page',
      },
    ],
  },
  {
    label: 'Support',
    key: 'support',
    icon: support,
    role: 'Page',
  },
  {
    label: 'Command',
    separator: true,
    key: 'Pages-separator',
  },
  {
    label: "Log 'hey' to console",
    key: 'write-command',
    role: 'Command',
  },
];

const handleSearch = () => {
  console.log('ads');
};
</script>

<style src="./assets/styles/base/body.scss" lang="scss" />
