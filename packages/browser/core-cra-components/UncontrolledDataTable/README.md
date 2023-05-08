# UncontrolledDataTable

Based on [`data-table`](/packages/browser/data-table/README.md) and uses
[`useSearchParams`](https://reactrouter.com/en/main/hooks/use-search-params) to
set and use the URL's query params.

## import

```ts
import { UncontrolledDataTable } from "core-cra-components";
```

or

```ts
import UncontrolledDataTable from "core-cra-components/UncontrolledDataTable";
```

## Example

```ts
import Api from "api";
import { LeanCategoryDocument } from "categories-types/models/Category";
import { UncontrolledDataTable } from "core-cra-components";
import { getImageUrl } from "core-utils";

import { DataTableColumn } from "data-table/BaseDataTable/types";
import { FetchFunction } from "data-table/InternalUncontrolledDataTable/types";

export const columns: DataTableColumn<LeanCategoryDocument>[] = [
  {
    title: "Image",
    cell: (row) => (
      <img src={getImageUrl(row.image.url)} alt="banner" width="100" />
    ),
    sortable: false,
  },
  {
    title: "Title",
    selector: "title",
  },
];

const fetchFunction: FetchFunction<LeanCategoryDocument> = (args) =>
  Api.categoriesSDK.getCategories({ query: args });

const Categories = () => (
  <UncontrolledDataTable
    fetchFunction={fetchFunction}
    columns={columns}
    keyExtractor={({ item }) => item._id}
  />
);

export default Categories;
```

## Columns

| Field                       | Type                              | Required                     | Default    | Description                                                                                                                         |
| --------------------------- | --------------------------------- | ---------------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| title                       | `string`                          | Yes                          | -          | Title of the column as shown in the header                                                                                          |
| selector                    | `string`                          | Yes if `cell` is not set     | -          | Path of the attribute to select. Supports nested dot notation (uses [`get`](packages/node/core-utils/get/index.ts) under the hood ) |
| cell                        | `(item: T) => React.ReactElement` | Yes if `selector` is not set | -          | Render cell function                                                                                                                |
| sortCallbackValue           | `string`                          | No                           | `selector` | Value used for `sort-field` when this column is used for sorting                                                                    |
| sortable                    | `boolean`                         | No                           | `true`     | Whether this column can be used to sort the data                                                                                    |
| hideSortIcon                | `boolean`                         | No                           | `false`    | Whether the sort chevron icon is visible or not                                                                                     |
| className                   | `string`                          | No                           | -          | `className` to be applied to all the cells of this column                                                                           |
| headerRowContainerClassName | `string`                          | No                           | -          | `className` to be applied to the header wrapper of this column (including both the title and the chevron)                           |

## Data Table

### Types

```ts
type DataTableColumn<T> = RequireAtLeastOne<
  {
    title: string;
    selector: KeyOfNestedObjectWithoutArray<T>;
    cell?: (item: T) => React.ReactElement;
    sortCallbackValue?: string;
    sortable?: boolean;
    className?: string;
    hideSortIcon?: boolean;
    headerRowContainerClassName?: string;
  },
  "cell" | "selector"
>;
```

```ts
export type FetchFunction<T> = (
  args: FetchPaginatedArgs
) => Promise<IPaginatedResult<T>>;
```

```ts
type UncontrolledDataTableHandle<T> = {
  useData: () => [
    data: IPaginatedResult<T>,
    setData: React.Dispatch<React.SetStateAction<IPaginatedResult<T>>>
  ];
  refresh: () => Promise<void>;
};
```

### Props

| Field                     | Type                                                            | Required | Default                   | Description                                                                                                              |
| ------------------------- | --------------------------------------------------------------- | -------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| fetchFunction             | `FetchFunction<T>`                                              | Yes      | -                         | Function that fetches the data to be displayed in the data table                                                         |
| columns                   | `DataTableColumn<T>`                                            | Yes      | -                         | Array describing the columns of the data table                                                                           |
| initialValue              | `IPaginatedResult<T>`                                           | No       | -                         | Initial value of the data table                                                                                          |
| onFetchError              | `(error: unknown) => void`                                      | No       | -                         | Function called when `fetchFunction` throws an error                                                                     |
| handle                    | `UncontrolledDataTableHandle<T>`                                | No       | -                         | Acts as a `ref`, can be used to imperatively refresh the data, as well as to access and set internal data state          |
| limitOptions              | `string[]`                                                      | No       | `["1", "10", "20", "30"]` | Limit per page options                                                                                                   |
| showSearch                | `boolean`                                                       | No       | `false`                   | Controls whether the search bar is visible or not. The search bar controls the `keyword` value passed to `fetchFunction` |
| conditionalRowClassName   | `(args: { item: T; index: number; }) => string \| undefined; }` | No       | -                         | Function that returns a className to be applied on a row                                                                 |
| renderListSeparator       | `JSX.Element`                                                   | No       | -                         | Element to render between every row                                                                                      |
| keyExtractor              | `(args: { item: T; index: number }) => string`                  | No       | -                         | Function that returns a string to be used as a key for the row                                                           |
| className                 | `string`                                                        | No       | -                         | `className` applied to the most outer wrapping element of the data table                                                 |
| headerClassName           | `string`                                                        | No       | -                         | `className` applied to the element wrapping the data table header                                                        |
| rowClassName              | `string`                                                        | No       | -                         | `className` applied to each row of the data table                                                                        |
| footerClassName           | `string`                                                        | No       | -                         | `className` applied to the element wrapping the data table footer                                                        |
| contentContainerClassName | `string`                                                        | No       | -                         | `className` applied to the element wrapping all the data table rows                                                      |
