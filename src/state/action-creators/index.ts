import { IUser, UserAction, UserActionType } from "interface";
import { Dispatch } from "redux";

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
