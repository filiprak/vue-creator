import Vue from 'vue';
import Vuex from 'vuex';

import {ADD_COMPONENT, SET_VUE_COMPONENTS_LIST} from './mutations'

Vue.use(Vuex);


export default new Vuex.Store({
    state: {
        vue_components: [],

        added_components: []
    },
    mutations: {
        [SET_VUE_COMPONENTS_LIST](state, data) {
            state.vue_components = data || []
        },
        [ADD_COMPONENT](state, name) {
            state.added_components.push(name)
        }
    },
})
