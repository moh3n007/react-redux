import { IUser } from "./user";

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
