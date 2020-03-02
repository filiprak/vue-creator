<script>

  import VcDropComponent from './VcDropComponent';
  import {INSERT_COMPONENT} from '../../store/mutations';

  function uniqueId() {
    return 'vue-' + Math.random().toString(36).substr(2, 18);
  }

  export default {
    name: 'VcTree',
    components: {VcDropComponent},
    render(h) {
      return this.renderNode(h, 'root')
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
      renderNode(h, id) {
        const component = this.tree[id]

        if (typeof component === 'string') {
          return component;

        } else {
          const children = component.children.map((child_id) => {
            return this.renderNode(h, child_id)
          })

          const data = component.vueData || {}


          data.key = id

          if (this.dragging && this.highlighted === id) {
            children.push(h(this.draggedComponent.name, {}, this.draggedComponent.name))
          }

          if (id === 'root') {
            data.class = 'vc-tree'

          } else {
            data.directives = [
              {name: 'highlight', value: id}
            ]
            if (children.length === 0) {
              children.push(component.name)
            }
          }

          return h(component.name, data, children)
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