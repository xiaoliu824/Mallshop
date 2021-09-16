<template>
  <GridView>
    <GoodsItem 
     v-for="(item,index) in categorydetail"
     :key="index"
     :gooditem = "item"
    />
  </GridView>
</template>

<script>
import GridView from 'components/common/gridview/GirdView'
import GoodsItem from 'components/context/goods/goodlistitem'
export default {
  name: 'Tabcategory',
  components: {
    GridView,
    GoodsItem
  },
  props: {
    categorydetail:{
      type: Array ,
      default() {
        return [];
      },
    }
  },
}
</script>

<style>

</style>