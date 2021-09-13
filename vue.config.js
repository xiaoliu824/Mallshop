module.exports = {
  configureWebpack: {
    resolve: {
      alias: { //别名 @代表src
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}