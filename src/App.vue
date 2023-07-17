<template>
  <QaBox
    :items="qaList"
    :loading="true"
    @search="handleSearch"
  />
</template>

<script setup lang="ts">
// eslint-disable-next-line
import QaBox from "./lib/components/QaBox/QaBox.vue"
import { Item } from './lib/types/types';

const qaList: Item[] = [
  {
    label: 'Figma',
    separator: true,
    key: 'figma-separator',
  },
  {
    label: 'Figma',
    alias: ['design'],
    key: 'figma',
    role: 'Group',
    onSelect: () => {
      console.log('test');
    },

    children: [
      {
        label: 'Figma Child 1',
        key: 'figma-child',

        onSelect: () => {
          console.log('test child');
        },
        children: [
          {
            label: 'Figma Child 1 Child',
            key: 'figma-child-child',
          },
        ],
      },
    ],
  },
  {
    label: 'AdobeXD',
    separator: true,
    key: 'adobexd-separator',
  },
  {
    label: 'AdobeXD',
    alias: 'design',
    key: 'adobexd',
    role: 'Test',
    onSelect: () => {
      console.log('test');
    },
  },
];

const handleSearch = () => {
  console.log('ads');
};
</script>

<style src="./assets/styles/base/body.scss" lang="scss" />
