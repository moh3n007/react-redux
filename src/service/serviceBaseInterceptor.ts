import Axios from "axios";
import { ModalActionType } from "interface";

const interceptor = (store: any) => {
  Axios.interceptors.request.use(
    (conf) => {
      return conf;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  Axios.interceptors.response.use(
    (next) => {
      return Promise.resolve(next);
    },
    (error) => {
      store.dispatch({
        type: ModalActionType.OPEN_MODAL,
        message: error.message,
      });
      return Promise.reject(error);
    }
  );
};
export default {
  interceptor,
};
