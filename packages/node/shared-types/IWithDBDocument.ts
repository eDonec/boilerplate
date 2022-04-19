export type IWithDBDocument<T> = T & {
  createdAt: string;
  updatedAt: string;
  _id: string;
};
