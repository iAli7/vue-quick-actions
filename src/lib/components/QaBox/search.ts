import { shortcutItem } from '../../types/types';

export const handleQaSearch = (query: string, items: shortcutItem[]): shortcutItem[] => {
  const flattenedItems: shortcutItem[] = [];

  const searchItems = (_items: shortcutItem[]) => {
    _items.forEach((item) => {
      if (!item.label) return;

      if (item.label.toLowerCase().includes(query.toLowerCase())) {
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
