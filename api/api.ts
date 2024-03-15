import http from "./request";
import apiUrl from "./apiConfig";

const Api = {
  register: (data: any) => {
    return http.post(apiUrl.register, data);
  }
};

export default Api;
