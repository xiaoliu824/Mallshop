<template>
  <div id="category">
    <NavBar class="nav-bar">
      <div slot="center">商品分类</div>
    </NavBar>
    <div class="content">
      <leftMenu :categories = "categories" @Selectindex = "Selectindex"/>
      <Scroll
       id="tab-content"
       :probeType = "3"
       ref="Scroll"
      >
        <TabContentcate :contentCate = "ShowSubcategory"/>
        <TabControl :titles="['综合','新品','销量']"
         @tabClick = "tabClick"
        />
        <Tabcategory :categorydetail = "ShowCatedetails" />
      </Scroll>
    </div>
  </div>
</template>

<script>
 import leftMenu from './comChild/leftMenu'
 import TabContentcate from './comChild/TabContentcate'
 import Tabcategory from './comChild/Tabcategory.vue'

 import NavBar from 'components/common/navbar/NavBar'
 import TabControl from 'components/context/TabControl/TabControl'
 import Scroll from 'components/common/scroll/Scroll'

 import {getLeftMenu,getSubcategory,getCategoryDetail} from 'network/category'
 import { TabControlMixin } from 'common/mixins'
 import { POP, NEW, SELL } from "common/const"
export default {
  name:'Category',
  mixins: [TabControlMixin],
  data() {
    return {
      categories:[],
      currentIndex: -1,
      categoryData:{}
    }
  },
  components: {
    leftMenu,
    TabContentcate,
    NavBar,
    TabControl,
    Tabcategory,
    Scroll
  },
  computed: {
    ShowSubcategory() {
      if(this.currentIndex === -1) return {}
      return this.categoryData[this.currentIndex].subcategories
    },
    ShowCatedetails() {
      if(this.currentIndex === -1) return {}
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
  },
  },
  created() {
    this.getMenudata()
  },
  methods: {
    getMenudata() {
      getLeftMenu().then(res => {
        //1.获取左边栏的商品分类数据
        this.categories = res.data.data.category.list
        console.log(this.categories)

        //2.初始化每个类别的子数据 (子数据一组一组取,因为数据量过大)
        for(let i = 0;i< this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories:{}, //各个分类条目下的衣服品种
            categoryDetail: {
              pop:[],
              new: [],
              sell: [],
            }
          }
        }

        //请求第一个分类数据在页面展示
        this.getSubcategory(0)
      })
    },
    
    //获取各个分类条目下的衣服品种
    getSubcategory(index) {
      this.currentIndex = index
      const maitKey = this.categories[index].maitKey
      getSubcategory(maitKey).then(res => {
        // console.log(res)
        this.categoryData[index].subcategories = res.data.data
        //整合16个分类下的所有数据
        this.categoryData = {...this.categoryData}
        // console.log(this.categoryData)
        this.getCateDetails(POP)
        this.getCateDetails(SELL)
        this.getCateDetails(NEW)
      })
    },
    //根据分类条目的点击拉取对应的数据
    Selectindex(index) {
      // console.log(index)
      this.getSubcategory(index)
    },
    //获取new、pop、sell的商品的方法
    getCateDetails(type) {
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey
      //2. 发送请求,传入miniWallkey,type
      getCategoryDetail(miniWallkey,type).then(res=> {
        this.categoryData[this.currentIndex].categoryDetail[type] = res.data
        console.log(res.data)
        this.categoryData = {...this.categoryData}
        // console.log(this.categoryData)
      })
    }
  },

}
</script>

<style scoped>
  #category {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
    height: calc(100% - 44px - 49px);
    overflow: hidden;
    display: flex;
  }

  #tab-content {
    height: 100%;
    flex: 1;
  }
</style>