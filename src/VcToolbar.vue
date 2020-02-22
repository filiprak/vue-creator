<template>
  <div class="vc-toolbar">
    <v-list-item dense>
      <v-list-item-content>
        <v-list-item-title class="title">
          Components ({{components.length}})
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider/>

    <v-text-field
      solo dense flat hide-details
      v-model.trim="search"
      @keydown.esc="search = null"
      placeholder="Search..."
      append-icon="search"
      clearable
    />

    <v-divider/>

    <v-list class=" vc-toolbar__content">
      <v-list-item dense
                   :inactive="false"
                   v-for="component in components"
                   :key="component.name"
                   @click="addComponent(component)"
      >
        <v-list-item-content>
          <v-list-item-title class="body-2">
            {{component.name}}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{Object.keys(component.props).join(', ')}}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

  </div>
</template>

<script>
    import {ADD_COMPONENT} from "./store/mutations";

    export default {
        name: 'VcToolbar',
        computed: {
            components() {
                return this.$store.state.vue_components.filter(({name}) => {
                    return name.toLowerCase().indexOf((this.search || '').toLowerCase()) > -1
                })
            }
        },
        data() {
            return {
                search: ''
            }
        },
        methods: {
            addComponent(component) {
                this.$store.commit(ADD_COMPONENT, component.name)
            }
        }
    }
</script>

<style scoped>
  .vc-toolbar {
    height: 100%;
  }

  .vc-toolbar__content {
    height: calc(100% - 99px);
    overflow: auto;
  }
</style>