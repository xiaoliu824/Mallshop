<template>
  <div>
    <Navbar>
      <div slot="left" class="backImg" @click="back">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles"
         :key="index" class="item-title" 
         :class="{active: index === curIndex}"
         @click="titleClick(index)"
         >
        {{item}}
        </div>
      </div>
    </Navbar>
  </div>
</template>

<script>
import Navbar from 'components/common/navbar/NavBar'
export default {
  name:'navchild',
  components: {
    Navbar
  },
  data() {
    return {
      titles:['商品','参数','评论','推荐'],
      curIndex:0
    }
  },
  methods: {
    //标题点击
    titleClick(index) {
      this.curIndex = index
      this.$emit('NavBarClick',index)
    },
    //返回
    back() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.title {
  display: flex;
  font-size: 13px;
}
.item-title {
  flex: 1;
}
.backImg img{
  margin-top: 12px;
}
.active {
  color: var(--color-high-text);
}
</style>