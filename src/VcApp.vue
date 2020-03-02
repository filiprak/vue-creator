<template>
  <v-app id="inspire">
    <v-navigation-drawer
      app
      right
      permanent
      fixed
      width="356"
    >
      <vc-toolbar/>
    </v-navigation-drawer>

    <v-app-bar
      app
      dark
      dense
    >
      <v-toolbar-title>Vue Creator</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import VcToolbar from "./VcToolbar";

  export default {
    name: 'VcApp',
    components: {VcToolbar},
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
    }),
  }
</script>

<style>
  html {
    overflow-y: auto !important;
  }
</style>