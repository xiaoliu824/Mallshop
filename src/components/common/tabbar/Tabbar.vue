<template>
  <div id="tab-bar">
      <slot></slot>
    </div>
</template>

<script>
export default {
  name:'Tabbar'
}
</script>

<style scoped>
#tab-bar{
    display: flex;
    background-color: #f6f6f6;
    height: 49px;
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    /* box-shadow: 第一个值x方向偏移量 第二个值y方向偏移量 模糊度 颜色 */
    box-shadow: 0 -1px 1px rgba(100, 100, 100, .1) ; 
  }

  
</style>