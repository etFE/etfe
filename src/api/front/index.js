import axios from 'axios'
import iView from 'iview'

const isDevelopment = process.env.NODE_ENV === 'development'
const devBaseUrl = 'http://localhost:3000'
const prodBaseUrl = 'http://118.178.184.131:3000'

// 实例化axios
const instance = axios.create({
    baseURL: isDevelopment ? devBaseUrl : prodBaseUrl,
    timeout: 100000,
})

// 配置iview的全局loadingBar
const loading = {
    count: 0,
    isLoading: false,
    start () {
        this.count += 1
        if (!this.isLoading) {
            setTimeout(() => {
                if (!this.isLoading && this.count > 0) {
                    this.isLoading = true
                    this.checkLoading()
                }
            })
        }
    },
    cancle () {
        this.count -= 1
        if (this.count <= 0) {
            this.done()
        }
    },
    done () {
        this.count = 0
        this.isLoding = false
        iView.LoadingBar.finish()
    },
    checkLoading () {
        const el = document.querySelector('.ivu-loading-bar')

        if (this.isLoading && !el) {
            iView.LoadingBar.start()
        }
    },
}

export const setNotice = (type, title, desc) => {
    iView.Notice[type]({
        title,
        desc,
    })
}

// 请求拦截器 可以用于token
instance.interceptors.request.use((config) => {
    loading.start()
    return config
}, error => Promise.reject(error))

// 响应拦截器 用于请求失败时，拦截触发错误通知？
instance.interceptors.response.use((res) => {
    loading.cancle()
    return res
}, (error) => {
    loading.cancle()
    const res = error.response
    if (res) {
        setNotice('error', res.status, res.message)
    } else {
        setNotice('error', 'Error', error)
    }
    Promise.reject(error)
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

    return instance({
        url: u,
        method,
        ...cfg,
    })
}


// 分模块请求

// 登录模块
// const u = {

// }

// 组件列表模块
const u = {
    login: config => createAPI('/manage/user/login', 'post', config),
    // register: config => createAPI('/user/register', 'post', config),
}

const plugin = {
    getList: config => createAPI('/plugin/menu', 'get', config),
}

const guide = {
    getList: config => createAPI('/plugin/demo/:name', 'get', config),
}

// 第三方api接口
const thirdParty = {
    getBackground: () => createAPI('/photos/random', 'get', {
        baseURL: 'https://api.unsplash.com',
        headers: {
            Authorization: 'Client-ID bf61a02bc1dc338778d85863be7be225a2cd3a44233be5eb81f4fa051793c10c',
        },
    }),
}

export default {
    u,
    plugin,
    guide,
    thirdParty,
}
