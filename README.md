# Vue Quick Actions

Vue Quick Actions is a Vue.js library that provides a fast and easy-to-use action menu component.

## Features

- Simple and intuitive interface for easy usage
- Dynamic search and filtering of items
- Navigation and selection functionalities with keyboard shortcuts
- Customizable design and styling options

## Installation

### Using NPM or Yarn

```bash
npm install vue-quick-actions
```
or pnpm
```bash
pnpm install vue-quick-actions
```
or if you are using yarn:
```bash
yarn add vue-quick-actions
```

# items

`items` is where you give the array containing your items.


```html
<VueQuickActions :items="items" />
```

```js
import { Item } from 'vue-quick-actions';

const items: Item[] = [
    {
        key: 'console-write', // Key should be unique
        label: "Log 'hey' to console",
        onSelect() {
            console.log('hey');
        }
    }
]
```

# loading

You can set `loading` to true when you're lazy loading some items. For example, the code below is a simple example of how you can use `loading` to show a loading indicator while you're fetching items from an API.

```html
<template>
  <VueQuickActions
    :items="items"
    :loading="loading"
    @search="handleSearch"
  />
</template>

<script setup lang="ts">
	import { ref } from "vue";

	import { VueQuickActions, Item } from 'vue-quick-actions';
	import "vue-quick-actions/dist/style.css";

	const loading = ref(false);

	const items = ref<Item[]>([
		{
			key: 'console-write', // Key should be unique
			label: "Log 'hey' to console",
			onSelect() {
				console.log('hey');
			}
		}
	])

	const handleSearch = (query: string) => {
		loading.value = true;

		try {
			const response = await fetch('https://api.example.com/search'); 
			const jsonResponse = await response.json();

			items.value = jsonResponse.items;
		} catch (e) {
			// Handle error
		} finally {
			loading.value = false
		}
	};
</script>
```

# search

`search` event is triggered when the user searchs, it gives the current query as a parameter.

```html
<template>
    <VueQuickActions :items="items" @search="handleSearch" />
</template>

<script setup lang="ts">
    import { VueQuickActions, Item } from 'vue-quick-actions';
    import "vue-quick-actions/dist/style.css"

    const items: Item[] = [
        {
            key: 'console-write', // Key should be unique
            label: "Log 'hey' to console",
            onSelect() {
                console.log('hey');
            }
        }
    ]

    const handleSearch = (query: string) => {
        console.log('User is searching!', { query })
    }
</script>
```

# Item
An "item" of `items` prop is typed as below:

```ts
import { Component } from 'vue';

interface BaseItem {
  key: string;
}

interface NormalItem extends BaseItem {
  label?: string;
  alias?: string | string[];
  icon?: string | Component;
  role?: string;
  children?: Item[]
  onSelect?: () => void;
}

interface SeparatorItem extends BaseItem {
  separator: boolean;
  label?: string;
}

type Item = NormalItem | SeparatorItem;
```

## `key`
- Type: `number | string | symbol` 
- Required: `true`
- A unique key representing the current element, __must be unique across all items__.

## `label`
- Type: `string`
- Default: `null`
- Required for all items except line separators.

## `alias`
- Type: `string | string[]`
- Default: `null`

Alias is used to match the item when the user types in the search bar. If the user types in the search bar the alias of the item, the item will be selected.

## `icon`
- Type: `string | Component`
- Default: `null`

The icon of the item, can be an image src or a component. 

## `role`
- Type: `string`
- Default: `null`

The role of the item that will be displayed on the right side of it. 

## `children`
- Type: `Item[]`
- Default: `null`

The children of the item. If the item has children, they will only display when the user selects the item or searchs accordingly.

## `onSelect`
- Type: `() => void`
- Default: `null`

The function that will be called when the user selects the item.

## `separator`
- Type: `boolean`
- Default: `false`

If set to `true`, the item will be displayed as a line separator. If the `label` is also set, the separator will be converted to a small sized label. A separator can't trigger any interactions, it is only meant to separate the content.

## Documentation and GitHub

[Documentation](https://vuequickactions.vercel.app)
[GitHub](https://github.com/iAli7/vue-quick-actions.git)