console.log('test lib')

const Root = {
    name: 'Root',
    template: '${this.root_component.template}'
}

const app = new Vue({
    el: '#root',
    render: function (h) {
        return h(Root)
    }
})
