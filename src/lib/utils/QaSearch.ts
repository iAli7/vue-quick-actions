import { Ref } from "vue";
import { QuickActions } from "./QuickActions/QuickActions";

export const QaSearch = (searchValue: Ref<string>) => {
    const items = QuickActions().shortCutItems.items;
    const lowerSearchValue = searchValue.value.toLowerCase();

    const searchResults = items.filter(item => 
        item.name.toLowerCase().includes(lowerSearchValue)
    );

    console.log(searchResults)

    return searchResults
}
