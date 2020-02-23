import Vue from 'vue'
import VcApp from './VcApp.vue'
import './directives/draggable'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store/store'

Vue.config.productionTip = false

window._vc = {store: store};

new Vue({
  vuetify,
  router,
  store,
  render: h => h(VcApp)
}).$mount('#app')
