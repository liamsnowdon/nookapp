const path = require('path');

module.exports = {
  publicPath: '/',

  // Disable sourcemaps for production
  productionSourceMap: false,

  configureWebpack: {
    resolve: {
      alias: {
        'Core': path.resolve(__dirname, 'src/Core/'),
        'Index': path.resolve(__dirname, 'src/Index/'),
        'Critterpedia': path.resolve(__dirname, 'src/Critterpedia/'),
        'Fossils': path.resolve(__dirname, 'src/Fossils/'),
        'Checklist': path.resolve(__dirname, 'src/Checklist/'),
      },
    },
  },

  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "Core/scss/abstracts/_variables.scss";
          @import "Core/scss/abstracts/_mixins.scss";
          @import "Core/scss/abstracts/_placeholders.scss";
        `,
      },
    },
  },
};
