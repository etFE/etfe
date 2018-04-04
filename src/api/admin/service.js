import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
    baseURL: 'http://192.168.1.127:3000/manage', // api的base_url
    timeout: 5000, // request timeout
})

// request interceptor
service.interceptors.request.use((config) => {
    console.log(config, 'request')
    // Do something before request is sent
    return config
}, (error) => {
    // Do something with request error
    console.log(error, 'error') // for debug
    Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
    (response) => {
        console.log(response, 'response')
        Message({
            message: response.data.message,
            type: 'success',
        })
        return response.data
    },
    (error) => {
        console.log(`err${error}`, 'error2')// for debug
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
