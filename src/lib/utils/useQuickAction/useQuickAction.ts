import { reactive } from 'vue';

export interface shortcutItem {
  name: string;
  icon?: any | null;
  role: 'application' | 'command';
  onSelect: () => void;
}

export interface ShortcutItems {
  items: shortcutItem[];
}

const shortCutItems = reactive<ShortcutItems>({
  items: [],
});

export function useQuickActions() {
  const setShortcutItems = (array: shortcutItem[]) => {
    shortCutItems.items.push(...array);
  };

  return {
    setShortcutItems,
    shortCutItems,
  };
}
