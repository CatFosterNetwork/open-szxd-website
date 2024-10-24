import http from "./request";
import apiUrl from "./apiConfig";

const Api = {
  register: (data: any) => http.post(apiUrl.register, data),
  checkinList: (params: any) => http.get(apiUrl.checkinList, params),
  statistics: () => http.get(apiUrl.statistics, {}),
  inbox: () => http.get(apiUrl.inbox, {}),
  expire: () => http.get(apiUrl.expire, {}),
  profile: () => http.get(apiUrl.profile, {}),
  delete: () => http.del(apiUrl.user, {}),
  gardens: () => http.get(apiUrl.gardens, {}),
  unread: (id: number) => http.get(apiUrl.inbox + `/${id}/unread`, {}),
  read: (id: number) => http.get(apiUrl.inbox + `/${id}/read`, {}),
  updateProfile: (data: any) => http.patch(apiUrl.profile, data),
  notifications: (data: any) => http.patch(apiUrl.user + '/notifications', data),
  lerun: () => http.get(apiUrl.lerun, {}),
  lerunStatus: () => http.get(apiUrl.lerun + '/status', {}),
};

export default Api;
