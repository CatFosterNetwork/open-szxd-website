
// const baseUrl = "http://open.szxd.swu.social/api";
const baseUrl = "http://redmiax6s.lan:8080/api";
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
  // 用户
  user: `${baseUrl}/users`,
  // 宿舍统计
  gardens: `${baseUrl}/gardens`,
};

export default apiUrl;
