# BaseDataTable

Renders a fully controlled basic data table

## Example

```ts
import BaseDataTable from "data-table/BaseDataTable";
import { DataTableColumn } from "data-table/BaseDataTable/types";


const columns: DataTableColumn<RessourceItem>[] = [
  {
    title: "Ressource",
    selector: "title",
  },
];

function highlightDisabledRessources({ item }: { item: RessourceItem }) {
  if (item.isDisabled) return "bg-gray-300";
}

function AccessRessourcesDataTable() {

  ..

  return (
    <BaseDataTable
      data={data}
      columns={columns}
      conditionalRowClassName={highlightDisabledRessources}
      keyExtractor={({ item }) => item._id}
    />
  );
}

export default AccessRessourcesDataTable;
```

## Columns

| Field                       | Type                              | Required                     | Default    | Description                                                                                                                          |
| --------------------------- | --------------------------------- | ---------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| title                       | `string`                          | Yes                          | -          | Title of the column as shown in the header                                                                                           |
| selector                    | `string`                          | Yes if `cell` is not set     | -          | Path of the attribute to select. Supports nested dot notation (uses [`get`](/packages/node/core-utils/get/index.ts) under the hood ) |
| cell                        | `(item: T) => React.ReactElement` | Yes if `selector` is not set | -          | Render cell function                                                                                                                 |
| sortCallbackValue           | `string`                          | No                           | `selector` | Value used for `sort-field` when this column is used for sorting                                                                     |
| sortable                    | `boolean`                         | No                           | `true`     | Whether this column can be used to sort the data                                                                                     |
| hideSortIcon                | `boolean`                         | No                           | `false`    | Whether the sort chevron icon is visible or not                                                                                      |
| className                   | `string`                          | No                           | -          | `className` to be applied to all the cells of this column                                                                            |
| headerRowContainerClassName | `string`                          | No                           | -          | `className` to be applied to the header wrapper of this column (including both the title and the chevron)                            |

## Types

```ts
enum SortDirection {
  ASC = "asc",
  DSC = "desc",
}
```

```ts
type SelectedSort = {
  field: string;
  direction: SortDirection;
};
```

## Props

| Field                     | Type                                                            | Required | Default | Description                                                                 |
| ------------------------- | --------------------------------------------------------------- | -------- | ------- | --------------------------------------------------------------------------- |
| columns                   | `DataTableColumn<T>`                                            | Yes      | -       | Array describing the columns of the data table                              |
| data                      | `T[]`                                                           | Yes      | -       | Data to show in the data table                                              |
| keyword                   | `string`                                                        | No       | -       | Value of the search bar                                                     |
| onKeywordChange           | `(keyword: string) => void`                                     | No       | -       | Triggered whenever the user types in the search bar                         |
| showSearch                | `boolean`                                                       | No       | `false` | Controls whether the search bar is visible or not.                          |
| currentSort               | `SelectedSort`                                                  | No       | -       | Enables showing a chevron in the header                                     |
| onSortChange              | `(args: { field: string; direction: SortDirection }) => void`   | No       | -       | Triggered with new search values whenever a sortable header item is clicked |
| conditionalRowClassName   | `(args: { item: T; index: number; }) => string \| undefined; }` | No       | -       | Function that returns a className to be applied on a row                    |
| renderListSeparator       | `JSX.Element`                                                   | No       | -       | Element to render between every row                                         |
| renderListFooter          | `JSX.Element`                                                   | No       | -       | Element to render as a data table footer                                    |
| keyExtractor              | `(args: { item: T; index: number }) => string`                  | No       | -       | Function that returns a string to be used as a key for the row              |
| className                 | `string`                                                        | No       | -       | `className` applied to the most outer wrapping element of the data table    |
| headerClassName           | `string`                                                        | No       | -       | `className` applied to the element wrapping the data table header           |
| rowClassName              | `string`                                                        | No       | -       | `className` applied to each row of the data table                           |
| footerClassName           | `string`                                                        | No       | -       | `className` applied to the element wrapping the data table footer           |
| contentContainerClassName | `string`                                                        | No       | -       | `className` applied to the element wrapping all the data table rows         |
