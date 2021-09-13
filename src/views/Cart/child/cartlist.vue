<template>
  <div class="cart-list">
    <Scroll class="content" ref="Scroll">
      <CartlistItem 
       v-for="(item,index) in Cartdata"
       :key="index"
       :Item = "item"
      />
    </Scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import CartlistItem from './cartlistitem'

import {mapGetters} from 'vuex'
export default {
  name:'cartlist',
  components: {
    Scroll,
    CartlistItem
  },
  computed: {
    ...mapGetters(['Cartdata'])
  },
  activated() {
    this.$refs.Scroll.refresh()
  },
}
</script>

<style scoped>
.cart-list {
  height: calc(100% - 44px - 49px - 40px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>