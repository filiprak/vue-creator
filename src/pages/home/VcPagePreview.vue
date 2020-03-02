<template>
  <div class="vc-page-preview">
    <span class="text--disabled">{{highlight_text}}</span>
    <iframe :srcdoc="document" class="vc-iframe">

    </iframe>
  </div>
</template>

<script>
  import xml2js from 'xml2js'

  //const parser = new xml2js.Parser()
  const builder = new xml2js.Builder({headless: true, renderOpts: {pretty: false}})

  export default {
    name: 'VcPagePreview',
    props: {
      script: {
        type: String,
        default: ''
      }
    },
    computed: {
      document: function () {
        return this.getBaseHtml();
      },
      highlight_text: function () {
        const component = this.$store.getters.highlight_component_data
        return component ? component.name : 'Hover on component'
      },
    },
    methods: {
      getBaseHtml() {
        return `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            <link type="text/css" rel="stylesheet" href="//unpkg.com/bootstrap/dist/css/bootstrap.min.css" />
            <link type="text/css" rel="stylesheet" href="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.min.css" />
            <title>Iframe</title>
            ${this.getScriptTag('https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.js')}
            ${this.getScriptTag('https://unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.min.js')}
            ${this.getScriptTag('https://unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue-icons.min.js')}

          </head>
          <body>
            <div id="root"></div>
            ${this.getScriptTag('libs/iframe/iframe.umd.js')}
          </body>
          </html>
        `
        /*return `
                  <!DOCTYPE html>
                  <html lang="en">
                  <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                    <link rel="stylesheet" href="https://cdn.materialdesignicons.com/2.5.94/css/materialdesignicons.min.css">
                    <link rel="stylesheet" href="https://unpkg.com/buefy/dist/buefy.min.css">
                    <title>Iframe</title>
                    ${this.getScriptTag('https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.js')}
                    ${this.getScriptTag('https://unpkg.com/buefy/dist/buefy.min.js')}

                  </head>
                  <body>
                    <div id="root"></div>
                    ${this.getScriptTag('libs/iframe/iframe.umd.js')}
                  </body>
                  </html>
                `*/
        /*return `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons">
            <link href="https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css" rel="stylesheet">
            <link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/vuetify/2.2.14/vuetify.min.css" />
            <title>Iframe</title>
            ${this.getScriptTag('https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.js')}
            ${this.getScriptTag('https://cdnjs.cloudflare.com/ajax/libs/vuetify/2.2.14/vuetify.min.js')}

          </head>
          <body>
            <div id="root"></div>
            ${this.getScriptTag('libs/iframe/iframe.umd.js')}
          </body>
          </html>
        `*/
      },
      getScriptTag(url, content) {
        return ['<script', (url ? ' src="' + url + '" ' : ''), '>', content, '</', 'script>'].join('')
      },
    },
  }
</script>

<style scoped>
  .vc-page-preview {
    width: 100%;
    height: 100%;
  }
  .vc-iframe {
    width: 100%;
    height: calc(100% - 28px);
  }
</style>