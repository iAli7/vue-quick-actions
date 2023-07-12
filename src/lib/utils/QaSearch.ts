import { Ref } from "vue";
import { shortcutItem } from "../store/store";

export const handleQaSearch = (searchValue: Ref<string>, Array: shortcutItem[]) => {
    const lowerSearchValue = searchValue.value.toLowerCase();

    const searchResults = Array.filter((item: { name: string; }) =>
        item.name.toLowerCase().includes(lowerSearchValue)
    );

    console.log(searchResults)

    return searchResults
}
