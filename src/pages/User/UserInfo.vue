<template>
<Frame title="个人资料">
  <form class="mui-input-group userinfo-form">
      
      <div class="mui-input-row">
          <label>QQ</label>
      <input type="text" v-model="qq" class="mui-input-clear" disabled>
      </div>
      <div class="mui-input-row">
          <label>邮箱</label>
      <input type="text" v-model="email" class="mui-input-clear">
      </div>
      <div class="mui-input-row">
          <label>手机号</label>
      <input type="text" v-model="mobile" class="mui-input-clear">
      </div>
      <div class="mui-input-row">
          <label>注册时间</label>
      <input type="text" v-model="reg_time" class="mui-input-clear" disabled>
      </div>
      
      <br/>
      <div class="mui-button-row">
        <button type="button" class="mui-btn mui-btn-danger btn-block" @click="save">保存资料</button>
      </div>
      <br/>
      <div v-if="IS_APP">
      <hr>
      <br/>
      <div class="mui-button-row">
        <button type="button" class="mui-btn mui-btn-primary btn-block" @click="bindOpenId">绑定QQ快捷登录</button>
      </div>
      </div>
  </form>
  
</Frame>
</template>
<script>
import $ from 'axios';
import {user as USER_API} from '@/config/serverApi';
import Frame from '@/components/Frame.vue';
export default {
  components: {
    Frame
  },
  data() {
    return {
      qq: '',
      email: '',
      mobile: '',
      reg_time: ''
    };
  },
  methods: {
    save() {
      const {qq, email, mobile} = this;
      $.post(USER_API.updateUserInfo, {
        qq,
        email,
        mobile
      })
      .then(({data}) => {
        this.$loading.hide();
        this.$tip.show(data.msg);
      })
      .catch(err => {
        this.$loading.hide();
        this.$tip.show('网络连接失败！');
      })
    },
    bindOpenId() {
      window.zanhuang.getOpenId();
    }
  },
  mounted() {
    window.afterGetOpenId = data => {
      var open_id = data.openid;
      if (!open_id) {
        this.$tip.show('绑定失败，请稍后重试！');
        return false;
      }
      // 进行绑定
      this.$loading.show('正在进行绑定中...');
      $.post(USER_API.bindOpenId, {open_id})
      .then(({data}) => {
        this.$loading.hide();
        this.$tip.show(data.msg);
      })
      .catch(err => {
        console.log(err);
        this.$loading.hide();
        this.$tip.show('网络连接失败！');
      });
    };

    this.$loading.show('获取用户数据中...');
    $.get(USER_API.getUserInfo)
      .then(({data}) => {
        this.$loading.hide();
        ['qq', 'email', 'mobile', 'reg_time'].forEach(r => {
          this[r] = data[r];
        });
      })
      .catch(err => {
        this.$loading.hide();
        this.$tip.show('网络连接失败！');
      });
  }
}
</script>
<style>
.userinfo-form {
  padding: 10px;
}
</style>