<template>
  <div class="tab-bar-item" @click="tabbarClick">
    <div v-show="!isActive" class="item-icon"><slot name="icon-img"></slot></div>
    <div v-show="isActive"  class="item-icon"><slot name="icon-img-active"></slot></div>
    <div :style="activeStyle" class="item-text"><slot name="icon-text"></slot></div>
  </div>
</template>

<script>
export default {
  name:'TabbarItem',
  props:{
    path: {
      type: String,
      required: true
    },
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  data(){
    return {
      // isActive: true
    }
  },
  computed:{
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {}
    }
  },
  methods: {
    tabbarClick() {
      this.$router.push(this.path)
    }
  },
}
</script>

<style scoped>
.tab-bar-item {
    /* 均等分 */
    flex: 1; 
    text-align: center;
    /* 常用高度，移动端 */
    /* height: 49px; */
  }

.item-icon img {
  width: 24px;
  height: 24px;
  margin-top: 5px;
  vertical-align: middle;
}

.item-text {
  font-size: 12px;
  margin-top: 3px;
  color: #333;
}

.active {
  color: aqua;
}
</style>