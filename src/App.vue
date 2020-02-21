<template>
  <v-app id="inspire">
    <v-navigation-drawer
      app
      right
      permanent
    >
      <Toolbar/>
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
        
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
    import Toolbar from "./Toolbar";
    export default {
        name: 'App',
        components: {Toolbar},
        props: {
            source: String,
        },
        data: () => ({
            drawer: null,
        }),
    }
</script>