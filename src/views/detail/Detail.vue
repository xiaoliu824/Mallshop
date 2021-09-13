<template>
  <div id="detail">
    <Navchild class="detail-nav" @NavBarClick = "NavBarClick"
    ref="nav"
    />
    <Scroll class="detailScroll" ref="Scroll"
     @Scroll ="DeScroll" :probeType = "3"
     >
      <deSwiper :ImageList="Imgdata"/>
      <DeBaseInfo :goods="goods" />
      <DeShopInfo :shop="shop"/>
      <DeGoodsInfo :goodsInfo = "goodsInfo"
      @ImageLoad="ImageLoad"
      />
      <DeParamInfo  ref="param" :goodsParams="goodsParams"/>
      <DeCommonInfo ref="common" :commonInfo = 'commonInfo'/>
      <GoodList ref="recommend" :goods = "recommendList" />
    </Scroll>
    <BottomBar @AddToCar = "AddToCar"/>
    <BackTop @click.native="BacktopClick" v-show="isBacktopShow"/>
  </div>
</template>

<script>
import Navchild from './child/navchild'
import deSwiper from './child/detailswiper'
import DeBaseInfo from './child/detailBaseInfo'
import DeShopInfo from './child/detailShopInfo'
import DeGoodsInfo from './child/detailGoodsInfo'
import DeParamInfo from './child/DetailParamInfo'
import DeCommonInfo from './child/detailCommonInfo'
import GoodList from 'components/context/goods/goodlist'
import BottomBar from './child/detailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
 import { debounce } from 'common/until'
import {ListerMixins,BackTopMixins} from 'common/mixins'
import { mapActions } from 'vuex'



import { 
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getrecommend
 } from 'network/detail'
export default {
  name: 'Detail',
  components: {
    Navchild,
    deSwiper,
    DeBaseInfo,
    DeShopInfo,
    DeGoodsInfo,
    DeParamInfo,
    DeCommonInfo,
    GoodList,
    BottomBar,
    Scroll,
  },
  mixins:[ListerMixins,BackTopMixins],
  data() {
    return {
      id:null,
      Imgdata:[],
      goods: {},
      shop: {},
      goodsInfo: {},
      goodsParams: {},
      commonInfo: {},
      recommendList: [],
      ImageListerner:null,
      themsoffsetTops:[],
      getoffsetTop:null,
      currentIndex:0,
    }
  },
  created() {
    //1.获取到传入的id
    this.id = this.$route.params.iid;

    //2.请求数据
    getDetail(this.id).then((res => {
      // console.log(res)
      const data = res.data.result
      //1.轮播图数据
      this.Imgdata = data.itemInfo.topImages

      //2.获取商品信息
       this.goods = new Goods(
        data.itemInfo, //商品标题
        data.columns,  //商品销量、收藏信息
        data.shopInfo.services  //信息(退还货)
      );

      //3.获取店铺信息
        this.shop = new Shop(data.shopInfo)

      //4.获取商品详情信息
        this.goodsInfo = data.detailInfo

      //5.获取参数信息
        this.goodsParams = new GoodsParam(
          data.itemParams.info,
          data.itemParams.rule
        )
        
      //6.获取评论信息 && data.rate.Crate>0
      if(data.rate.Crate !== 0 ) {
        this.commonInfo = data.rate.list[0]
      }

      //第四次获取在图片刷新完成后，获取到的高度是正确的
      //这里是对频繁获取高度进行防抖操作，减少过于频繁
      this.getoffsetTop = debounce(() =>{
        this.themsoffsetTops = []
        this.themsoffsetTops.push(0)
        this.themsoffsetTops.push(this.$refs.param.$el.offsetTop)
        this.themsoffsetTops.push(this.$refs.common.$el.offsetTop)
        this.themsoffsetTops.push(this.$refs.recommend.$el.offsetTop)
        this.themsoffsetTops.push(Number.MAX_VALUE); //这里添加最大值为了判断条件的第二种解法
        // console.log(this.themsoffsetTops)
      },100)


      //第一次获取对应的高度
      //在created里压根获取不到元素
      // this.themeTopYs = []
    //   this.themeTopYs.push(0);
    //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
    //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    //   console.log(this.themeTopYs);

      //第二次获取对应的高度
      // this.$nextTick(() =>{
    //   //根据最新的数据，对应的DOM已经被渲染出来了
    //   //但是对应的图片依然是没有加载完的（目前获取到offsetTop不包含其中的图片）
    //   //offsetTop值不对的时候，都是因为图片的问题
    //   this.themeTopYs = []
    //   this.themeTopYs.push(0);
    //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
    //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    //   console.log(this.themeTopYs);
    // })

    }));

    //7.获取推荐信息列表
      getrecommend().then(res=> {
        this.recommendList = res.data.data.list
      }
     )
  },
  // mounted() {
  //     this.ImageListerner = ()=> {
  //       refresh()
  //     }
  //      //3.监听item中图片加载完成
  //      const refresh = debounce(this.$refs.Scroll.refresh,50)
  //     this.$bus.$on('itemImageLoad', this.ImageListerner)
    // 第三次获取在mounted中也不可以数据还没有获取到
    //      this.themeTopYs = []
    //   this.themeTopYs.push(0);
    //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
    //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    //   console.log(this.themeTopYs);
  //   },
  destroyed() {
    // console.log('销毁')
    //该组件未缓存状态，所以在destroyed中销毁
    this.$bus.$off('itemImageLoad',this.ImageListerner)
  },
  methods: {
    ...mapActions(['addCart']),
    ImageLoad() {
      // this.$refs.Scroll.refresh()  //这样会调用非常频繁

      //运用防抖来解决调用频繁
      this.refresh()
      //图片刷新完成之后，获取高度
      this.getoffsetTop()
    },
    NavBarClick(index) {
      this.$refs.Scroll.scrollBackTop(0,-this.themsoffsetTops[index],500)
    },
    DeScroll(scrollY) {
      //1.获取y值
      // console.log(scrollY)
      let positionY = scrollY
      let length = this.themsoffsetTops.length
      //2.获取到的y值和主题中的y值进行对比
      //0, 3167, 4012, 4291
      //索引为0 时 在 0 到 3167之间
      //索引为1时  在3167 到 4012之间
      //索引为2时  在4012 到 4291之间
      //索引为3时  在4291
      //第一种解法
      // for(let i = 0 ; i< length; i++) {
      //   // console.log(1)
      //   if(
      //     (this.currentIndex !== i) &&
      //       (
      //         //此条件判断索引为0、1、2时
      //         (i<length-1 && positionY >= this.themsoffsetTops[i] && positionY < this.themsoffsetTops[i+1])
      //         || ( i === length - 1 && positionY >= this.themsoffsetTops[i] )
      //       )
      //   ) {
      //     this.currentIndex = i;
      //     console.log(this.currentIndex)
      //     this.$refs.nav.curIndex = this.currentIndex

      //   }
      // }

      //0, 3167, 4012, 4291
      //索引为0 时 在 0 到 3167之间
      //索引为1时  在3167 到 4012之间
      //索引为2时  在4012 到 4291之间
      //索引为3时  在4291 到 非常大的值之间(Number.Max_value)
      //第二种解法 (这里length-1是因为最后一个用不到)
      for(let i = 0 ; i< length -1 ; i++) {
        if((this.currentIndex !== i) && 
        (positionY >= this.themsoffsetTops[i] && positionY < this.themsoffsetTops[i+1]) 
        ) 
        {
          this.currentIndex = i;
          // console.log(this.currentIndex)
          this.$refs.nav.curIndex = this.currentIndex
        }
      }

      //控制返回按钮的显示与隐藏
      this.listernShow(scrollY)
    },
    AddToCar() {
      //1.获取购物车需要展示的信息
      const prodoct = {}
      prodoct.image = this.Imgdata[0];
      prodoct.title = this.goods.title;
      prodoct.desc = this.goods.desc;
      prodoct.iid = this.id;
      prodoct.price = this.goods.realPrice;
      // console.log(prodoct)
      //2.将商品先保存到vuex中
      // this.$store.dispatch('addCart',prodoct)
      this.addCart(prodoct).then(res=> {
        this.$toast.Show(res,2000)
      })
    }
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  /* 100的视口高度 */
  height: 100vh; 
}
.detailScroll {
  height:calc(100% - 44px - 49px);
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>