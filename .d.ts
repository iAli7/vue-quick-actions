import { DefineComponent, Ref } from 'vue';
import { Item } from './src/lib/types/types';

declare module 'vue-quick-actions';

export const QaBox: DefineComponent<
  {
    items: Item[];
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
    activeParentPath: Ref<Item[]>;
    originalQaList: Ref<Item[]>;
    qaList: Ref<Item[]>;
    handleSelect: (item: Item) => void;
    itemsToRender: Ref<Item[]>;
    navigate: (direction: number) => number;
    handleClickPath: (item: Item) => void;
    handleKeyboard: (event: KeyboardEvent) => void;
  }
>;
