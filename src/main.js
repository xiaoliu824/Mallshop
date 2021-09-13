import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from './components/common/Toast/index'
//fastClick步骤
//①导入fastclick
import Fastclick from 'fastclick'

//图片懒加载 vue-lazyload
//①导入lazy-load
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false
//中央事件总线
Vue.prototype.$bus = new Vue()

//安装插件之后会去执行这个插件的install
Vue.use(toast)

//②安装lazy-load
Vue.use(VueLazyLoad, {
  //require 导入
  loading: require('./assets/img/common/placeholder.png')  //占位图片,当图片还未加载出来时,显示此图片
})

//②解决移动端300ms延迟
Fastclick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
