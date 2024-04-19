import axios from 'axios'

// 创建一个实例，此后都在此实例上改造
const http = axios.create({
  // timeout: 1000 * 4,
  withCredentials: true,
})
// 请求拦截器
const beforeRequest = (config: any) => {
  // 设置 token
  // const token = localStorage.getItem('token')
  // token && (config.headers.Authorization = token)
  // NOTE  添加自定义头部
  // config.headers['my-header'] = 'jack'
  return config
}

http.interceptors.request.use(beforeRequest)

// 响应拦截器
const responseSuccess = (response: any) => {
  // eslint-disable-next-line yoda
  // 这里没有必要进行判断，axios 内部已经判断
  // const isOk = 200 <= response.status && response.status < 300
  return Promise.resolve(response)
}

function clearAllCookie() {
  if (!document) return
  var date=new Date();
  date.setTime(date.getTime()-10000);
  var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
  if (keys) {
      for (var i = keys.length; i--;)
        document.cookie=keys[i]+"=0; expire="+date.toString()+"; path=/";
  }
}

const responseFailed = (error: any) => {
  const { response } = error
  if (response) {
    // handleError(response)
    // cons error = new Error(response.data.msg)
    if (response.status === 400) {
      clearAllCookie()
      if (!window) return;
      window.location.href = '/login'
    }
    return Promise.reject()
  } else if (!window.navigator.onLine) {
    return Promise.reject(new Error('please check your network'))
  }
  return Promise.reject(error)
}
http.interceptors.response.use(responseSuccess, responseFailed)

// 请求方法
const get = (url: string, params: any) => {
  return http.get(url, { params })
}

const post = (url: string, data: any) => {
  return http.post(url, data)
}

const put = (url: string, data: any) => {
  return http.put(url, data)
}

const del = (url: string, data: any) => {
  return http.delete(url, data)
}

const patch = (url: string, data: any) => {
  return http.patch(url, data)
}

export default {
  get,
  post,
  put,
  del,
  patch,
}