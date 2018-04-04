import createAPI from './service'

const file = {
    query: config => createAPI('/file', 'get', config),
    add: config => createAPI('/file', 'post', config),
    update: config => createAPI('/file', 'put', config),
    delete: config => createAPI('/file', 'delete', config),
}

const menu = {
    query: config => createAPI('/menu', 'get', config),
    queryBySys: config => createAPI('/menu', 'get', config),
    add: config => createAPI('/menu', 'post', config),
    update: config => createAPI('/menu', 'put', config),
    delete: config => createAPI('/menu', 'delete', config),
}

const role = {
    query: config => createAPI('/role', 'get', config),
    add: config => createAPI('/role', 'post', config),
    update: config => createAPI('/role', 'put', config),
    delete: config => createAPI('/role', 'delete', config),
}

const system = {
    query: config => createAPI('/sys', 'get', config),
    add: config => createAPI('/sys', 'post', config),
    update: config => createAPI('/sys', 'put', config),
    delete: config => createAPI('/sys', 'delete', config),
}
export default {
    file,
    menu,
    role,
    system,
}
