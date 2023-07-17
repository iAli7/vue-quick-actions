import { Component } from 'vue';

interface BaseItem {
  key: string;
  icon?: string | Component;
  role?: string;
}

interface NormalItem extends BaseItem {
  label?: string;
  alias?: string | string[];
  onSelect?: () => void;
  children?: Item[]
}

interface SeparatorItem extends BaseItem {
  separator: true;
}

export type Item = NormalItem | SeparatorItem;

export interface Items {
  items: Item[];
}
