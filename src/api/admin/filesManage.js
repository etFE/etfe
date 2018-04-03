import request from './service'

export function queryFileData (query) {
    return request({
        url: '/file',
        method: 'get',
        params: query,
    })
}

export function addFileData (data) {
    console.log(data, 4555555)
    return request({
        url: '/file',
        method: 'post',
        data,
    })
}

export function updateFileData (id, data) {
    return request({
        url: `/file/${id}`,
        method: 'put',
        data,
    })
}
export function DelFileData (id, data) {
    return request({
        url: `/file/${id}`,
        method: 'delete',
        data,
    })
}
