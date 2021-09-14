<template>
  <div id="list">
    <div v-for="(item,index) in listData" :key="index" class="item">
      <div class="info">{{item.info}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'listView',
  props: {
    listData: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
#list {
  background-color: #fff;
  font-size: 15px;
  color: #333;
  font-weight: 550;
}

#list .item {
  height: 44px;
  line-height: 44px;
  position: relative;
}

.item .info {
  margin-left: 20px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.2);
}

.item:last-of-type .info {
  border-bottom: none;
}
</style>