import Vue from 'vue'
import './directives/highlight'
import './directives/draggable'
import VcTree from "./components/VcTree";
import {SET_VUE_COMPONENTS_LIST} from "../store/mutations";
import store from './store'

console.log(Vue.version)

const prepareVueComponentsSpec = () => {
    const components = []

    for (let name in Vue.options.components) {
        let options = Vue.options.components[name];

        options = (typeof options === 'function' ? options.sealedOptions : options) || {}

        components.push({
            name: name,
            props: options.props || {},
        })
    }

    return components.sort(function (a, b) {
        return a.name > b.name ? 1 : -1
    })
}

store.commit(SET_VUE_COMPONENTS_LIST, prepareVueComponentsSpec())

window.app = new Vue({
    el: '#root',
    store: store,
    render: function (h) {
        return h(VcTree)
    }
})
