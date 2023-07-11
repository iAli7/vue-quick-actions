import { Component } from "vue";

export interface shortcutItem {
  name: string;
  icon?: Component;
  role: 'application' | 'command' | 'group';
  tag?: string | null;
  onSelect: () => void;
  children?: shortcutItem[]
}

export interface ShortcutItems {
  items: shortcutItem[];
}