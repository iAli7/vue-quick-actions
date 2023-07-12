import { Component } from 'vue';

export interface shortcutItem {
  label: string;
  icon?: Component;
  role: 'application' | 'command' | 'group';
  tag?: string | null;
  onSelect: () => void;
  children?: shortcutItem[]
}

export interface ShortcutItems {
  items: shortcutItem[];
}
