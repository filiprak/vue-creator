<template>
  <v-layout class="vc-page-view" column>
    <VcPagePreview ref="preview"/>
    <VcComponentProperties v-if="show_properties"/>
  </v-layout>
</template>

<script>
  import VcPagePreview from "./VcPagePreview";
  import VcComponentProperties from '../../components/VcComponentProperties';

  export default {
    name: "VcHomePage",
    components: {VcComponentProperties, VcPagePreview},
    computed: {
      show_properties() {
        return this.$store.state.show_properties;
      }
    }
  }
</script>

<style scoped>

</style>