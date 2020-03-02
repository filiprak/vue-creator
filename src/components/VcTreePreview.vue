<template>
  <div class="vc-tree-preview">
    <v-list-item v-if="items.length < 1">
      <span class="text--disabled">No components</span>
    </v-list-item>
    <v-treeview v-else :items="items"
                dense activatable hoverable
                class="v-treeview--superdense"
                :active.sync="active"
    >
      <template v-slot:label="data">
        <span class="vc-tree-preview__node-label caption">{{data.item.name}}
          <span class="text--disabled">{{data.item.id}}</span></span>
      </template>
      <template v-slot:append="data">
        <div v-show="data.item.id === $store.state.selected_component">
          <v-btn icon small @click.stop="removeComponent(data.item.id)">
            <v-icon>close</v-icon>
          </v-btn>
          <v-btn icon small @click.stop>
            <v-icon>more_horiz</v-icon>
          </v-btn>
        </div>
      </template>
    </v-treeview>
  </div>
</template>

<script>
  import {REMOVE_COMPONENT, SET_SELECTED_COMPONENT} from '../store/mutations';

  export default {
    name: 'VcTreePreview',
    computed: {
      active: {
        get() {
          return this.$store.state.selected_component ? [this.$store.state.selected_component] : []
        },
        set(active) {
          this.$store.commit(SET_SELECTED_COMPONENT, active.length > 0 ? active[0] : null)
        },
      },
      items: function () {
        return this.populateTree('root').children
      }
    },
    methods: {
      populateTree(node_id) {
        const tree = this.$store.state.tree;

        const component = tree[node_id]

        const populated_children = component.children.map((child_id) => {
          return this.populateTree(child_id)
        })

        return {
          id: node_id,
          name: component.name,
          children: populated_children
        }
      },
      removeComponent(id) {
        this.$store.commit(REMOVE_COMPONENT, id)
      }
    }
  }
</script>

<style>
  .vc-tree-preview__node-label {
    cursor: default;
  }
  .v-treeview--superdense .v-treeview-node__root {
    min-height: 24px !important;
  }

</style>