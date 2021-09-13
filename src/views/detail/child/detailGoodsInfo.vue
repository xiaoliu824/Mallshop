<template>
  <div v-if="Object.keys(goodsInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{goodsInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{goodsInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img v-for="(item,index) in goodsInfo.detailImage[0].list"
      :key="index"
      @load="ImageLoad"
      :src="item" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'detailGoodsInfo',
  props: {
    goodsInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      counter:0, //加载到第几张
      imageLength:0 //所有图片的长度
    }
  },
  watch: {
    goodsInfo() {
      this.imageLength = this.goodsInfo.detailImage[0].list.length
    }
  },
  methods: {
    ImageLoad() {
      if(++this.counter === this.imageLength) {
        this.$emit('ImageLoad')
      }
    }
  }
}
</script>

<style scoped>
.goods-info {
  position: relative;
  padding: 20px 0;
  border-bottom: 5px solid #f2f5f8;
}
.info-desc {
  padding: 0 15px;
}
.info-desc .start,
.info-desc .end {
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
  position: relative;
}
.info-desc .start {
  float: left;
}
.info-desc .end {
  float: right;
}
.info-desc .start::before,
.info-desc .end::after {
  content: "";
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: #333;
  bottom: 0;
}

.info-desc .end::after {
  right: 0;
}

.info-desc .desc {
  padding: 15px 0;
  font-size: 14px;
}
.info-key {
  margin: 10px 0 10px 15px;
  color: #333;
  font-size: 15px;
}
.info-list img {
  width: 100%;
}
</style>