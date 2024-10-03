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
  // 用户管理
  usersManagement: `${baseUrl}/users/management`,
  // 用户封禁
  ban: `${baseUrl}/users/ban/`,
  // 用户解封
  unban: `${baseUrl}/users/unban/`,
  // 设为代理
  setAgent: `${baseUrl}/users/setAgent/`,
  // 增加余额 
  addBalance: `${baseUrl}/users/addBalance/`,
  // 设置余额
  setBalance: `${baseUrl}/users/setBalance/`,
  // 设置折扣
  setDiscount: `${baseUrl}/users/setDiscount/`,
  // 生成keys
  generateKeys: `${baseUrl}/keys/generate`,
  // 删除keys
  deleteKeys: `${baseUrl}/keys/delete/`,
  // 获取keys
  getKeys: `${baseUrl}/keys`,
  // 激活
  activate: `${baseUrl}/activate/`,
  // 重置HWID
  revokeHwid: `${baseUrl}/revokeHwid/`,
  // 补偿时长
  compensate: `${baseUrl}/compensate/`,
};

export default apiUrl;
