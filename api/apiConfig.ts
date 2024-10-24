const apiUrl = {
  // 注册
  register: `/users/register`,
  // 打卡记录
  checkinList: `/checkIn/list`,
  // 消息列表
  inbox: `/inbox`,
  // 统计人数
  statistics: `/statistics`,
  // 过期时间
  expire: `/expire`,
  // 账户
  profile: `/users/profile`,
  // 用户
  user: `/users`,
  // 宿舍统计
  gardens: `/gardens`,
  // 乐跑
  lerun: `/lerun`,
  // 用户管理
  usersManagement: `/users/management`,
  // 用户封禁
  ban: `/users/ban/`,
  // 用户解封
  unban: `/users/unban/`,
  // 设为代理
  setAgent: `/users/setAgent/`,
  // 增加余额 
  addBalance: `/users/addBalance/`,
  // 设置余额
  setBalance: `/users/setBalance/`,
  // 设置折扣
  setDiscount: `/users/setDiscount/`,
  // 生成keys
  generateKeys: `/keys/generate`,
  // 删除keys
  deleteKeys: `/keys/delete/`,
  // 获取keys
  getKeys: `/keys`,
  // 激活
  activate: `/activate/`,
  // 重置HWID
  revokeHwid: `/revokeHwid/`,
  // 补偿时长
  compensate: `/compensate/`,
};

export default apiUrl;
