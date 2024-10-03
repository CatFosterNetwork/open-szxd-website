/*
 * Every line of code is my tear
 * Every tear is you
 */
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
  lerun_new: () => http.get(apiUrl.lerun + '/new', {}),
  lerunStatus: () => http.get(apiUrl.lerun + '/status', {}),
  generateKeys: (data: any) => http.post(apiUrl.generateKeys, data),
  keys: () => http.get(apiUrl.getKeys, {}),
  activate: (token: string, inviter_username: string) =>
    http.patch(apiUrl.activate + token, { inviter_username: inviter_username }),
  usersManagement: () => http.get(apiUrl.usersManagement, {}),
  ban: (id: string) => http.patch(apiUrl.ban + id, {}),
  unban: (id: string) => http.patch(apiUrl.unban + id, {}),
  setAgent: (id: string) => http.patch(apiUrl.setAgent + id, {}),
  revokeHwid: (id: string) => http.del(apiUrl.revokeHwid + id, {}),
  deleteKeys: (id: string) => http.del(apiUrl.deleteKeys + id, {}),
  addBalance: (id: string, balance: number) =>
    http.patch(apiUrl.addBalance + id, { balance: balance }),
  setBalance: (id: string, balance: number) =>
    http.patch(apiUrl.setBalance + id, { balance: balance }),
  setDiscount: (id: string, discount: number) =>
    http.patch(apiUrl.setDiscount + id, { discount: discount }),
  compensate: (id: string, days: number, type: string) =>
    http.patch(apiUrl.compensate + id, { days: days, type: type}),
};

export default Api;
