import request from './service'

export function queryRoleData (query) {
    return request({
        url: '/role',
        method: 'get',
        params: query,
    })
}

export function addRoleData (data) {
    console.log(data, 4555555)
    return request({
        url: '/role',
        method: 'post',
        data,
    })
}

export function updateRoleData (id, data) {
    return request({
        url: `/role/${id}`,
        method: 'put',
        data,
    })
}
export function delRoleData (id, data) {
    return request({
        url: `/role/${id}`,
        method: 'delete',
        data,
    })
}
