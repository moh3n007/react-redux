import { IPost, IPosts } from "./posts";
import { IUser } from "./user";

// authentication
export enum UserActionType {
  LOGIN = "login",
  LOGOUT = "logout",
}
interface LoginAction {
  type: UserActionType.LOGIN;
  user: IUser;
  callback: VoidFunction;
}

interface LogoutAction {
  type: UserActionType.LOGOUT;
  callback: VoidFunction;
}

export type UserAction = LoginAction | LogoutAction;
///////////////

// error handling
export enum ModalActionType {
  OPEN_MODAL = "openModal",
  CLOSE_MODAL = "closeModal",
}

interface OpenModalAction {
  type: ModalActionType.OPEN_MODAL;
  message: string;
}

interface CloseModalAction {
  type: ModalActionType.CLOSE_MODAL;
  message: "";
}

export type ModalAction = OpenModalAction | CloseModalAction;
///////////////

// get posts
export enum PostsActionType {
  GET_POSTS = "getPosts",
  POSTS_ERROR = "postsError",
  GET_MORE_POSTS = "getMorePosts",
}

interface SuccessPostsAction {
  type: PostsActionType.GET_POSTS;
  payload: IPosts;
}

interface ErrorPostsAction {
  type: PostsActionType.POSTS_ERROR;
  payload: string[];
}

interface GetMorePostsAction {
  type: PostsActionType.GET_MORE_POSTS;
}

export type PostsAction =
  | SuccessPostsAction
  | ErrorPostsAction
  | GetMorePostsAction;
///////////////

// create a post
export enum CreatePostsActionType {
  CREATED = "created",
  CREATING = "creating",
  POST_ERROR = "postError",
}
interface ErrorPostAction {
  type: CreatePostsActionType.POST_ERROR;
  payload: string[];
}

interface CreatedPostAction {
  type: CreatePostsActionType.CREATED;
  payload: IPost;
}

interface CreatingPostAction {
  type: CreatePostsActionType.CREATING;
}

export type CreatePostAction =
  | ErrorPostAction
  | CreatedPostAction
  | CreatingPostAction;

// delete a post
export enum DeletePostsActionType {
  Deleted = "deleted",
  Deleting = "deleting",
  Delete_POST_ERROR = "deletePostError",
}
interface ErrorDeletePostAction {
  type: DeletePostsActionType.Delete_POST_ERROR;
  payload: string[];
}

interface DeletedPostAction {
  type: DeletePostsActionType.Deleted;
  payload: IPost;
}

interface DeletingPostAction {
  type: DeletePostsActionType.Deleting;
}

export type DeletePostAction =
  | ErrorDeletePostAction
  | DeletedPostAction
  | DeletingPostAction;
