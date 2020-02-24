import Vue from 'vue';
import Vuex from 'vuex';

import {
  INSERT_COMPONENT,
  REMOVE_COMPONENT,
  SET_DRAGGING,
  SET_HIGHLIGHT_COMPONENT,
  SET_VUE_COMPONENTS_LIST
} from './mutations'

Vue.use(Vuex);

function removeRecursive(state, id) {
  if (id) {
    const component = state.tree[id]

    if (component) {
      component.children.map(child_id => {
        removeRecursive(state, child_id)
      })
      Vue.delete(state.tree, id)
    }
  }
}

export const config = {
  state: {
    mouse: {
      dragging: false,
      data: null
    },
    highlight_component: null,
    highlight_component_data: null,

    tree: {
      root: {
        children: []
      }
    },

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
      state.highlight_component_data = state.highlight_component ? state.tree[state.highlight_component] : null
    },
    [INSERT_COMPONENT](state, {id, component, parentId}) {
      const parent = state.tree[parentId]

      if (parent) {
        Vue.set(state.tree, id, {
          name: component.name,
          parent: parentId,
          children: []
        })
        parent.children.push(id)
      }
    },
    [REMOVE_COMPONENT](state, id) {
      const component = state.tree[id]

      if (component) {
        state.highlight_component = null
        state.highlight_component_data = null

        const parent = state.tree[component.parent]

        parent.children = parent.children.filter(i => i !== id)

        removeRecursive(state, id)
      }
    },
  },
}

export default new Vuex.Store(config)
