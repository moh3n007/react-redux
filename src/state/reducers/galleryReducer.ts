import { GalleryAction, GalleryActionType } from "interface";
import { galleryData } from "interface/gallery";

const initialState: galleryData = {
  gallery: [],
  loading: true,
};

const reducer = (state = initialState, action: GalleryAction) => {
  switch (action.type) {
    case GalleryActionType.GET_GALLERY:
      return {
        ...state,
        gallery: action.payload,
        loading: false,
      };
    case GalleryActionType.GALLERY_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    case GalleryActionType.GET_MORE_GALLERY:
      return {
        loading: true,
      };
    default:
      return state;
  }
};

export default reducer;
