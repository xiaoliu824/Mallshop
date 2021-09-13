<template>
  <div id="home">
    <NavBar class="home-nav"><div slot="center">购物街</div></NavBar>
    <TabControl class="tabcontrol"
       :titles="['流行','新款','精选']" 
        @tabClick="tabClick" ref="tabControl1"
        v-show="isTabshow"
        />
    <Scroll class="content"
     ref="Scroll" :probeType="3"
      @Scroll="Scroll" :pullUpLoad="true"
      @pullingUp = 'loadMore'
      >
      <HomeSwiper :banners="banners" @ImageLoad="ImageLoad" />
      <Recommend :recommends = "recommends"/>
      <FeatureView />
      <TabControl class="home-tabcontrol"
       :titles="['流行','新款','精选']"
        @tabClick="tabClick" ref="tabControl2"/>
      <Goodlist :goods="goodsShow"/>
    </Scroll>
    <BackTop @click.native="BacktopClick" v-show="isBacktopShow"/>
    <!-- <ul>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
      <li>1111111</li>
    </ul> -->
  </div>
</template>

<script>
  import HomeSwiper from './comChild/HomeSwiper'
  import Recommend from './comChild/Recommend'
  import FeatureView from './comChild/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/context/TabControl/TabControl'
  import Goodlist from 'components/context/goods/goodlist'
  import Scroll from 'components/common/scroll/Scroll'
  // import BackTop from 'components/context/BackTop/Backtop'

  import { getHomeMultidata,getHomeGoods } from 'network/home'
  // import { debounce } from 'common/until'
  import { ListerMixins, BackTopMixins} from 'common/mixins'
  
  export default {
    name:'Home',
    components: {
      HomeSwiper,
      Recommend,
      FeatureView,
      NavBar,
      TabControl,
      Goodlist,
      Scroll,
      // BackTop
    },
    mixins:[ListerMixins,BackTopMixins],
    data(){
      return {
        banners:[], //轮播图数据
        recommends:[], //小图片数据
        //商品数据
        goods: {
          'pop': {page: 0, List:[]},
          'new': {page: 0, List:[]},
          'sell': {page: 0, List:[]}
        },
        curentType:'pop',
        // isBacktopShow:false,
        taboffsetTop:0,
        isTabshow:false,
        saveY:0, //用于记录用户离开页面时所滚动到的距离
        ImageListerner:null
      }
    },
    computed:{
      goodsShow() {
        return this.goods[this.curentType].List
      }
    },
    created() {
      //1. 请求多个数据
      this.getHomeMultidata()

      //2. 请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    // mounted() {
    //   this.ImageListerner = ()=> {
    //     refresh()
    //   }

    //    //3.监听item中图片加载完成
    //    const refresh = debounce(this.$refs.Scroll.refresh,50)
    //   this.$bus.$on('itemImageLoad', this.ImageListerner)
    // },
    activated() {
      //  console.log('回来了')
      this.saveY = this.$refs.Scroll.scrollBackTop(0,this.saveY,1)
      //再次刷新，避免回到页面后不能再次滚动
      this.$refs.Scroll.refresh()
     },
     deactivated() {
      //  console.log('溜了')
      //1.保存y值，当前滚动的距离
      this.saveY = this.$refs.Scroll.getScrollY()

      //2.取消全局事件总线的监听
      this.$bus.$off('itemImageLoad',this.ImageListerner)
     },
    methods: {
      /*
      事件监听相关方法
      * */
     tabClick(index) {
      //  console.log(index)
      if(index === 0) {
        this.curentType = 'pop'
      } else if (index === 1) {
        this.curentType = 'new'
      } else if (index === 2) {
        this.curentType = 'sell'
      }
      this.$refs.tabControl1.curIndex = index
      this.$refs.tabControl2.curIndex = index
     },
     //返回顶部监听事件
    //  BacktopClick() {
    //    this.$refs.Scroll.scrollBackTop(0,0,600)
    //  },

     //监听滚动
     Scroll(scrolljl) {
      //1.返回顶部按钮的显示与隐藏
      // this.isBacktopShow = scrolljl>1000?true:false
      this.listernShow(scrolljl)

      //2.决定tabControl是否吸顶
      this.isTabshow = scrolljl > this.taboffsetTop
     },

     //上拉加载更多
     loadMore() {
       //this.curentType 将当前的类型传入，拉取对应类型的数据
       this.getHomeGoods(this.curentType)
       this.$refs.Scroll.refresh()
     },
     
     //轮播图加载完成
     ImageLoad() {
      //  console.log(this.$refs.tabControl2.$el.offsetTop)
      //$el指向当前组件template模板中的根标签
      this.taboffsetTop = this.$refs.tabControl2.$el.offsetTop
      // console.log(this.taboffsetTop)
     },

     
     
      /*
      网络请求相关方法
      * */
     //获取轮播图数据和轮播图下方数据
      getHomeMultidata() {
          getHomeMultidata().then(res => {
          this.banners = res.data.data.banner.list
          this.recommends = res.data.data.recommend.list
        })
      },

      //获取商品列表数据
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
          this.goods[type].List.push(...res.data.data.list)
          this.goods[type].page += 1
          //加载完数据后调用better-scroll
          // this.$refs.Scroll.finshPullUp()
          // console.log(this.$refs.Scroll.finsh)
          this.$refs.Scroll.finishPullUp()
        })
        
      }
    }
  }
</script>

<style scoped>
  #home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* 原生滚动时的定位 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
.tab-control {
  position: relative;
  z-index: 9;
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tabcontrol {
  position: relative;
  z-index: 10;
}
/* .content{
  height: cal(100%-93px);
  overflow: hidden;
  margin-top: 44px;
} */
</style>