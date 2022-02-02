import { IUser, UserAction, UserActionType } from "interface";
import { fakeAuthConfig } from "config/faceAuthConfig";
import store from "store";

const login = (newUser: IUser, callback: VoidFunction) => {
  fakeAuthConfig.login(() => {
    store.set("user", newUser);
    callback();
  });
  return newUser;
};

const logout = (callback: VoidFunction) => {
  fakeAuthConfig.logout(() => {
    callback();
  });
  return null;
};

const reducer = (user: IUser | null = null, action: UserAction) => {
  switch (action.type) {
    case UserActionType.LOGIN:
      return login(action.user, action.callback);
    case UserActionType.LOGOUT:
      return logout(action.callback);
    default:
      return user;
  }
};

export default reducer;
