import {request} from './http'

// 获得分类条目(左侧菜单栏)
export function getLeftMenu() {
  return request({
    url: '/category'
  })
}

//获取各个分类条目下的衣服品种
//maitKey(分类的bm)
export function getSubcategory(maitKey) {
  return request({
    url: '/subcategory',
    params: {
      maitKey
    }
  })
}