export interface IPost {
  id: number;
  title: string;
  userId: number;
  body: string;
}

export type IPosts = IPost[];

export interface postsData {
  posts: IPosts;
  loading: boolean;
  error?: string[];
}

export interface postData {
  post: IPost;
  loading: boolean;
  error?: string[];
}
