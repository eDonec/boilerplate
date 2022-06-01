import { UncontrolledDataTable } from "core-next-components";
import {
  DataTableColumn,
  FetchFunction,
} from "core-next-components/UncontrolledDataTable/types";
import {
  extractQueryParams,
  isSortDirection,
} from "core-next-components/UncontrolledDataTable/utils";
import { IPaginatedResult } from "shared-types/IPaginatedResult";

import { GetServerSideProps } from "next";

type User = {
  _id: string;
  firstName: string;
  lastName: string;
  birthday?: string;
  nested: {
    value: string;
  };
};

const users: User[] = [
  {
    _id: "1",
    firstName: "Hey",
    lastName: "yo",
    birthday: new Date().toDateString(),
    nested: { value: "hey" },
  },
  {
    _id: "2",
    firstName: "Hey",
    lastName: "yo",
    birthday: new Date().toDateString(),

    nested: { value: "hey" },
  },
  {
    _id: "3",
    firstName: "Hey",
    lastName: "yo",
    birthday: new Date().toDateString(),

    nested: { value: "hey" },
  },
];

const paginatedUsers: IPaginatedResult<User> = {
  items: users,
  totalItems: 200,
  totalPages: 2,
  hasNextPage: true,
  page: 1,
};

const dataColumns: DataTableColumn<User>[] = [
  {
    selector: "firstName",
    title: "Prénom",
  },
  {
    selector: "lastName",
    title: "Nom",
    className: "text-red-600",
  },
  {
    selector: "fullName",
    title: "Full name",
    cell: ({ firstName, lastName }) => <>{`${firstName} ${lastName}`}</>,
  },
  {
    selector: "birthday",
    title: "Date de naissance",
    cell: ({ birthday }) => <b>{birthday}</b>,
  },
  {
    selector: "nested.value",
    title: "Misc.",
    sortable: false,
  },
];

const fetchFunction: FetchFunction<User> = async () => {
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 500);
  });

  return paginatedUsers;
};

export const normalizeQueryParam = (input: string | string[]) =>
  input instanceof Array ? input[0] : input;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const formattedQuery = Object.entries(context.query).reduce<
      Record<string, string>
    >(
      (prev, [key, value]) =>
        value ? { ...prev, [key]: normalizeQueryParam(value) } : prev,
      {}
    );

    const { page, limit, sortDirection, sortField } = extractQueryParams(
      new URLSearchParams(formattedQuery)
    );

    const initialDatatableData = await fetchFunction({
      page,
      limit,
      sortField: sortField || undefined,
      sortDirection: isSortDirection(sortDirection) ? sortDirection : undefined,
    });

    return {
      props: {
        initialDatatableData,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

type DataTablePageProps = {
  initialDatatableData?: IPaginatedResult<User>;
};

const DataTablePage = ({ initialDatatableData }: DataTablePageProps) => {
  return (
    <UncontrolledDataTable
      fetchFunction={fetchFunction}
      columns={dataColumns}
      keyExtractor={({ item }) => item._id}
      initialValue={initialDatatableData}
    />
  );
};

export default DataTablePage;
