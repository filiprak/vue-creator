import Vue from 'vue';
import Vuex from 'vuex';

import {SET_DRAGGING, SET_HIGHLIGHT_COMPONENT, SET_VUE_COMPONENTS_LIST} from './mutations'

Vue.use(Vuex);

export const config = {
  state: {
    mouse: {
      dragging: false,
      data: null
    },
    highlight_component: null,

    vue_components: []
  },
  mutations: {
    [SET_VUE_COMPONENTS_LIST](state, data) {
      state.vue_components = data || []
    },
    [SET_DRAGGING](state, data) {
      state.mouse.dragging = !!data
      state.mouse.data = data ? data : null
    },
    [SET_HIGHLIGHT_COMPONENT](state, data) {
      state.highlight_component = data && data !== 0 ? data : null
    },
  },
}

export default new Vuex.Store(config)
