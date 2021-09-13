<template>
  <div id="shop-item">
    <div class="item-selector">
      <!-- 选中不选中的问题，一定是在模型改变的 -->
      <Checkbutton :IsCheck = "Item.checked" @click.native="CheckClick"/>
    </div>
    <div class="item-img">
      <img :src="Item.image" alt="">
    </div>
    <div class="item-info">
      <div class="item-title">{{Item.title}}</div>
      <div class="item-desc">商品描述: {{Item.desc}}</div>
      <div class="item-bottom">
        <div class="item-price left">￥{{Item.price}}</div>
        <div class="item-count right">x{{Item.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Checkbutton from 'components/context/Check/CheckButton'
export default {
  name:'cartlistitem',
  props: {
    Item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  components: {
    Checkbutton
  },
  methods: {
    CheckClick() {
      this.Item.checked = !this.Item.checked
    }
  }
}
</script>

<style scoped>
#shop-item {
  width: 100%;
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}

.item-selector {
  width: 14%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-title ,.item-desc {
  overflow: hidden;
  /* white-space: nowrap 元素内如果有多个空格或换行符在一起,浏览器只会显示一个 
  元素文本内容不会自动换行,只有遇到br才换行
  */
  white-space: nowrap;
  /* 文本溢出用省略号替代 */
  text-overflow: ellipsis;
}
.item-img {
  padding: 5px;
}

.item-img img {
  width: 100px;
  height: 100px;
  display: block;
  border-radius: 5px;
}

.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}

.item-info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 20px;
}

.item-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}

.item-bottom .item-price {
  color: orangered;
}
</style>