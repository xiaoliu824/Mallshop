//以插件的形式封装toast
import Toast from './Toast'

const obj = {}

obj.install = function(Vue) {
  //1.创建组件构造器
  const totalContrustor = Vue.extend(Toast)

  //2.new的方式,根据组件构造器,创建出来一个组件对象
  const toast = new totalContrustor()

  //3.将组件元素手动的挂载到某一个元素上
  toast.$mount(document.createElement('div'))
  console.log(toast.$el)
  //4.toast.$el就是上面创建的div
  document.body.appendChild(toast.$el)

  //往Vue的原型上添加
  Vue.prototype.$toast = toast
}
export default obj