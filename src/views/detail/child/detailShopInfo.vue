<template>
  <div class="shop-info">
    <!--顶部展示商家头像和店铺名字-->
    <div class="shop-top">
      <img :src="shop.logo" alt="">
      <span class="title">{{shop.name}}</span>
    </div>
    <div class="shop-middle shop-middle-left">
      <div class="shop-middle-item shop-middle-left shop-left">
        <div class="info-sells">
          <div class="sells-count">
            {{shop.sells | sellCountFilter}}
          </div>
          <div class="sells-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">
            {{shop.goodsCount}}
          </div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-middle-item shop-middle-right">
        <table>
          <tr v-for="(item,index) in shop.score" :key="index">
            <td>{{item.name}}</td>
            <td class="score" :class="{ 'score-better': item.isBetter }">
              {{item.score}}
            </td>
            <td class="better" :class="{ 'better-more': item.isBetter }">
              <span>{{item.isBetter ? '高': '低'}}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <!--底部显示进店逛逛-->
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  name:'detailShopInfo',
  props: {
    shop: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  filters: {
    sellCountFilter(value) {
      if(value > 10000) {
        //toFixed() 指定小数位数
        return (value / 10000).toFixed(1)+'万'
      } else {
        return value
      }
    
    }
  }
}
</script>

<style scoped>
.shop-info {
  padding: 25px 10px;
  border-bottom: 5px solid #f2f5f8;
}
.shop-top {
  position: relative;
}
.shop-top img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.2);
}
.shop-top .title {
  margin-left: 15px;
  position: absolute;
  top: 28%;
}
.shop-middle {
  margin-top: 15px;
  display: flex;
  align-items: center;
}
.shop-middle-item {
  flex: 1;
}
.shop-middle-left {
  display: flex;
  /* 可以使每个元素之间和元素距离边距的距离都相等 */
  justify-content:  space-evenly;
  color: #333;
  text-align: center;
}
.shop-left {
  border-right: 1px solid rgba(0, 0, 0, 0.2);
}
.sells-count,.goods-count {
  font-size: 18px;
}
.sells-text,.goods-text {
  margin-top: 10px;
  font-size: 12px;
}
.shop-middle-right {
  font-size: 13px;
  color: #333;
}
.shop-middle-right table {
  width: 120px;
  margin-left: 25px;
}
.shop-middle-right table td {
  padding: 5px 0;
}

.shop-middle-right .score {
  color: #5ea732;
}

.shop-middle-right .score-better {
  color: #f13e3a;
}
.shop-middle-right .better span {
  background-color: #5ea732;
  color: #fff;
  text-align: center;
  font-size: 13px;
}

.shop-middle-right .better-more span {
  background-color: #f13e3a;
}

.shop-bottom {
  text-align: center;
  margin-top: 10px;
}

.enter-shop {
  display: inline-block;
  font-size: 14px;
  background-color: #f2f5f8;
  width: 150px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-radius: 10px;
}
</style>