import Vue from 'vue'
import Vuex from 'vuex'
import {config} from '../store/store'

Vue.use(Vuex)

const store = new Vuex.Store(config);

window.top._vc.store.subscribe((mutation, state) => {
  store.commit(mutation.type, mutation.payload)
})

const vc_store = window.top._vc.store

export default {
  state: store.state,
  commit: (action, payload) => vc_store.commit(action, payload),
  dispatch: (action, payload) => vc_store.dispatch(action, payload),
};
