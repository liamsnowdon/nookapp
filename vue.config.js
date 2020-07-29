const path = require('path');

module.exports = {
  publicPath: '/critterpedia/',

  configureWebpack: {
    resolve: {
      alias: {
        'Core': path.resolve(__dirname, 'src/Core/'),
        'Critterpedia': path.resolve(__dirname, 'src/Critterpedia/'),
      },
    },
  },
};
