import { reactive } from 'vue';

interface ShortcutItem {
  name: string;
}

interface ShortcutItems {
  items: ShortcutItem[];
}

const shortCutItems = reactive<ShortcutItems>({
  items: [],
});

export function QuickActions() {
  const setShortcutItems = (array: ShortcutItem[]) => {
    shortCutItems.items.push(...array);
  };

  console.log(shortCutItems.items);

  return {
    setShortcutItems,
    shortCutItems,
  };
}
