import { Fragment } from "react";

import { clsx } from "core-utils";

export type ListRenderItem<T> = (args: {
  item: T;
  index: number;
}) => JSX.Element;
export type ListKeyExtractor<T> = (args: { item: T; index: number }) => string;
export type FlatListProps<T> = {
  className?: string;
  contentContainerClassName?: string;
  data: T[];
  renderItem: ListRenderItem<T>;
  keyExtractor: ListKeyExtractor<T>;
  renderListHeader?: () => JSX.Element;
  renderListFooter?: () => JSX.Element;
  renderListSeparator?: () => JSX.Element;
};

const FlatList = <T,>({
  className,
  data,
  renderItem,
  keyExtractor,
  contentContainerClassName,
  renderListFooter,
  renderListHeader,
  renderListSeparator,
}: FlatListProps<T>) => (
  <div
    className={clsx(
      "overflow-x-scroll rounded-lg text-left text-sm text-gray-500 shadow-md dark:text-gray-400",
      className
    )}
  >
    <table className="w-full table-auto ">
      {renderListHeader && <thead>{renderListHeader()}</thead>}
      <tbody className={clsx(contentContainerClassName)}>
        {data.map((item, index) => (
          <Fragment key={keyExtractor({ item, index })}>
            {renderItem({ item, index })}
            {index !== data.length - 1 && renderListSeparator?.()}
          </Fragment>
        ))}
      </tbody>
      {renderListFooter && <tfoot>{renderListFooter()}</tfoot>}
    </table>
  </div>
);

export default FlatList;
