<template>
  <v-layout class="vc-page-view">
    <VcPagePreview ref="preview"/>
  </v-layout>
</template>

<script>
    import VcPagePreview from "./VcPagePreview";
    export default {
        name: "VcHomePage",
        components: {VcPagePreview},
        computed: {

        }
    }
</script>

<style scoped>

</style>