<template>
  <div class="cart">
    <NavBar class="cart-navbar">
      <div slot="center">购物车({{CartNumber}})</div>
    </NavBar>
    <Cartlist />
    <BottomBar />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Cartlist from './child/cartlist'
import BottomBar from './child/bottomBar'
import { mapGetters } from 'vuex'
export default {
  name:'Cart',
  components: {
    NavBar,
    Cartlist,
    BottomBar
  },
  computed: {
    //第一种写法 数组写法
    ...mapGetters(['CartNumber']) ,
    //对象写法 lenght映射到对应的CartNumber
    // ...mapGetters({length : 'CartNumber'})
  }
}
</script>

<style scoped>
.cart {
  height: 100vh;
}
.cart-navbar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>