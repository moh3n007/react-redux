import { PostsAction, PostsActionType } from "interface";
import { postsData } from "interface/posts";

const initialState: postsData = {
  posts: [],
  loading: true,
};

const reducer = (state = initialState, action: PostsAction) => {
  switch (action.type) {
    case PostsActionType.GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case PostsActionType.POSTS_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    case PostsActionType.GET_MORE_POSTS:
      return {
        loading: true,
      };
    default:
      return state;
  }
};

export default reducer;
