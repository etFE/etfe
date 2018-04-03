
const file = {
    query: config => createAPI('/file', 'get', config),
}

const menu = {
    query: config => createAPI('/menu', 'get', config),
}

export default {
    file,
    menu,
}
