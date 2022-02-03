import Axios from "axios";

const ServiceBase = {
  get(api: string, params?: any) {
    return Axios.get(api, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      ...params,
    });
  },
  post(api: string, params: any) {
    return Axios.post(api, params);
  },
  put(api: string, params: any) {
    return Axios.post(api, params);
  },
};
export { ServiceBase };
