import Vue from 'vue'

console.log(Vue.version)

window.app = new Vue({
    el: '#root',
    render: function (h) {
        return h('div', {}, 'Root')
    }
})
