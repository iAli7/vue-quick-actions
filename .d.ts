import { DefineComponent, Ref } from 'vue';
import { shortcutItem } from './src/lib/types/types';

declare module 'vue-quick-actions';

export const QaBox: DefineComponent<
  {
    items: shortcutItem[];
  },
  {},
  {
    search: (value: string) => void;
  },
  {},
  {
    searchValue: Ref<string>;
    focusItem: Ref<number>;
    loading: Ref<boolean>;
    showQuickAction: Ref<boolean>;
    activeParentPath: Ref<shortcutItem[]>;
    originalQaList: Ref<shortcutItem[]>;
    qaList: Ref<shortcutItem[]>;
    handleSelect: (item: shortcutItem) => void;
    itemsToRender: Ref<shortcutItem[]>;
    navigate: (direction: number) => number;
    handleClickPath: (item: shortcutItem) => void;
    handleKeyboard: (event: KeyboardEvent) => void;
  }
>;
