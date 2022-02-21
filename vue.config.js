const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: 'ipfs-share',
    themeColor: '#334155',
    msTileColor: '#334155',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    manifestOptions: {
      display: 'standalone'
    }
  }
});
