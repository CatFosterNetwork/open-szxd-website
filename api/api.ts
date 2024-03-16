import http from "./request";
import apiUrl from "./apiConfig";

const Api = {
  register: (data: any) => http.post(apiUrl.register, data),
  checkinList: (params: any) => http.get(apiUrl.checkinList, params),
  statistics: () => http.get(apiUrl.statistics, {}),
  inbox: () => http.get(apiUrl.inbox, {}),
  expire: () => http.get(apiUrl.expire, {}),
  profile: () => http.get(apiUrl.profile, {}),
};

export default Api;
