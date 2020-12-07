import axios, { AxiosInstance } from 'axios'
import { ElMessage, ElMessageBox, ElLoading } from 'element-plus';

let loading: object;

function startLoading () { //使用Element loading-start 方法
  loading = ElLoading.service({
    lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
function endLoading () { //使用Element loading-close 方法
  loading.close()
}
const service: AxiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:3000',//process.env.BASE_API
  timeout: 500000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use((config: any) => {
  config.isForm ?
    config.headers["content-type"] = "application/x-www-form-urlencoded" :
    config.headers["content-type"] = "application/json";
  startLoading();
  return config
}, error => {
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    endLoading();
    return response.data
  },
  error => {
    ElMessage({
      message: "网络错误，请重试!",
      type: "error"
    });
    endLoading();
    return Promise.reject(error)
  }
)

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @returns Promise
 */
export function post (url: string, params?: object) {
  return new Promise((resolve, reject) => {
    service({
      url,
      method: 'post',
      params
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @returns Promise
 */
export function get (url: string, params = {}) {
  return new Promise((resolve, reject) => {
    service({
      url,
      method: 'get',
      params: params,
      isForm
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}