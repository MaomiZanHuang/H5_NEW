<template>
<!--底部导航栏-->
  <nav class="mui-bar mui-bar-tab">
    <router-link to="/" class="mui-tab-item" :class="currentMenu === '/' && 'mui-active'">
      <span class="mui-icon mui-icon-home"></span>
      <span class="mui-tab-label">首页</span>
    </router-link>
    <router-link to="/square" class="mui-tab-item" :class="currentMenu === '/square' && 'mui-active'">
      <span class="mui-icon iconfont icon-faxian"></span>
      <span class="mui-tab-label">发现</span>
    </router-link>
    <router-link to="/order" class="mui-tab-item" :class="currentMenu === '/order' && 'mui-active'">
      <span class="mui-icon iconfont icon-order"></span>
      <span class="mui-tab-label">订单</span>
    </router-link>
    <router-link to="/user/index" class="mui-tab-item" :class="currentMenu === '/user/index' && 'mui-active'">
      <span class="mui-icon mui-icon-person"></span>
      <span class="mui-tab-label">我的</span>
    </router-link>
  </nav>
<!--底部导航栏结束-->
</template>
<script>
import {mapState} from 'vuex';

export default {
  computed: {
    ...mapState(['currentMenu'])
  },
  mounted() {
    window.vue = this;
  }
}
</script>
<style>
</style>