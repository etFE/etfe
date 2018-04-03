import Vue from 'vue'
import Vuex from 'vuex'

import front from './front'
import admin from './admin'

Vue.use(Vuex)

const createStore = () => (
    new Vuex.Store({
        modules: {
            front,
            admin,
        },
    })
)

export default createStore
