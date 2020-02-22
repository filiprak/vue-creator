function prepareVueComponentsSpec() {
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

window.top._vc.store.commit('SET_VUE_COMPONENTS_LIST', prepareVueComponentsSpec())
