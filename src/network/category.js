import {request} from './http'

// 获得分类条目(左侧菜单栏)
export function getLeftMenu() {
  return request({
    url: '/category'
  })
}