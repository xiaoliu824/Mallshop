<template>
  <Tabbar>
      <TabbarItem path="/home" >
        <img slot="icon-img" src="~assets/img/tabbar/home.svg" alt="" />
        <img slot="icon-img-active" src="~assets/img/tabbar/home_active.svg" alt="" />
        <div slot="icon-text">首页</div>
      </TabbarItem>
      <TabbarItem path="/category" >
        <img slot="icon-img" src="~assets/img/tabbar/category.svg" alt="" />
        <img slot="icon-img-active" src="~assets/img/tabbar/category_active.svg" alt="" />
        <div slot="icon-text">分类</div>
      </TabbarItem>
      <TabbarItem path="/cart" >
        <img slot="icon-img" src="~assets/img/tabbar/cart.svg" alt="" />
        <img slot="icon-img-active" src="~assets/img/tabbar/cart_active.svg" alt="" />
        <div slot="icon-text">购物车</div>
      </TabbarItem>
      <TabbarItem path="/peruser" >
        <img slot="icon-img" src="~assets/img/tabbar/profile.svg" alt="" />
        <img slot="icon-img-active" src="~assets/img/tabbar/profile_active.svg" alt="" />
        <div slot="icon-text">我的</div>
      </TabbarItem>
    </Tabbar>
</template>

<script>
import Tabbar from 'components/common/tabbar/Tabbar'
import TabbarItem from 'components/common/tabbar/TabbarItem'
export default {
  name:'MainTabbar',
  components: {
    Tabbar,
    TabbarItem
  }
}
</script>

<style>

</style>