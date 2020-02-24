<script>

  import VcDropComponent from './VcDropComponent';
  import {INSERT_COMPONENT} from '../../store/mutations';

  function uniqueId() {
    return 'uid_' + Math.random().toString(36).substr(2, 18);
  }

  export default {
    name: 'VcTree',
    components: {VcDropComponent},
    render(h) {
      const children = this.renderChildren(h, this.tree.root.children)
      const empty = children.length < 1
      const classes = ['vc-tree'];

      if (empty) {
        classes.push('vc-tree--empty')
      }

      return h('div', {
        class: classes
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
      tree() {
        return this.$store.state.tree;
      },
    },
    data() {
      return {}
    },
    methods: {
      renderChildren(h, subtree) {
        if (subtree) {
          return subtree.map(id => {
            const component = this.tree[id]

            if (typeof component === 'string') {
              return component;

            } else {
              const children = this.renderChildren(h, component.children)

              const data = component.vueData || {}

              data.directives = [
                {name: 'highlight', value: id}
              ]

              data.key = id

              if (this.dragging && this.highlighted === id) {
                children.push(h(this.draggedComponent.name, {}, this.draggedComponent.name))
              }

              if (children.length === 0) {
                children.push(component.name)
              }

              return h(component.name, data, children)
            }
          })
        } else {
          return [];
        }
      },
    },
    watch: {
      dragging(val) {
        document.body.style.cursor = val ? 'grabbing' : null
      },
      draggedComponent(_new, _old) {
        if (!_new) {
          if (this.highlighted !== null) {
            this.$store.commit(INSERT_COMPONENT, {id: uniqueId(), component: _old, parentId: this.highlighted})

          } else {
            this.$store.commit(INSERT_COMPONENT, {id: uniqueId(), component: _old, parentId: 'root'})
          }
        }
      }
    }
  }
</script>

<style>
  body, html {
    width: 100%;
    height: 100%;
  }

  .vc-tree {
    width: 100%;
    height: 100%;
    padding: 15px;
  }
</style>