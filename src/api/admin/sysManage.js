import request from './service'

export function querySysData (query) {
    return request({
        url: '/sys',
        method: 'get',
        params: query,
    })
}

export function addSysData (data) {
    return request({
        url: '/sys',
        method: 'post',
        data,
    })
}

export function updateSysData (id, data) {
    return request({
        url: `/sys/${id}`,
        method: 'put',
        data,
    })
}
export function DelSysData (id, data) {
    return request({
        url: `/sys/${id}`,
        method: 'delete',
        data,
    })
}
