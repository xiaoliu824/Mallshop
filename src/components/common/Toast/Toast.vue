<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  data() {
    return {
      isShow: false,
      message: ''
    }
  },
  methods: {
    Show(message = "默认文字" , time = 3000) {
      this.isShow = true
      this.message = message

      setTimeout(() => {
        this.isShow = false
        this.message = ''
      }, time);
    }
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 10px;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  z-index: 100;
  font-size: 14px;
}
</style>