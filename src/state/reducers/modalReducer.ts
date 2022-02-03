import { ModalAction, ModalActionType } from "interface";

const initialState = {
  showModal: false,
  message: "",
};
const modalReducer = (state = initialState, action: ModalAction) => {
  switch (action.type) {
    case ModalActionType.OPEN_MODAL:
      return {
        ...state,
        showModal: true,
        message: action.message,
      };
    case ModalActionType.CLOSE_MODAL:
      return {
        ...state,
        showModal: false,
        message: "",
      };
    default:
      return {
        ...state,
      };
  }
};
export default modalReducer;
