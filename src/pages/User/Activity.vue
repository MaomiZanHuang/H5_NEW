<template>
<Frame title="推广赚取积分">
<div class="mui-content promotion">
  <ul class="mui-table-view mui-table-view-chevron" v-if="IS_APP">
     <li class="mui-table-view-cell">
      <a href="#">
      1.分享软件赚取积分
      </a>
      <div class="mui-collapse-content">
        分享本软件至QQ群/QQ空间，即可获得积分，每日最多分享2次，无效分享积分可能会被收回！
        <br/>
        <button class="mui-btn mui-btn-primary btn-block" @click="app_share">分享到QQ/QQ群</button>
        <br/>
        <br/>
        <button class="mui-btn mui-btn-warning btn-block" @click="app_share2">分享到QQ空间</button>
      </div> 
    </li>
    <li class="mui-table-view-cell">
      <a href="#">
      2.邀请赚积分
      </a>
      <div class="mui-collapse-content">
        您的推广链接: <input class="mui-input-group input btn-block" :value="referral"> <br/>
        发送推广链接到QQ群/微信，通过您的邀请链接注册的用户(按IP计)将获得1积分!
        <textarea rows="4" ref="copyEl">#拇指赞,免费刷,畅快玩！#我正在使用拇指赞，不仅仅是刷赞，还有超多好玩的东西唷，快来一起玩吧！戳我{{referral}}</textarea>
        <br/>
        <button class="mui-btn mui-btn-danger btn-block" @click="copy">一键复制</button>
      </div> 
    </li>
  </ul>
  <ul class="mui-table-view mui-table-view-chevron" v-else>
    <li class="mui-table-view-cell">
      <a href="#">
      1.分享软件赚取积分
      </a>
      <div class="mui-collapse-content">
        分享本软件至QQ/微信/微博/贴吧，截图联系客服，最多可赚取200积分。
        <button class="mui-btn mui-btn-danger" v-if="IS_APP">立即分享</button>
        <div class="bdsharebuttonbox" data-tag="share_1" v-else>
          <a class="bds_sqq" data-cmd="sqq" href="#"></a>
          <a class="bds_qzone" data-cmd="qzone" href="#"></a>
          <a class="bds_weixin" data-cmd="weixin" href="#"></a>
          <a class="bds_tsina" data-cmd="tsina"></a>
          <a class="bds_tieba" data-cmd="tieba"></a>
          <a class="bds_baidu" data-cmd="baidu"></a>
          <a class="bds_more" data-cmd="more">更多</a>
          <!--<a class="bds_count" data-cmd="count"></a>-->
        </div>
      </div> 
    </li>
    <li class="mui-table-view-cell">
      <a href="#">
      2.邀请赚积分
      </a>
      <div class="mui-collapse-content">
        您的推广链接: <input class="mui-input-group input btn-block" :value="referral"> <br/>
        发送推广链接到QQ群/微信，通过您的邀请链接注册的用户(按IP计)将获得1积分!
        <textarea rows="4" ref="copyEl">#拇指赞,免费刷,畅快玩！#我正在使用拇指赞，不仅仅是刷赞，还有超多好玩的东西唷，快来一起玩吧！戳我{{referral}}</textarea>
        <br/>
        <button class="mui-btn mui-btn-danger btn-block" @click="copy">一键复制</button>
      </div> 
    </li>
  </ul>
</div>
</Frame>
</template>
<script>
import $ from 'axios';
import {user as USER_API} from '@/config/serverApi';
import {mapState} from 'vuex';
import Frame from '@/components/Frame.vue';
export default {
  components: {
    Frame
  },
  data() {
    const {APP_SITE} = this;
    var user = '';
    try {
      user = JSON.parse(localStorage['user']).user || '';
    } catch(err) {}
    return {
      referral: APP_SITE + '/#user/reg?inviter=' + encodeURI(user)
    };
  },
  computed: {
    ...mapState(['user'])
  },
  created() {
    const {APP_LOGO, APP_NAME, APP_SITE} = this;
    window._bd_share_config = {
      common : {
        bdText : `${APP_NAME}，免费刷,畅快玩！不仅仅是刷赞，还有更多好玩的东西哦~~`,	
        bdDesc : `${APP_NAME}，免费刷,畅快玩！不仅仅是刷赞，还有更多好玩的东西哦~~`,	
        bdUrl : APP_SITE, 	
        bdPic : APP_LOGO
      },
      share : [{
        "bdSize" : 32
      }],
      image : [{
        viewType : 'list',
        viewPos : 'top',
        viewColor : 'black',
        viewSize : '32',
        viewList : ['qzone','tsina','huaban','tqq','renren']
      }]
    }
    var script = document.createElement('script');
    script.src='//bdimg.share.baidu.com/static/api/js/share.js?cdnversion='+~(-new Date()/36e5)
    document.head.appendChild(script);
  },
  methods: {
    afterShare() {
      $.get(USER_API.share)
        .then(({data}) => {
          this.$tip.show(data.msg);
          if (data.status) {
            this.$store.commit('setUserPoints', data.points);
          }
          setTimeout(() => {
              window.zanhuang&&window.zanhuang.showAd("GOOGLE", 1, "telanx");
            }, 2500);
        })
        .catch(err => {
          this.$tip.show('网络连接失败！');
          setTimeout(() => {
              window.zanhuang&&window.zanhuang.showAd("GOOGLE", 1, "telanx");
            }, 2500);
        }) 
    },
    copy() {
      try {
        this.$refs.copyEl.select();
        this.$refs.copyEl.focus();
        document.execCommand('copy', false, null);
        this.$tip.show('已复制!');
        this.$refs.copyEl.blur();
      } catch(err) {
        this.$tip.show('复制失败，您可以手动选中复制！');
        console.log(err);
      }
    },
    app_share() {
      const {APP_NAME, APP_LOGO, APP_SITE} = this;
      window.zanhuang.jsAndroid(JSON.stringify({
        type: '分享',
        channel: 'QQ',
        title:`『${APP_NAME}』免费刷，畅快玩！`,
        content:`免费刷，不仅仅是刷赞，还有更多好玩的东西哦~~`,
        picUrl: 'http:' + APP_LOGO.replace(/^http\:/, ''),
        url: APP_SITE,
      }));
    },
    app_share2() {
      const {APP_NAME, APP_LOGO, APP_SITE} = this;
      window.zanhuang.jsAndroid(JSON.stringify({
        type: '分享',
        channel: 'QZONE',
        title:`『${APP_NAME}』免费刷，畅快玩！`,
        content:`免费刷，不仅仅是刷赞，还有更多好玩的东西哦~~`,
        picUrl: 'http:' + APP_LOGO.replace(/^http\:/, ''),
        url: APP_SITE,
      }));
    },
    app_adv(type) {
      const {user} = this.user;
      window.zanhuang.jsAndroid(JSON.stringify({
        type: '赚积分',
        user: user,
        item: type,
      }));
    }
  },
  mounted() {
    window.afterShare = this.afterShare; 
  }
}
</script>
<style>
.promotion .mui-collapse-content {
  margin-top: 10px;
  color: #aaa;
  line-height: 0.5rem;
}
.promotion li {
  padding-right: 15px !important;
}
</style>