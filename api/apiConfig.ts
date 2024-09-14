let baseUrl = "http://redmiax6s.lan:8080/api";
// api 文档 https://app.apifox.com/project/4156592

if (process.env.NODE_ENV === "development") {
  baseUrl = "http://redmiax6s.lan:8080/api";
}
else {
  baseUrl = "https://szxd.swu.lol/api";

}

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
  // 乐跑
  lerun: `${baseUrl}/lerun`,
};

export default apiUrl;
