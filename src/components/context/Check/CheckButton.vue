<template>
  <div class="check-button">
    <img src="~assets/img/cart/tick.svg" alt="" :class="{ check: IsCheck }">
  </div>
</template>

<script>
export default {
  name: 'checkbutton',
  props: {
    IsCheck: {
      type: Boolean,
      default() {
        return false
      }
    }
  }
}
</script>

<style scoped>
.check-button {
  position: relative;
  margin: 0;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #ccc;
  cursor: pointer;
}

.check {
  background-color: var(--color-tint);
  border-radius: 50%;
  margin-left: -1px;
  margin-top: -1px;
  /* border: 1px solid var(--color-tint); */
}
</style>