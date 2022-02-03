import axios from "axios";
import {
  CreatePostAction,
  CreatePostsActionType,
  DeletePostAction,
  DeletePostsActionType,
  GalleryAction,
  GalleryActionType,
  IUser,
  ModalAction,
  ModalActionType,
  PostsAction,
  PostsActionType,
  UserAction,
  UserActionType,
} from "interface";
import { IPost } from "interface/posts";
import { Dispatch } from "redux";

const unsplashAccessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

export const login = (newUser: IUser, callback: VoidFunction) => {
  return (dispatch: Dispatch<UserAction>) => {
    dispatch({
      type: UserActionType.LOGIN,
      user: newUser,
      callback,
    });
  };
};

export const logout = (callback: VoidFunction) => {
  return (dispatch: Dispatch<UserAction>) => {
    dispatch({
      type: UserActionType.LOGOUT,
      callback,
    });
  };
};

export const closeModal = () => {
  return (dispatch: Dispatch<ModalAction>) => {
    dispatch({
      type: ModalActionType.CLOSE_MODAL,
      message: "",
    });
  };
};

export const getPosts =
  (start = 0, limit = 10, userId?: number) =>
  async (dispatch: Dispatch<PostsAction>) => {
    dispatch({
      type: PostsActionType.GET_MORE_POSTS,
    });
    let url = `http://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`;
    if (!!userId) {
      url = `http://jsonplaceholder.typicode.com/posts?userId=${userId}&_start=${start}&_limit=${limit}`;
    }
    try {
      const res = await axios.get(url);
      dispatch({
        type: PostsActionType.GET_POSTS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: PostsActionType.POSTS_ERROR,
        payload: error as string[],
      });
    }
  };

export const createPost =
  (post: IPost, onCompleted?: (data: IPost) => void) =>
  async (dispatch: Dispatch<CreatePostAction>) => {
    dispatch({
      type: CreatePostsActionType.CREATING,
    });
    let url = `http://jsonplaceholder.typicode.com/posts`;
    try {
      const res = await axios.post(url, post);
      onCompleted?.(res.data);
      dispatch({
        type: CreatePostsActionType.CREATED,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: CreatePostsActionType.POST_ERROR,
        payload: error as string[],
      });
    }
  };

export const updatePost =
  (post: IPost, onCompleted?: (data: IPost) => void) =>
  async (dispatch: Dispatch<CreatePostAction>) => {
    dispatch({
      type: CreatePostsActionType.CREATING,
    });
    let url = `http://jsonplaceholder.typicode.com/posts/${post.id}`;
    try {
      const res = await axios.put(url, post);
      onCompleted?.(res.data);
      dispatch({
        type: CreatePostsActionType.CREATED,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: CreatePostsActionType.POST_ERROR,
        payload: error as string[],
      });
    }
  };

export const deletePost =
  (postId: number, onCompleted?: (data: IPost) => void) =>
  async (dispatch: Dispatch<DeletePostAction>) => {
    dispatch({
      type: DeletePostsActionType.Deleting,
    });
    let url = `http://jsonplaceholder.typicode.com/posts/${postId}`;
    try {
      const res = await axios.delete(url);
      onCompleted?.(res.data);
      dispatch({
        type: DeletePostsActionType.Deleted,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: DeletePostsActionType.Delete_POST_ERROR,
        payload: error as string[],
      });
    }
  };

export const getGallery =
  (query?: string) => async (dispatch: Dispatch<GalleryAction>) => {
    dispatch({
      type: GalleryActionType.GET_MORE_GALLERY,
    });
    let url = `https://api.unsplash.com/photos?client_id=${unsplashAccessKey}`;
    if (!!query) {
      url = `https://api.unsplash.com/search/photos?client_id=${unsplashAccessKey}&query=${query}`;
    }
    try {
      const res = await axios.get(url);
      dispatch({
        type: GalleryActionType.GET_GALLERY,
        payload: res.data.results ?? res.data,
      });
    } catch (error) {
      dispatch({
        type: GalleryActionType.GALLERY_ERROR,
        payload: error as string[],
      });
    }
  };
