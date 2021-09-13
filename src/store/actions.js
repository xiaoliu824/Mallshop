import {ADD_COUNTER,ADD_TO_CART} from './mutations-type'

export default {
  
    addCart(context,payload) {
      //promise(resolve,reject) 这里reject声明未用所以报错
      return new Promise((resolve) => {
        let oldprodoct = context.state.cargoodList.find(item => {
          return item.iid === payload.iid
        })
        //如果它有就对数量进行加1
        if(oldprodoct) {
          // oldprodoct.count += 1
          context.commit(ADD_COUNTER,oldprodoct)
          resolve('当前商品数量+1')
        } else {
          //如果没有，其数量为1，然后加到数组中
          payload.count = 1
          // state.cargoodList.push(payload)
          context.commit(ADD_TO_CART,payload)
          resolve('新添加了一件商品')
        }
      })
    }
  
}