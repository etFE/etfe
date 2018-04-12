import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
    baseURL: 'http://localhost:3000/manage', // api的base_url
    timeout: 5000, // request timeout
})

// request interceptor
service.interceptors.request.use((config) => {
    // 请求头Authorization设置token
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.authorization = `Bearer ${token}`
    }
    return config
}, (error) => {
    // Do something with request error
    Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
    (response) => {
        if (response.data.error) {
            Message({
                message: response.data.error,
                type: 'error',
            })
        } else {
            Message({
                message: response.data.message,
                type: 'success',
            })
        }
        return response.data
    },
    (error) => {
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000,
        })
        return Promise.reject(error)
})

const createAPI = (url, method, config) => {
    const cfg = config || {}
    let u = url
    // 增加匹配restful格式url的参数，url中用:name表示动态参数
    // param中传递{ name: 'something' }
    if (cfg.param) {
        Object.keys(cfg.param).forEach((key) => {
            u = u.replace(`:${key}`, cfg.param[key])
        })
    }

    return service({
        url: u,
        method,
        ...cfg,
    })
}

export default createAPI
