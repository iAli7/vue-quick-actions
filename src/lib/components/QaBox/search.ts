import { shortcutItem } from '../../types/types';

export const handleQaSearch = (query: string, items: shortcutItem[]): shortcutItem[] => {
  const flattenedItems: shortcutItem[] = [];

  const searchItems = (_items: shortcutItem[]) => {
    _items.forEach((item) => {
      if (!item.label && !item.alias) return;

      if ((item.label && item.label.toLowerCase().includes(query.toLowerCase()))
          || (item.alias && item.alias.toLowerCase().includes(query.toLowerCase()))) {
        flattenedItems.push(item);
      }

      if (item.children) {
        searchItems(item.children);
      }
    });
  };

  searchItems(items);

  return flattenedItems;
};
