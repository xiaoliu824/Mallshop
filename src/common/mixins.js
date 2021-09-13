import {debounce} from './until'
//处理推荐商品和goodsItem商品加载完成的事件监听
export const ListerMixins = {
  data() {
    return {
      ImageListerner:null,
      refresh:null
    }
  },
  mounted() {
    // console.log('我是混入中的处理')
    this.ImageListerner = ()=> {
      this.refresh()
    }

     //3.监听item中图片加载完成
     this.refresh = debounce(this.$refs.Scroll.refresh,50)
    this.$bus.$on('itemImageLoad', this.ImageListerner)
  },
}

import BackTop from 'components/context/BackTop/Backtop'
import {BACKTOP_DISTANCE} from 'common/const'
export const BackTopMixins = {
  components: {
    BackTop
  },
  data() {
    return {
      isBacktopShow:false,
    }
  },
  methods: {
    BacktopClick() {
      this.$refs.Scroll.scrollBackTop(0,0,600)
    },
    //显示与隐藏
    listernShow(position) {
      // console.log(position)
      this.isBacktopShow = position >BACKTOP_DISTANCE
    }
  },
}