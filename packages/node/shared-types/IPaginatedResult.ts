export interface IPaginatedResult<T> {
  items: T[];
  page: number;
  hasNextPage: boolean;
  totalItems: number;
  totalPages: number;
}
