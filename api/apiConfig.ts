
// const baseUrl = "http://open.szxd.swu.social/api";
const baseUrl = "http://localhost:8080";
// api 文档 https://app.apifox.com/project/4156592

const apiUrl = {
  // 注册
  register: `${baseUrl}/users/register`,
  // 打卡记录
  checkinList: `${baseUrl}/checkIn/list`,
  // 消息列表
  inbox: `${baseUrl}/inbox`,
  // 统计人数
  statistics: `${baseUrl}/statistics`,
  // 过期时间
  expire: `${baseUrl}/expire`,
  // 账户
  profile: `${baseUrl}/users/profile`,
};

export default apiUrl;
