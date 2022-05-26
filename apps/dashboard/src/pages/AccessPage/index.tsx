/* eslint-disable max-lines */
import { useState } from "react";

import ControlledDataTable from "components/ControlledDataTable";
import {
  DataTableColumn,
  PaginatedResponse,
  SelectedSort,
  SortDirection,
} from "components/ControlledDataTable/types";
import PrivateWrapper from "containers/AuthWrappers/PrivateWrapper";
import MainWrapper from "containers/MainWrapper";

type User = {
  _id: string;
  firstName: string;
  lastName: string;
  birthday?: Date;
  nested: {
    value: string;
  };
};

const users: PaginatedResponse<User> = {
  items: [
    {
      _id: "1",
      firstName: "Hey",
      lastName: "yo",
      birthday: new Date(),
      nested: { value: "hey" },
    },
    {
      _id: "2",
      firstName: "Hey",
      lastName: "yo",
      birthday: new Date(),
      nested: { value: "hey" },
    },
    {
      _id: "3",
      firstName: "Hey",
      lastName: "yo",
      birthday: new Date(),
      nested: { value: "hey" },
    },
    {
      _id: "4",
      firstName: "Hey Reprehenderit cupidatat Eu veniam ad",
      lastName: "yo",
      birthday: new Date(),
      nested: { value: "hey" },
    },
    {
      _id: "5",
      firstName: "Hey",
      lastName: "yo",
      birthday: new Date(),
      nested: { value: "hey" },
    },
    {
      _id: "6",
      firstName: "Hey",
      lastName: "yo",
      birthday: new Date(),
      nested: { value: "hey" },
    },
    {
      _id: "7",
      firstName: "Hey",
      lastName: "yo",
      birthday: new Date(),
      nested: { value: "hey" },
    },
    {
      _id: "8",
      firstName: "Hey Reprehenderit cupidatat Eu veniam ad",
      lastName: "yo",
      birthday: new Date(),
      nested: { value: "hey" },
    },
    {
      _id: "9",
      firstName: "Hey",
      lastName: "yo",
      birthday: new Date(),
      nested: { value: "hey" },
    },
    {
      _id: "10",
      firstName: "Hey Reprehenderit cupidatat Eu veniam ad",
      lastName: "yo",
      birthday: new Date(),
      nested: { value: "hey" },
    },
  ],
  totalItems: 100,
  totalPages: 10,
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
  },
  {
    selector: "birthday",
    title: "Date de naissance",
    cell: ({ birthday }) => <b>{birthday?.toDateString()}</b>,
  },
  {
    selector: "nested.value",
    title: "Misc.",
  },
];

const AccessPage = () => {
  const [currentSort, setCurrentSort] = useState<SelectedSort>({
    field: "firstName",
    direction: SortDirection.ASC,
  });

  return (
    <PrivateWrapper>
      <MainWrapper title="Roles" description="Role management">
        <ControlledDataTable
          currentSort={currentSort}
          onSortChange={setCurrentSort}
          data={users}
          columns={dataColumns}
          keyExtractor={({ item }) => item._id}
        />
      </MainWrapper>
    </PrivateWrapper>
  );
};

export default AccessPage;
