<template>
  <Swiper>
      <SwiperItem v-for="(item, index) in banners" :key="index">
        <a :href="item.link">
        <img :src="item.image" alt="" @load="ImageLoad">
      </a>
      </SwiperItem>
    </Swiper>
</template>

<script>
  import { Swiper,SwiperItem } from 'components/common/swiper'
  export default {
    name: 'HomeSwiper',
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    data() {
      return {
        isLoad:false,  //图片是否加载完成
      }
    },
    methods: {
      ImageLoad() {
        if(!this.isLoad) {
          this.$emit('ImageLoad')
          this.isLoad = true  //只需要加载一次就可以
        }
      }
    }
  }
</script>

<style>

</style>