export interface IPaginatedResult<T> {
  items: T[];
  page: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalItems: number;
  totalPages: number;
}
