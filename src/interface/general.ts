export interface IFacet {
  start: number;
  limit: number;
  userId?: number;
}

export interface IPostFormData {
  title: string;
  body: string;
  userId: number;
}
