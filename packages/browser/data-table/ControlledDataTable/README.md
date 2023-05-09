# ControlledDataTable

An extension from [BaseDataTable](/packages/browser/data-table/BaseDataTable/README.md)
made to support pagination out of the box

## Columns

See [BaseDataTable Docs](/packages/browser/data-table/BaseDataTable/README.md#columns)

## Types

```ts
export interface IPaginatedResult<T> {
  items: T[];
  page: number;
  hasNextPage: boolean;
  totalItems: number;
  totalPages: number;
}
```

## Props

| Field                     | Type                                                            | Required | Default                   | Description                                                                 |
| ------------------------- | --------------------------------------------------------------- | -------- | ------------------------- | --------------------------------------------------------------------------- |
| columns                   | `DataTableColumn<T>`                                            | Yes      | -                         | Array describing the columns of the data table                              |
| data                      | `IPaginatedResult<T>`                                           | Yes      | -                         | Value of the data table                                                     |
| keyword                   | `string`                                                        | No       | -                         | Value of the search bar                                                     |
| onKeywordChange           | `(keyword: string) => void`                                     | No       | -                         | Triggered whenever the user types in the search bar                         |
| showSearch                | `boolean`                                                       | No       | `false`                   | Controls whether the search bar is visible or not.                          |
| currentSort               | `SelectedSort`                                                  | No       | -                         | Enables showing a chevron in the header                                     |
| onSortChange              | `(args: { field: string; direction: SortDirection }) => void`   | No       | -                         | Triggered with new search values whenever a sortable header item is clicked |
| limit                     | `string`                                                        | No       | -                         | Currently selected limit in the footer                                      |
| limitOptions              | `string[]`                                                      | No       | `["1", "10", "20", "30"]` | Limit per page options                                                      |
| onLimitChange             | `(limit: number) => void`                                       | No       | -                         | Triggered whenever a new limit is selected                                  |
| onPageChange              | `(page: number) => void`                                        | No       | -                         | Triggered whenever a new page is selected                                   |
| loading                   | `boolean`                                                       | No       | `false`                   | Controls whether the loading overlay is visible                             |
| conditionalRowClassName   | `(args: { item: T; index: number; }) => string \| undefined; }` | No       | -                         | Function that returns a className to be applied on a row                    |
| renderListSeparator       | `JSX.Element`                                                   | No       | -                         | Element to render between every row                                         |
| keyExtractor              | `(args: { item: T; index: number }) => string`                  | No       | -                         | Function that returns a string to be used as a key for the row              |
| className                 | `string`                                                        | No       | -                         | `className` applied to the most outer wrapping element of the data table    |
| headerClassName           | `string`                                                        | No       | -                         | `className` applied to the element wrapping the data table header           |
| rowClassName              | `string`                                                        | No       | -                         | `className` applied to each row of the data table                           |
| footerClassName           | `string`                                                        | No       | -                         | `className` applied to the element wrapping the data table footer           |
| contentContainerClassName | `string`                                                        | No       | -                         | `className` applied to the element wrapping all the data table rows         |
