<template>
  <div class="grid-view" ref="gridView">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'GridView',
  props: {
    cols: {
      type: Number,
      default: 2
    },
    hMargin: {
      type: Number,
      default: 8
    },
    vMargin: {
      type: Number,
      default: 8
    },
    itemSpace: {
      type: Number,
      default: 8
    },
    lineSpace: {
      type: Number,
      default: 8
    }
  },
  methods: {
    autoLayout() {
      //1.获取gridEl和children
      //这里为什么不用document.querySelector呢?
      //因为如果在项目中,多处都用到了grid-vie,获取到的会不准确
      let gridEl = this.$refs.gridView
      let children = gridEl.children

      //2.设置gridEl的内边距
      gridEl.style.padding = `${this.vMargin}px ${this.hMargin}`

      //3.计算item的宽度
      let itemWidth = (
        gridEl.clientWidth - 2 * this.hMargin -
        (this.cols - 1) * this.itemSpace) /this.cols;
      for(let i = 0; i< children.length; i++) {
        let item = children[i]
        item.style.width = itemWidth + "px"
        if((i + 1) % this.cols !== 0) {
          item.style.marginRight = this.itemSpace + "px"
        }
        if(i >= this.cols) {
          item.style.marginTop = this.lineSpace + "px"
        }
      }
    
    }
  },
  mounted() {
    setTimeout(() => {
      this.autoLayout()
    }, 20);
  },
  updated() {
    this.autoLayout()
  }
}
</script>

<style scoped>
.grid-view {
  display: flex;
  /* 让弹性盒子在必要的时候拆行或拆列 */
  flex-wrap: wrap;
  padding: 15px 8px;
}
</style>