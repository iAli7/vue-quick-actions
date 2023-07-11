import { Ref } from "vue";
import { useQuickActions } from "./useQuickAction/useQuickAction";

export const handleQaSearch = (searchValue: Ref<string>) => {
    const items = useQuickActions().shortCutItems.items;
    const lowerSearchValue = searchValue.value.toLowerCase();

    const searchResults = items.filter((item: { name: string; }) => 
        item.name.toLowerCase().includes(lowerSearchValue)
    );

    console.log(searchResults)

    return searchResults
}
