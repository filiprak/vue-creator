import Vue from 'vue';
import Vuex from 'vuex';

import {
  INSERT_COMPONENT,
  REMOVE_COMPONENT,
  SET_DRAGGING,
  SET_HIGHLIGHT_COMPONENT, SET_PROP_VALUE, SET_SELECTED_COMPONENT, SET_SHOW_PROPERTIES,
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
    selected_component: null,

    show_properties: false,

    tree: {
      root: {
        name: 'div',
        children: []
      }
    },

    vue_components: []
  },
  getters: {
    selected_component_data(state) {
      const data = state.tree[state.selected_component]
      if (data) {
        data.id = state.selected_component
        return data
      } else {
        return null
      }
    },
    highlight_component_data(state) {
      const data = state.tree[state.highlight_component]
      if (data) {
        data.id = state.highlight_component
        return data
      } else {
        return null
      }
    }
  },
  mutations: {
    [SET_VUE_COMPONENTS_LIST](state, data) {
      state.vue_components = data || []
    },
    [SET_DRAGGING](state, data) {
      state.mouse.dragging = !!data
      state.mouse.data = data ? data : null
    },
    [SET_HIGHLIGHT_COMPONENT](state, id) {
      state.highlight_component = id || null
    },
    [SET_SELECTED_COMPONENT](state, id) {
      state.selected_component = id
      state.show_properties = !!id
    },
    [SET_SHOW_PROPERTIES](state, show) {
      state.show_properties = show
    },
    [SET_PROP_VALUE](state, {name, value}) {
      if (state.selected_component) {
        let vueData = state.tree[state.selected_component].vueData;
        vueData = vueData || {}
        vueData.props = vueData.props || {}
        vueData.props[name] = value
        state.tree[state.selected_component].vueData = vueData
        Vue.set(state.tree, state.selected_component, state.tree[state.selected_component])
      }
    },
    [INSERT_COMPONENT](state, {id, component, parentId}) {
      const parent = state.tree[parentId]

      if (parent) {
        Vue.set(state.tree, id, {
          name: component.name,
          parent: parentId,
          children: [],
          schema: {
            props: component.props
          }
        })
        parent.children.push(id)

        state.selected_component = id;
        state.show_properties = true
      }
    },
    [REMOVE_COMPONENT](state, id) {
      const component = state.tree[id]

      if (component) {
        state.highlight_component = null
        if (id === state.selected_component) {
          state.selected_component = null
          state.show_properties = false
        }

        const parent = state.tree[component.parent]

        parent.children = parent.children.filter(i => i !== id)

        removeRecursive(state, id)
      }
    },
  },
}

export default new Vuex.Store(config)
