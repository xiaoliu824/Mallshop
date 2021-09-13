<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    //1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      observeDOM:true,
      click:true,  //控制div那类元素是否可以点击
      //是否实时监听
      probeType:this.probeType, 
      //当值为true时，上拉加载更多
      pullUpLoad:this.pullUpLoad,  
    });

    //2.监听滚动位置
    //scroll 事件名，第二个参数为回调函数
    if(this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll',(position)=> {
        // console.log(position)
        this.$emit('Scroll',(-position.y))
      })
    }
    
    //3.上拉加载更多
    if(this.pullUpLoad) {
      //pullingUp 在上拉加载动作后触发
      this.scroll.on('pullingUp',()=> {
        this.$emit('pullingUp')
      }) 
    }
  },
  methods: {
    //回到顶部的方法封装
    scrollBackTop(x,y,time=500) {
      //先判断scroll有没有值，有值再进行操作
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    //上拉加载完毕后，调用finshPullUp方法告诉better-scroll数据已加载
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
     },
    //每一次图片加载完成都进行refresh(刷新)
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    //得到滚动的y值
    getScrollY() {
      //判断scroll是否有值
      return this.scroll ? this.scroll.y : 0
    }
  },
};
</script>

<style scoped></style>
