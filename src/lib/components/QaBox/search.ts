import { shortcutItem } from '../../types/types';

export const handleQaSearch = (query: string, items: shortcutItem[]): shortcutItem[] => {
  const flattenedItems: shortcutItem[] = [];

  const searchItems = (_items: shortcutItem[], isTopLevel: boolean = true) => {
    _items.forEach((item) => {
      if (!item.label && !item.alias) return;

      const searchableLabel = [item.label, item.alias].filter(Boolean).join(' ').toLowerCase();

      if (searchableLabel.includes(query.toLowerCase())) {
        flattenedItems.push(item);
      }

      if (item.children && isTopLevel) {
        const matchingChildren = handleQaSearch(query, item.children);
        flattenedItems.push(...matchingChildren);
      }
    });
  };

  searchItems(items);

  return flattenedItems;
};
