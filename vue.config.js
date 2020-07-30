const path = require('path');

module.exports = {
  publicPath: '/nookapp/',

  configureWebpack: {
    resolve: {
      alias: {
        'Core': path.resolve(__dirname, 'src/Core/'),
        'Index': path.resolve(__dirname, 'src/Index/'),
        'Critterpedia': path.resolve(__dirname, 'src/Critterpedia/'),
        'Fossils': path.resolve(__dirname, 'src/Fossils/'),
      },
    },
  },
};
