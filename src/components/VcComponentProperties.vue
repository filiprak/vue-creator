<template>
  <v-card class="vc-component-properties" color="orange">
    <v-card-subtitle>{{component.name}}: {{component.id}}</v-card-subtitle>
    <v-card-text>
      <v-container class="ma-0 pt-0">
        <v-layout row wrap>
          <v-flex>
            <v-simple-table height="300">
              <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(prop, name) in props_schema" :key="name">
                <td>{{name}}</td>
                <td class="text--disabled">{{prop.type.join(', ')}}</td>
                <td>
                  <template v-if="prop.type.indexOf('string') > -1">
                    <v-text-field :value="prop.default" solo dense hide-details></v-text-field>
                  </template>
                  <template v-if="prop.type.indexOf('boolean') > -1">
                    <v-switch :value="prop.default" hide-details class="mt-0" @change="setPropValue(name, $event)"></v-switch>
                  </template>
                </td>
              </tr>
              </tbody>
            </v-simple-table>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
  import {SET_PROP_VALUE} from '../store/mutations';

  export default {
    name: "VcComponentProperties",
    computed: {
      component() {
        return this.$store.getters.selected_component_data || {}
      },
      props_schema() {
        return this.$store.getters.selected_component_data ?
          this.$store.getters.selected_component_data.schema.props : {}
      }
    },
    methods: {
      setPropValue(name, value) {
        this.$store.commit(SET_PROP_VALUE, {name, value})
      }
    }
  }
</script>

<style scoped>

</style>