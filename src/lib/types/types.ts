import { Component } from 'vue';

interface BaseItem {
  key: String;
}

interface NormalItem extends BaseItem {
  label?: String;
  alias?: String | String[];
  onSelect?: () => void;
  icon?: String | Component;
  role?: String;
  children?: Item[]
}

interface SeparatorItem extends BaseItem {
  separator: Boolean;
  label?: String;
}

export type Item = NormalItem | SeparatorItem;

export interface Items {
  items: Item[];
}
