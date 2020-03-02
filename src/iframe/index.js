import Vue from 'vue'
import './directives/highlight'
import './directives/draggable'
import VcTree from "./components/VcTree";
import {SET_VUE_COMPONENTS_LIST} from "../store/mutations";
import store from './store'
import _ from 'lodash'

console.log(Vue.version)

const prepareVueComponentsSpec = () => {
  const components = []

  for (let name in Vue.options.components) {
    let options = Vue.options.components[name];

    options = (typeof options === 'function' ? options.sealedOptions : options) || {}

    components.push({
      name: name,
      props: _.mapValues(options.props || {}, (vue_schema) => {
        const type = resolveVuePropType(vue_schema.type)
        return {
          type: _.isArray(type) ? type : [type],
          default: vue_schema.default
        }
      }),
    })
  }

  return components.sort(function (a, b) {
    return a.name > b.name ? 1 : -1
  })
}

const resolveVuePropType = (type) => {
  if (type) {
    if (_.isArray(type)) {
      return type.map(resolveVuePropType)
    } else {
      if (type === Boolean) {
        return 'boolean'
      } else if (type === Array) {
        return 'array'
      } else if (type === Function) {
        return 'function'
      } else if (type === String) {
        return 'string'
      } else if (type === Number) {
        return 'number'
      } else if (type === Object) {
        return 'object'
      } else {
        return null
      }
    }
  } else {
    return 'any'
  }
}

store.commit(SET_VUE_COMPONENTS_LIST, prepareVueComponentsSpec())

window.app = new Vue({
  el: '#root',
  store: store,
  render: function (h) {
    return h(VcTree)
  }
})
