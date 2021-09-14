<template>
  <div id="category">
    <NavBar class="nav-bar">
      <div slot="center">商品分类</div>
    </NavBar>
    <div class="content">
      <leftMenu :categories = "categories"/>
    </div>
  </div>
</template>

<script>
 import leftMenu from './comChild/leftMenu'

 import NavBar from 'components/common/navbar/NavBar'
 import {getLeftMenu} from 'network/category'
export default {
  name:'Category',
  data() {
    return {
      categories:[]
    }
  },
  components: {
    leftMenu,
    NavBar
  },
  created() {
    this.getMenudata()
  },
  methods: {
    getMenudata() {
      getLeftMenu().then(res => {
        // console.log(res.data.data.category.list)
        this.categories = res.data.data.category.list
      })
    }
  }
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
</style>