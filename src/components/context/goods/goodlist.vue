<template>
  <div class="goods">
    <goodslistItem v-for="(item,index) in goods" :key="index" :gooditem="item"/>
  </div>
</template>

<script>
  import goodslistItem from './goodlistitem'
  export default {
    name:'goodlist',
    components: {
      goodslistItem
    },
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    },
    mounted() {
      // console.log(this.goods)
    }
  }
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
  }
</style>