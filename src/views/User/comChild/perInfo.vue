<template>
  <div id="person">
    <a href="#" class="clear-fix">
      <slot name="per-icon">
        <svg class="privateImage-svg left">
          <use
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xlink:href="#avatar-default"
          ></use>
        </svg>
      </slot>
      <div class="login-info left">
        <slot name="user-nickname">
          <div>登录/注册</div>
        </slot>
        <div class="phone">
          <slot name="user-phone">暂无绑定手机号</slot>
        </div>
      </div>
      
    </a>
  </div>
</template>

<script>
export default {
  name: 'perInfo'
}
</script>

<style scoped>
#person {
  border-top: 1px solid #EDB7C1;
  background-color: var(--color-tint);
  padding: 15px;
  margin-top: -5px;
}

#person .privateImage-svg {
  width: 60px;
  height: 60px;
  background-color: #fff;
  border-radius: 50%;
}

.left {
  float: left;
}

#person .login-info {
  color: #fff;
  margin: 10px 0 0 10px;
}

#person .login-info .phone {
  position: relative;
  font-size: 13px;
  margin-top: 7px;
  font-weight: 300;
}
</style>