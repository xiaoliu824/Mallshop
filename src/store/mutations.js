import {ADD_COUNTER,ADD_TO_CART} from './mutations-type'

export default {
  //mutations唯一目的就是修改state中的状态
  //mutations中的每个方法尽可能完成的事件比较单一一点
  
    [ADD_COUNTER](state,payload) {
      payload.count++
    },
    [ADD_TO_CART](state,payload) {
      //商品是否选中
      payload.checked = true
      state.cargoodList.push(payload)
    }
}