<template>
  <div class="bottom-bar">
    <div class="check-content">
      <CheckButton 
       class="checkbutton"
       :is-check="isSelectAll"
       @click.native="SelectAll"
      />
      <span>全选</span>
    </div>
    <div class="price">合计:{{totalPrice}}</div>
    <div class="calculate" @click="gosettlement">去计算({{length}})</div>
  </div>
</template>

<script>
import CheckButton from 'components/context/Check/CheckButton'
import {mapGetters, mapState} from 'vuex'
export default {
  name: 'bottomBar',
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['Cartdata','CartNumber']),
    ...mapState(['cargoodList']),
    totalPrice() {
      return "￥" + 
      this.Cartdata.filter(item => {
        console.log(item.checked)
        //将被选中的返回
        return item.checked
        
      }).reduce((prev,item) => {
        return prev + item.price * item.count
      },0).toFixed(2)
    },
    length() {
     return this.Cartdata.filter(item => item.checked).length
    },
    isSelectAll() {
      if(this.Cartdata.length === 0) return false
      //全选，没有一个没被选中
      return (!this.Cartdata.find(item =>  !item.checked))
    }
  },
  methods: {
    SelectAll() {
      if(this.isSelectAll) { //全部选中
        this.Cartdata.forEach(item => item.checked = false)
      } else { //部分选中或者全部没选中
        this.Cartdata.forEach(item => item.checked = true)
      }
    },
    gosettlement() {
      console.log(this.CartNumber)
      if(this.CartNumber == 0) {
        this.$toast.Show('请选择商品,再结算')
      } else {
        this.$toast.Show('结算成功,祝您生活愉快')
        this.$store.state.cargoodList = []
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  position: relative;
  display: flex;
  background-color: #eee;
  height: 40px;
  line-height: 40px;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 20px;
  width: 60px;
}
.checkbutton {
  width: 20px;
  height: 20px;
  line-height: 20px;
}
.price {
  margin-left: 20px;
  flex: 1;
  text-align: center;
}
.calculate {
  width: 100px;
  text-align: center;
  background-color: var(--color-tint);
  color: #fff;
}
</style>
