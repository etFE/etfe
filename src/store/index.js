import Vue from 'vue'
import Vuex from 'vuex'

import front from './front'
import admin from './admin'
import global from './global'

Vue.use(Vuex)

const createStore = () => (
    new Vuex.Store({
        modules: {
            front,
            admin,
            global,
        },
    })
)

export default createStore
