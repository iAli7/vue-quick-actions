import { Item } from '../../types/types';

export const getItemsByQuery = (query: string, items: Item[]): Item[] => {
  const flattenedItems: Item[] = [];

  const searchItems = (_items: Item[]) => {
    _items.forEach((item) => {
      const searchableLabel = [item.label, item.alias].filter(Boolean).join(' ').toLowerCase();
      if (item.children) {
        const matchingChildren = getItemsByQuery(query, item.children);
        if (matchingChildren.length > 0) {
          flattenedItems.push(...matchingChildren);
        }
      }
      if (!item.children && searchableLabel.includes(query.toLowerCase())) {
        flattenedItems.push(item);
      }
    });
  };

  searchItems(items);

  return flattenedItems;
};
