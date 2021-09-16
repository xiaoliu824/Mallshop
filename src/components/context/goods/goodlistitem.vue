<template>
  <div class="goodlistitem" @click="listItemClick">
    <!-- 使用懒加载 v-lazy -->
    <img v-lazy="showImg" alt="" @load="imgItemLoad">
    <div class="goodsinfo">
      <p>{{gooditem.title}}</p>
      <span class="price">{{gooditem.price}}</span>
      <span class="collect">{{gooditem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'goodlistitem',
    props: {
      gooditem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      showImg() {
        return  this.gooditem.img || this.gooditem.image || this.gooditem.showLarge.img 
      }
    },
    methods: {
      //监听图片加载
      imgItemLoad() {
        //①利用中央事件总线来发射事件
        this.$bus.$emit('itemImageLoad')

        //②利用路由来进行管理，让每个事件各自管理
        // if(this.$route.path.indexOf('/home')) {
        //   this.$bus.$emit('homeImageLoad')
        // } else if(this.$route.path.indexOf('/detail')) {
        //   this.$bus.$emit('detailImageLoad')
        // }
        
      },
      //点击跳转到详情页
      listItemClick() {
        this.$router.push('/detail/'+this.gooditem.iid)
      }
    }
  }
</script>

<style scoped>
  .goodlistitem {
    padding-bottom: 40px;
    width: 48%;
    position: relative;
  }

  .goodlistitem img {
    width: 100%;
    border-radius: 5px;
  }

  .goodsinfo {
    font-size: 12px;
    position: absolute;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
    bottom: 5px;
  }
  .goodsinfo p {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    margin-bottom: 3px;
  }

  .goodsinfo .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goodsinfo .collect {
    position: relative;
  }

  .goodsinfo .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>