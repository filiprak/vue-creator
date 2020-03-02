<template>
  <div class="vc-toolbar">
    <v-list-item height="47">
      <b>Components ({{components.length}})</b>
    </v-list-item>

    <v-divider/>

    <v-text-field
      solo dense flat hide-details autofocus
      v-model.trim="search"
      @keydown.esc="search = null"
      placeholder="Search..."
      append-icon="search"
      clearable
    />

    <v-divider/>

    <div class="vc-toolbar__content">

      <div class="vc-toolbar__components">

        <v-list>
          <v-list-item dense
                       v-draggable="component"
                       :inactive="false"
                       v-for="component in components"
                       :key="component.name"
                       @click.stop
          >
            <v-list-item-content>
              <v-list-item-title class="body-2">
                <v-icon small>widgets</v-icon>
                {{component.name}}
              </v-list-item-title>
              <v-list-item-subtitle class="caption">
                {{Object.keys(component.props).join(', ')}}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>

      <v-divider/>

      <v-list-item>
        <b>Template Tree</b>
      </v-list-item>

      <v-divider/>

      <div class="vc-toolbar__tree">
        <VcTreePreview/>
      </div>

    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import VcTreePreview from './components/VcTreePreview';

  export default {
    name: 'VcToolbar',
    components: {VcTreePreview},
    computed: {
      components() {
        return this.$store.state.vue_components.filter(({name}) => {
          return name.toLowerCase().indexOf((this.lazy_search || '').toLowerCase()) > -1
        })
      }
    },
    data() {
      return {
        search: '',
        lazy_search: '',
        debounced_search: _.debounce(this.filterComponents, 400),
      }
    },
    methods: {
      filterComponents(string) {
        this.$nextTick(() => {
          this.lazy_search = string;
        })
      }
    },
    watch: {
      search(value) {
        this.debounced_search(value)
      }
    }
  }
</script>

<style scoped>
  .vc-toolbar {
    height: 100%;
  }

  .vc-toolbar__content {
    height: calc(100% - 91px);
    overflow: hidden;
  }

  .vc-toolbar__components {
    height: calc(50% - 48px);
    overflow: auto;
  }

  .vc-toolbar__tree {
    height: 50%;
    overflow: auto;
  }
</style>