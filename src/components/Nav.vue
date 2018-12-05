<template>
  <div id="navController">
    <!-- <div v-for="(value, index) in navController" :key="index">{{value.msg}}</div> -->
    <ul>
      <li v-for='(value, index) in navController' :key="index" v-bind:class="{active: navController[index].isActive}">
        <!-- <router-link v-bind:to="value.link">{{value.msg}}</router-link><i v-if="value.haveLine"></i> -->
        <a v-on:click="switchTab(index, value.link)" href="javascript:void(0)">{{value.msg}}</a><i v-if="value.haveLine"></i>
      </li>
      <!-- <li class="active"><router-link to="/">活动首页</router-link><i></i></li> -->
    </ul>
    <div v-if="isUpdate" class="update">已更新</div>
    <div class="mask">
      <!-- 分享弹窗 -->
      <transition name="fade">
        <div v-if="mask.shareIsShow" class="mask-box share">
          <div class="container">
            <div @click.stop="mask.shareIsShow = false" class="close"></div>
            <div class="title">猜股指归来</div>
            <div class="img"><img src="../assets/ico_pig.png" alt=""></div>
            <div class="des">
              <p>该活动仅支持在</p>
              <p>“兴业证券优理宝APP”参与</p>
            </div>
            <a href="http://wap.xyzq.com.cn" class="button">立即前往</a>
            <div @click.stop="mask.shareIsShow = false" class="close"><img src="../assets/ico_close.png" alt=""></div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>


<script>
export default{
  name: 'navController',
  data () {
    return {
      navController: [ // 导航栏控制器
        // {
        //   isActive: 1, // 是否处于选中状态
        //   link: '/', // 路由地址
        //   msg: '活动首页', // 导航title
        //   haveLine: 1 // 是否有右边的竖线
        // },
        {
          isActive: 0,
          link: '/Winner-list',
          msg: '中奖人名单',
          haveLine: 1
        },
        {
          isActive: 0,
          link: '/My-quiz',
          msg: '我的竞猜',
          haveLine: 0
        }
      ],
      mask:{
        shareIsShow: false
      }
    }
  },
  props: ['propData', 'isUpdate'], // 接收父组件的值
  methods: {
    /**
     * 点击导航栏改变样式
     */
    switchTab: function (index, link) {
      // console.log(link)
      for (var i = 0; i < 2; i++) {
        this.navController[i].isActive = 0
      }
      this.navController[index].isActive = 1
      // if (index === 0) {
        // 猜股指2017_主页_首页menu
        // TDAPP.onEvent('猜股指2017_主页_首页menu','',{})
      // } else
      if (index === 0) {
        // 猜股指2017_主页_中奖menu
        // TDAPP.onEvent('猜股指2017_主页_中奖menu','',{})
        window.TDAPP.onEvent('ylbapp_guessindex_menu_list', '', {acc: this.propData.userinfo.account, tel: this.propData.userinfo.phone})
        this.$parent.isUpdate = 0
        // console.log(this.$parent.isUpdate)
        window.localStorage.setItem('guess-stock2-isClick', 1)
      } else if (index === 1) {
        // 猜股指2017_主页_我的竞猜menu
        // TDAPP.onEvent('猜股指2017_主页_我的竞猜menu','',{})
        window.TDAPP.onEvent('ylbapp_guessindex_menu_fund', '', {acc: this.propData.userinfo.account, tel: this.propData.userinfo.phone})
      }
      if (!(window.location.href.indexOf('inUlb') > -1 || window.location.href.indexOf('inulb') > -1) && index) {
        this.mask.shareIsShow = true
        return
      }
      this.$router.push({path: link})
      console.log(this.$parent)
    },
    /**
     * 防止页面刷新时导航栏样式出错
     */
    keepStyle: function () {
      var url = window.location.href
      var arr = url.split('#/')
      var index = 0
      if (arr[1] === '') {
        index = 0
      } else if (arr[1] === 'Winner-list') {
        index = 1
      } else if (arr[1] === 'My-quiz') {
        index = 2
      }
      this.switchTab(index)
    }
  },
  beforeMount: function () {

  }
}
</script>

<style lang="less" scoped>
#navController{
  position: absolute;
  z-index: 5;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.98611rem; /* 137px */
  background-image: url("../assets/guess_tab.png");
  background-size: 100% 100%;
  li{
    float: left;
    width: 50%;
    text-align: center;
    position: relative;
    i{
      content: '';
      position: absolute;
      right: 0;
      top: 0.222222rem; /* 32px */
      height: 0.5rem; /* 72px */
      border-right: .020833rem solid #fff; /* 3 */
      margin-right: -1.5px;
    }
    a{
      color: #fff;
      font-size: 0.347222rem; /* 50px */
      font-family: "PingFangSC-Semibold";
      display: block;
      height: 0.951389rem; /* 137px */
      line-height: 0.951389rem; /* 137px */
    }
  }
  .update{
    position: absolute;
    background-color: #F3482C;
    color: #fff;
    display: block;
    font-size: .180556rem; /* 26 */
    height: .263889rem; /* 38 */
    line-height: .263889rem; /* 38 */
    border-radius: .131944rem; /* 19 */
    padding: 0 .041667rem; /* 6 */
    top: 0;
    left: 0;
    margin-left: .277778rem; /* 40 */
  }
  .mask {
    width: 100%;
    .mask-box {
      position: fixed;
      z-index: 6;
      width: 100%;
      height: 100%;
      top: 0;
      background-color: rgba(0, 0, 0, 0.7);
      .container {
        position: relative;
        font-size: "PingFangSC-Semibold";
        background: url("../assets/guess_tc_background.png");
        background-size: 100% 100%;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        overflow: hidden;
        .title {
          height: 1.083333rem; /* 156 */
          line-height: 1.083333rem; /* 156 */
          font-size: 0.402778rem; /* 58 */
          text-align: center;
          color: #fff;
        }
        .button {
          text-align: center;
          font-size: 0.402778rem; /* 58 */
          color: #fff;
          background-image: url("../assets/btn_confirm_n.png");
          background-size: contain;
          width: 4.625rem; /* 666 */
          height: 0.784722rem; /* 113 */
          line-height: 0.784722rem; /* 113 */
          margin: 0.222222rem auto 0; /* 32 */
        }
        .close {
          width: 0.368056rem; /* 53 */
          height: 0.361111rem; /* 52 */
          position: absolute;
          top: 0; /* 50 */
          right: 0; /* 50 */
          padding: 0.177222rem;
        }
      }
    }
    .box-mask(@maskW, @maskH) {
      width: @maskW;
      height: @maskH;
    }
    .share {
      .container {
        .box-mask(5.80555rem, 5.201388rem); /* 836 749 */
        .img {
          width: 1.7125rem; /* 405 */
          height: 1.631944rem; /* 379 */
          margin: 0 auto .166667rem; /* 24 */
        }
        .des {
          line-height: 0.416667rem; /* 60 */
          text-align: center;
          color: #434343;
          font-size: 0.333333rem; /* 48 */
        }
        .button{
          display: block;
        }
      }
    }
  }
}
</style>
