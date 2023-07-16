import { shortcutItem } from '../../types/types';

export const handleQaSearch = (query: string, items: shortcutItem[]): shortcutItem[] => {
  const flattenedItems: shortcutItem[] = [];

  const searchItems = (_items: shortcutItem[], isTopLevel: boolean = true) => {
    _items.forEach((item) => {
      if (!item.label && !item.alias) return;

      const searchableLabel = [item.label, item.alias].filter(Boolean).join(' ').toLowerCase();

      if (searchableLabel.includes(query.toLowerCase())) {
        if (!isTopLevel) {
          flattenedItems.push(item);
        }
      }

      if (item.children) {
        searchItems(item.children, false);
      }
    });
  };

  searchItems(items);

  return flattenedItems;
};
