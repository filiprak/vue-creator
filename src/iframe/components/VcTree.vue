<script>

  import VcDropComponent from './VcDropComponent';

  function uniqueId() {
    return '_' + Math.random().toString(36).substr(2, 15);
  }

  const COMPONENTS = {
    root: {
      children: []
    },
  }

  export default {
    name: 'VcTree',
    components: {VcDropComponent},
    render(h) {
      const children = this.renderChildren(h, COMPONENTS.root.children)
      const empty = children.length < 1
      const classes = ['vc-tree'];

      if (empty) {
        classes.push('vc-tree--empty')
        children.push(h('span', {}, 'Drop components here...'))
      }

      return h('div', {
        class: classes,
      }, children)
    },
    computed: {
      dragging() {
        return this.$store.state.mouse.dragging;
      },
      draggedComponent() {
        return this.$store.state.mouse.data
      },
      highlighted() {
        return this.$store.state.highlight_component;
      },
    },
    data() {
      return {}
    },
    methods: {
      renderChildren(h, subtree) {
        if (subtree) {
          return subtree.map(id => {
            const component = COMPONENTS[id]

            if (typeof component === 'string') {
              return component;

            } else {
              const children = this.renderChildren(h, component.children)

              const data = component.vueData || {}

              data.directives = [
                {name: 'highlight', value: id}
              ]

              if (this.dragging && this.highlighted === id) {
                children.push(h('VcDropComponent'))
              }

              if (children.length === 0) {
                children.push('Empty content...')
              }

              return h(component.name, data, children)
            }
          })
        } else {
          return [];
        }
      },
      insertComponent(component, parentId) {
        const parent = COMPONENTS[parentId]

        if (parent) {
          const id = uniqueId()

          COMPONENTS[id] = {
            name: component.name,
            children: []
          }

          parent.children = parent.children || []
          parent.children.push(id)

          this.$forceUpdate()
        }

        console.log(COMPONENTS)
      }
    },
    watch: {
      draggedComponent(_new, _old) {
        if (!_new) {
          if (this.highlighted !== null) {
            this.insertComponent(_old, this.highlighted)

          } else {
            this.insertComponent(_old, 'root')
          }
        }
      }
    }
  }
</script>

<style scoped>
  .vc-tree {
    width: 100%;
    height: 100%;
  }
</style>