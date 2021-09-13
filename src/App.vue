<template>
  <div id="app">
    <!--
      keep-alive 保留组件状态
      exclude 任何被匹配的组件都不会被缓存
    -->
    <keep-alive exclude="Detail">
    <router-view></router-view>
    </keep-alive>
   <MainTabbar />
  </div>
</template>
<script>
  import MainTabbar from 'components/context/MainTabbar/MainTabbar'
  
  export default {
    name: 'App',
    components: {
      MainTabbar,
    }
  }
</script>

<style>
  @import 'assets/css/base.css'
</style>
