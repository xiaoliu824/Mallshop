import { request } from './http'

// 函数调用=> 压入函数栈(保存函数调用过程中所有变量)
// 函数调用结束后 => 弹出函数栈(释放函数所有变量)
export function getHomeMultidata() {
  return request({
    url:'/home/multidata'
  })
}

//请求流行、新款、精选数据
export function getHomeGoods(type,page) {
  return request({
    url:'/home/data',
    params: {
      type,  //key、value同名，所以直接简写
      page
    }
  })
}