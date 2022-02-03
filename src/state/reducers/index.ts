import { combineReducers } from "redux";
import userReducer from "./userReducer";
import modalReducer from "./modalReducer";
import postsReducer from "./postsReducer";
import galleryReducer from "./galleryReducer";

const reducers = combineReducers({
  user: userReducer,
  modal: modalReducer,
  posts: postsReducer,
  gallery: galleryReducer,
});

export default reducers;

export type State = ReturnType<typeof reducers>;
