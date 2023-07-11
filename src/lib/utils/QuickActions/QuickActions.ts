import { reactive } from 'vue';

export interface ShortcutItem {
  name: string;
  icon?: any | null;
  role: 'application' | 'command';
  handleFunction: () => void;
}

export interface ShortcutItems {
  items: ShortcutItem[];
}

const shortCutItems = reactive<ShortcutItems>({
  items: [],
});

export function QuickActions() {
  const setShortcutItems = (array: ShortcutItem[]) => {
    shortCutItems.items.push(...array);
  };

  return {
    setShortcutItems,
    shortCutItems,
  };
}
