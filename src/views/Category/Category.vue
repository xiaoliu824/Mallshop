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
      </Scroll>
    </div>
  </div>
</template>

<script>
 import leftMenu from './comChild/leftMenu'
 import TabContentcate from './comChild/TabContentcate'

 import NavBar from 'components/common/navbar/NavBar'
 import Scroll from 'components/common/scroll/Scroll'

 import {getLeftMenu,getSubcategory} from 'network/category'
export default {
  name:'Category',
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
    Scroll
  },
  computed: {
    ShowSubcategory() {
      if(this.currentIndex === -1) return {}
      return this.categoryData[this.currentIndex].subcategories
    }
  },
  created() {
    this.getMenudata()
  },
  methods: {
    getMenudata() {
      getLeftMenu().then(res => {
        //1.获取左边栏的商品分类数据
        this.categories = res.data.data.category.list
        // console.log(this.categories)

        //2.初始化每个类别的子数据 (子数据一组一组取,因为数据量过大)
        for(let i = 0;i< this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories:{}, //各个分类条目下的衣服品种
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
        console.log(this.categoryData)
      })
    },
    //根据分类条目的点击拉取对应的数据
    Selectindex(index) {
      console.log(index)
      this.getSubcategory(index)
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