import createAPI from './service'

const file = {
    query: config => createAPI('/file', 'get', config),
    add: config => createAPI('/file', 'post', config),
    update: config => createAPI('/file/:id', 'put', config),
    delete: config => createAPI('/file/:id', 'delete', config),
}

const menu = {
    query: config => createAPI('/menu', 'get', config),
    queryBySys: config => createAPI('/menu', 'get', config),
    add: config => createAPI('/menu', 'post', config),
    update: config => createAPI('/menu/:id', 'put', config),
    delete: config => createAPI('/menu/:id', 'delete', config),
}

const role = {
    query: config => createAPI('/role', 'get', config),
    add: config => createAPI('/role', 'post', config),
    update: config => createAPI('/role/:id', 'put', config),
    delete: config => createAPI('/role/:id', 'delete', config),
}

const system = {
    query: config => createAPI('/sys', 'get', config),
    add: config => createAPI('/sys', 'post', config),
    update: config => createAPI('/sys/:id', 'put', config),
    delete: config => createAPI('/sys/:id', 'delete', config),
}

const person = {
    query: config => createAPI('/person', 'get', config),
    add: config => createAPI('/person', 'post', config),
    update: config => createAPI('/person/:id', 'put', config),
    delete: config => createAPI('/person/:id', 'delete', config),
}
export default {
    file,
    menu,
    role,
    system,
    person,
}
