<template>
  <div ref="home" class="home">
    <div class="container" ref="main">
      <header ref="imgBox">
        <div v-if="inUlb" class="shareDiv" @click="share"><img src="../assets/guess_fenxiang.png" alt="" /></div>
        <div class="img"><img src="../assets/guess_jieguo.png" alt=""></div>
        <a v-if="mainData.isGoddess" class="goddess" @click="goddess(0)" href="javascript:void(0)"><img src="../assets/guess_jiayouka.png" alt=""></a>
        <a v-if="mainData.isEndYear" class="goddess" @click="goddess(1)" href="javascript:void(0)"><img src="../assets/icn_c_r.png" alt=""></a>
      </header>
      <main>
        <div class="guess">
          <div class="title">竞猜{{mainData.Date}}{{getMainTitle1(mainData.available, propData.leftTimes)}}</div>
          <div class="new">{{getMainTitle2(mainData.available)}}<span>{{mainData.nowPrice}}</span></div>
          <div @click="inputClick" class="input">
            <input ref="input" type="number" :disabled="mainData.disabled || !inUlb" @focus="input" v-on:blur="blurInput" v-model="mainData.haveNumber" name="" placeholder="输入您竞猜的股指数字">        </div>
          <div v-bind:class="['btn' ,isAvailable()]" @click="immediatelyQuiz"></div>
          <div class="chance clearfix">
            <div v-if="propData.userinfo.isLogin">可竞猜<span>{{propData.leftTimes}}</span>次</div>
            <div v-if="!propData.userinfo.isLogin"><span class="login_in" @click="loginIn">登录</span>资金账户即可参与</div>
            <a @click="getMoreChance" href="javascript:void(0);">获取更多竞猜机会&nbsp;<i><img src="../assets/guess_more_jcjh.png" alt=""></i></a>
            <!-- <router-link :to="{ path: '/More-chance' }" @click.native="getMoreChance">获取更多竞猜机会&nbsp;<i><img src="../assets/guess_more_jcjh.png" alt=""></i></router-link> -->
          </div>
        </div>
        <div class="ruleDiv clearfix" v-cloak>
          <router-link :to="{ path: '/Rule' }" >活动规则&nbsp;<i><img src="../assets/guess_more_jcjh.png" alt=""></i></router-link>
        </div>
      </main>
      <footer>
        <div class="guessStatu"><img src="../assets/guess_jingcaidongtai.png" alt="" /></div>
        <div class="container">
          <ul class="information">
            <li v-for="(value, index) in mainData.guessList" :key="index" class="clearfix">
              <div>{{value.account}}</div><div>竞猜{{(Math.floor(value.stockIndex / 10)/10).toFixed(1) + 'x'}}</div><div>{{getTime(value.createTime)}}</div>
            </li>
            <!--<li class="clearfix">-->
              <!--<div class="icon"><img src="../assets/ico_horn.png" alt="" /></div>-->
              <!--<div>10:35&nbsp;&nbsp;&nbsp;39****22&nbsp;&nbsp;&nbsp;竞猜3381.48</div>-->
            <!--</li> -->
          </ul>
        </div>
        <!--<div class="container second">-->
          <!--<ul class="information">-->
            <!--<li v-for="(value, index) in mainData.guessList2" :key="index" class="clearfix">-->
              <!--<div>{{value.account}}</div><div>竞猜{{(Math.floor(value.stockIndex / 10)/10).toFixed(1) + 'x'}}</div><div>{{getTime(value.createTime)}}</div>-->
            <!--</li>-->
          <!--</ul>-->
        <!--</div>-->
      </footer>
    </div>
    <div class="mask">
      <!-- 分享弹窗 -->
      <transition name="fade">
        <div v-if="mask.shareIsShow" class="mask-box share">
          <div class="container">
            <div class="title">猜股指归来</div>
            <div class="img"><img src="../assets/ico_pig.png" alt=""></div>
            <div class="des">
              <p>该活动仅支持在</p>
              <p>“兴业证券优理宝APP”参与</p>
            </div>
            <div @click="goDown" class="button">立即前往</div>
            <div @click.stop="closeMask(0)" class="close"><img src="../assets/ico_close.png" alt=""></div>
          </div>
        </div>
      </transition>
      <!-- 登录方式错误弹窗 -->
      <transition name="fade">
        <div class="changeAccount mask-box" v-if='mask.changeIsShow'>
          <div class="container ">
            <div @click.stop="closeMask(3)" class="close"></div>
            <div class="top">抱歉,请用资金账号帐号登录</div>
            <div class="bottom">
              <a @click='againLogin' href="javascript:void(0);">确定</a>
              <a @click="closeMask(3)" href="javascript:void(0);">取消</a>
            </div>
          </div>
        </div>
      </transition>
      <!-- 提示弹窗 -->
      <transition name="fade">
        <div class="changeAccount mask-box hint" v-if='mask.hintIsShow'>
          <div class="container ">
            <div @click.stop="closeMask(4)" class="close"></div>
            <div :class="['top' ,mask.hintSuccess ? 'hintImg' : '']">{{hintTxt}}<img v-if="mask.hintSuccess" src="../assets/icn_c_right.png" alt="" /></div>
            <div class="bottom">
              <a @click="closeMask(4)" href="javascript:void(0);"><img src="../assets/guess_btn_know.png" alt=""></a>
            </div>
          </div>
        </div>
      </transition>
      <!-- 双十一弹窗 -->
      <transition name="fade">
        <div class="goddess mask-box" v-if='mainData.mask.goddess'>
          <div class="container ">
            <div class="title">双十一狂欢加码专场</div>
            <div @click.stop="closeMask(5)" class="close"></div>
            <div class="img"><img src="../assets/guess_gift_img_yk.png" alt=""></div>
            <p>11月6日-11月12日期间，交易日参与<br>
              竞猜获奖客户加送100元加油卡！
            </p>
            <a @click.stop="closeMask(5)" href="javascript:void(0)"><img src="../assets/guess_btn_know.png" alt=""></a>
          </div>
        </div>
      </transition>
      <!-- 年终弹窗 -->
      <transition name="fade">
        <div class="goddess mask-box" v-if='mainData.mask.endYear'>
          <div class="container ">
            <div class="title">2018年终温馨回馈</div>
            <div @click.stop="closeMask(7)" class="close"></div>
            <div class="img"><img src="../assets/icn_c_f.png" alt=""></div>
            <p>12月20日-12月31日期间，交易日参与<br>
              竞猜获奖客户加送<span>1G流量</span>
            </p>
            <a @click.stop="closeMask(7)" href="javascript:void(0)"><img src="../assets/guess_btn_know.png" alt=""></a>
          </div>
        </div>
      </transition>

    </div>
    <!-- 加载 -->
    <Loading v-show="mask.loading"></Loading>
  </div>
</template>

<script>

import Loading from './common/Loading'

export default {
  name: "Home",
  data() {
    return {
      isWechat: false, // 是否在微信页面
      inUlb: false, // 是否在优理宝页面
      hintTxt: "1", // 提示弹窗文本
      imgHeight: 0, // 顶部图片高度
      isGo: 0, // 是否点击立即报名
      isUlb: false, // 是否在优理宝中
      isGoddess: false, // 是否是女神节
      guessOk: false, // 是否竞猜完成
      mask: {
        // 弹窗控制
        loading: false, // 加载
        shareIsShow: false, // 分享弹窗是否显示
        getChanceIsShow: false, // 获取更多机会弹窗是否显示
        ruleIsShow: false, // 规则弹窗是否显示
        changeIsShow: false, // 登录方式错误弹窗是否显示
        hintIsShow: false, // 提示弹窗是否显示
        hintSuccess: false // 提示弹框竞猜是否成功显示成功图标
      }
    };
  },
  components: { // 公共组件
    Loading
  },
  props: ['propData', 'mainData', 'againLogin'], // 接收父组件的值
  methods: {
    /**
     * 关闭弹窗
     * type 判断是哪个弹窗
     */
    closeMask: function(type) {
      var arr = ['shareIsShow', 'getChanceIsShow', 'ruleIsShow', 'changeIsShow', 'hintIsShow', 'goddess', 'notice', 'endYear']
      if (type > 4) {
        this.mainData.mask[arr[type]] = false
      } else {
        this.mask[arr[type]] = false
      }
      this.mask.hintSuccess = false
    },
    /**
     * 点击获取更多机会按钮
     */
    getMoreChance: function() {
      // alert(this.isWechat)
      if (!this.inUlb) {
        this.mask.shareIsShow = true
        return
      }
      this.$router.push({name: 'More-chance'})
      // var account = this.propData.userinfo.account;
      // 猜股指2017_主页_输入框
      // TDAPP.onEvent("猜股指2017_主页_获得更多机会", "", { acc: account });
      window.TDAPP.onEvent('ylbapp_guessindex_main_more', '', {acc: this.propData.userinfo.account, tel: this.propData.userinfo.phone})
    },
    /**
     * 是否能够竞猜
     */
    isAvailable: function() {
      // console.log(this.mainData.available, this.mainData.leftTimes)
      if (
        this.mainData.available &&
        this.propData.leftTimes > 0 &&
        this.mainData.haveNumber
      ) {
        return "btn_n";
      }
      return "btn_d";
    },
    /**
     * 将时间戳改为 时：分 格式
     */
    getTime: function(time) {
      var date = new Date(time);
      var h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var m =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      return h + m;
    },
    /**
     * 点击登录按钮
     */
    loginIn: function () {
      if (!this.inUlb) {
        this.mask.shareIsShow = true
        return
      }
      this.againLogin();
    },
    /**
     * 点击立即竞猜
     */
    immediatelyQuiz: function() {
      // alert(this.mainData.haveNumber)
      // alert(typeof this.mainData.haveNumber)
      // 立即竞猜按钮 埋点
      TDAPP.onEvent("GS2_Quiz_button_now", "", {});
      if (!this.inUlb) {
        this.mask.shareIsShow = true
        return
      }
      if (this.guessOk) return
      var account = this.propData.userinfo.account;
      // alert("account: "+account);
      // 如果未登录
      // alert(this.propData.userinfo.isLogin)
      if (!this.propData.userinfo.isLogin) {
        // alert("未登录");
        // 猜股指2017_主页_立即竞猜 失败埋点
        // TDAPP.onEvent("猜股指2017_主页_立即竞猜", "", {
        //   acc: account,
        //   status: "失败",
        //   msg: "未登录"
        // });
        this.againLogin();
        return;
      }
      // 如果按钮是灰色
      if (
        !this.mainData.available ||
        !this.propData.leftTimes ||
        !this.mainData.haveNumber
      )
      {
        return;
      }
      // 如果输入格式不正确
      var inputNum = this.mainData.haveNumber + ''
      var arr = inputNum.split('.')
      // var newStr1 = arr[0] || ''
      var newStr2 = arr[1] || ''
      if (newStr2.length > 2) {
        this.hintTxt = '最多只能输入两位小数'
        this.mask.hintIsShow = true
        this.mainData.haveNumber = ''
        return
      }
      var num = Number(this.mainData.haveNumber).toFixed(2);
      var token = this.propData.userinfo.token;
      var client = this.propData.userinfo.client;
      var opstation = this.propData.userinfo.opstation;
      this.guessOk = true
      this.mask.loading = true
      this.$ajax({
        url: "/guess",
        params: {
          account: account,
          stockIndex: num,
          Token: token,
          Client: client,
          opstation: opstation
        }
      }).then(res => {
        console.log(res.data);
        // alert(JSON.stringify(res.data))
        if (res.data.resphead.respcode === "0000") {
          this.propData.leftTimes--;
          // this.mainData.leftTimes --
          // 猜股指2017_主页_立即竞猜 成功埋点
          // TDAPP.onEvent("猜股指2017_主页_立即竞猜", "", { acc: account, status: "成功" });
          window.TDAPP.onEvent('ylbapp_guessindex_main_guess', '', {acc: this.propData.userinfo.account, tel: this.propData.userinfo.phone})
          this.hintTxt = "竞猜成功";
          this.mask.hintIsShow = true;
          this.mask.hintSuccess = true;
          this.mainData.haveNumber = "";
        } else if (res.data.resphead.respcode === "9999") {
          this.againLogin();
        }
        this.guessOk = false
        this.mask.loading = false
      }).catch((err) => {
        this.mask.loading = false
        console.log(err)
      })
    },
    /**
     * 输入框控制
     */
    input: function(e) {
      console.log(this.GLOBAL.isAndroid());
      var isAndroid = this.GLOBAL.isAndroid();
      console.log(this.$refs.imgBox.offsetHeight)
      if (isAndroid) {
        var h = this.$refs.imgBox.offsetHeight + 20;
        // this.$refs.home.scrollTo(0, h);
        setTimeout(() => {
          // alert(this.$refs.home.scroll)
          // alert(this.$refs.home.style.marginTop)
          if (this.$refs.home.scrollTo) {
            this.$refs.home.scrollTo(0, h)
          } else {
            this.$refs.main.style.top = -h + 'px'
          }
          // this.$refs.home.scrollTo(0, h) || (this.$refs.main.style.top = -h + 'px')
        }, 300)

      } else {
        var h = this.$refs.imgBox.offsetHeight - 20;
        // alert(h)
        setTimeout(function() {
          window.scrollTo(0, h);
        }, 0);
      }
      // var num = this.mainData.haveNumber + ''
      // var arr = num.split('.')
      // // var newStr1 = arr[0] || ''
      // var newStr2 = arr[1] || ''
      // // if (arr[0].length > 7) {
      // //   newStr1 = arr[0].slice(0, 7)
      // // }
      // if (arr[1] && arr[1].length > 2) {
      //   newStr2 = arr[1].slice(0, 2)
      // }
      // console.log(arr[0], newStr2)
      // this.mainData.haveNumber = parseFloat(arr[0] + '.' + newStr2)
    },
    /**
     * 输入框点击埋点
     */
    inputClick: function() {
      // 股指输入框 埋点
      TDAPP.onEvent("GS2_Stock_input_box", "", {});
      if (!this.inUlb) {
        this.mask.shareIsShow = true
      }
      if (!this.mainData.disabled) {
        // console.log(this.$refs.input)
        this.$refs.input.focus()
      }
    },
    /**
     * 光标离开输入框
     */
    blurInput: function() {
      var isAndroid = this.GLOBAL.isAndroid();
      if (isAndroid) {
        if (this.$refs.home.scrollTo) {
          this.$refs.home.scrollTo(0, 0)
        } else {
          this.$refs.main.style.top = '0px'
        }
      } else {
        setTimeout(function() {
          window.scrollTo(0, 0);
        }, 0);
      }
      // console.log(this.mainData.haveNumber)
      this.mainData.haveNumber = parseInt(parseFloat(
        (this.mainData.haveNumber + "").replace(/[^\d.]/g, "")
      ) * 100) / 100
      if (isNaN(this.mainData.haveNumber)) {
        this.mainData.haveNumber = "" || 0;
      }
      // console.log(this.mainData.haveNumber);
    },
    /**
     * 微信弹窗立即前往按钮
     */
    goDown: function() {
      // 猜股指2017_分享页_下载优理宝 埋点
      // TDAPP.onEvent("猜股指2017_分享页_下载优理宝", "", {});
      window.location.href = "http://wap.xyzq.com.cn";
    },
    /**
     * 点击立即分享按钮
     */
    share: function() {
      // console.log(navigator.uniaccount.ulbShare)
      // 如果是微信页面
      if (this.isWechat && !this.mask.shareIsShow) {
        this.mask.shareIsShow = true;
        return;
      }
      navigator.uniaccount.ulbShare(
        "【猜股指 赢好礼】",
        "https://static.xyzq.cn/activity/guess-stock3/static/images/guesss_fx_img.png",
        "参加兴业证券竞猜股指活动，每日赢取1000元加油卡！",
        "https://static.xyzq.cn/activity/guess-stock3/index.html#/"
      );
      window.TDAPP.onEvent('ylbapp_guessindex_share', '', {acc: this.propData.userinfo.account, tel: this.propData.userinfo.phone})
    },
    /**
     * 获取背景蓝色标题
     */
    getMainTitle1: function(available, leftTimes) {
      if (this.mainData.deadline) {
        return "上证收盘指数";
      }
      if (!available) {
        return "已竞猜结束";
      } else if (!leftTimes) {
        return "竞猜机会已用完";
      } else {
        return "上证收盘指数";
      }
    },
    /**
     * 获取蓝色字体标题
     */
    getMainTitle2: function(available) {
      if (this.mainData.deadline) {
        return "本活动已截止，更多活动敬请关注";
      }
      if (!available) {
        return "15:00开启次交易日竞猜，请稍后！";
      } else {
        return "最新指数：";
      }
    },
    /**
     * 点击女神节图标
     */
    goddess: function(type) {
      //三八节悬浮按钮
      TDAPP.onEvent("GS2_38_suspended_button", "", {});
      window.TDAPP.onEvent('ylbapp_guessindex_main_double11', '', {acc: this.propData.userinfo.account, tel: this.propData.userinfo.phone})
      if (type) {
        this.mainData.mask.endYear = true;
      } else {
        this.mainData.mask.goddess = true;
      }
    },
    /**
     * 点击猜模块图标
     */
    notice: function() {
      //活动预告悬浮按钮
      TDAPP.onEvent("GS2_Activity_notice_levitation_button", "", {});
      this.mainData.mask.notice = true;
    }
  },
  beforeMount: function() {
    if (window.location.href.indexOf('inUlb') > -1 || window.location.href.indexOf('inulb') > -1) {
      this.inUlb = true
      // app进入主页埋点
      window.TDAPP.onEvent('ylbapp_guessindex_menu_action', '', {acc: this.propData.userinfo.account, tel: this.propData.userinfo.phone})
    }
    // this.inUlb = Boolean(this.GLOBAL.getQueryString("inUlb"));
    if (this.GLOBAL.isWeixin()) {
      this.isWechat = true;
      this.mainData.disabled = true;
      // 微信进入主页埋点
      TDAPP.onEvent("GS2_Wechat_Enter_the_home_page", "", {});
      return;
    }
    if (this.GLOBAL.browser.versions.mobile) {
      // 判断是否是移动设备打开。browser代码在下面
      var ua = navigator.userAgent.toLowerCase(); // 获取判断用的对象
      if (
        ua.match(/MicroMessenger/i) + "" === "micromessenger" ||
        ua.match(/WeiBo/i) + "" === "weibo"
      ) {
        this.isWechat = true;
        this.mainData.disabled = true;
        // 微信进入主页埋点
        TDAPP.onEvent("GS2_Wechat_Enter_the_home_page", "", {});
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.home {
  width: 100%;
  height: 100%;
  position: relative;
  top: 0;
  -webkit-transition: top 1s; /* For Safari 3.1 to 6.0 */
  transition: top 1s;
  background: url(../assets/guess_stock_background.png) no-repeat;
  background-size: contain;
  background-color: #F57E02;
  > .container{
    position: relative;
  }
  header {
    position: relative;
    width: 100%;
    padding-top: 3.002638rem; /* 386.3 */
    z-index: 4;
    .shareDiv{
      width: 1.24305rem; /* 179 */
      height: .6666rem; /* 96 */
      position: absolute;
      right: 0;
      top: 2.607638rem; /* 346.7 */
      img{
        width: 100%;
        height: 100%;
      }
    }
    .shareHide{
      top: 0;
    }
    .img{
      position: relative;
      img{
        width: 5.19444rem; /* 748 */
        height: 1.11805rem; /* 161 */
        margin: 0 auto;
      }
    }
    .rule {
      position: absolute;
      top: 0;
      z-index: 3;
      font-family: "PingFangSC-Semibold";
      font-size: 0.277778rem; /* 40px */
      color: #fff;
      padding-top: 0.208333rem; /* 30px */
      box-sizing: border-box;
      background-size: 100% 100%;
      left: 0.194444rem; /* 28px */
      width: 2.243056rem; /* 323px */
      height: 0.888889rem; /* 128px */
      padding-left: 0.263889rem; /* 38px */
    }
    .goddess {
      position: fixed;
      bottom: 1.19444rem; /* 172 */
      right: .2083rem; /* 30 */
      width: 1.222222rem; /* 176 */
      height: 1.222222rem; /* 176 */
      z-index: 4;
    }
    .notice{
      position: fixed;
      bottom: 1.75rem; /* 252 */
      right: .305556rem; /* 44 */
      width: 1.222222rem; /* 176 */
      height: 1.222222rem; /* 176 */
      line-height: 1.222222rem; /* 176 */
      z-index: 4;
      opacity: .8;
      background-color: rgb(255, 125, 140);
      background-image: -webkit-linear-gradient(rgba(255, 125, 140, 0.41), rgba(255, 125, 140, 0.41)), -webkit-linear-gradient(-28deg, #ff79b8 0%, #ffbdd0 100%);
      background-image: -moz-linear-gradient(rgba(255, 125, 140, 0.41), rgba(255, 125, 140, 0.41)), -moz-linear-gradient(-28deg, #ff79b8 0%, #ffbdd0 100%);
      background-image: -o-linear-gradient(rgba(255, 125, 140, 0.41), rgba(255, 125, 140, 0.41)), -o-linear-gradient(-28deg, #ff79b8 0%, #ffbdd0 100%);
      background-image: linear-gradient(rgba(255, 125, 140, 0.41), rgba(255, 125, 140, 0.41)), linear-gradient(-28deg, #ff79b8 0%, #ffbdd0 100%);
      font-family: PingFangSC-Semibold;
      font-size: .333333rem; /* 48 */
      color: #fff;
      border-radius: 50%;
      text-align: center;
    }
  }
  main {
    padding: 0 0.5rem 0 0.5rem; /* 72 */
    position: relative;
    top: -.03rem;
    .guess {
      width: 100%;
      background-color: #fff;
      text-align: center;
      border-radius: 0.447222rem; /* 50px */
      position: relative;
      top: -0.173611rem; /* 25px */
      .title {
        color: #fff;
        background: url("../assets/guess_title_red.png") no-repeat;
        background-size: 100% 100%;
        height: .8333rem; /* 120px */
        line-height: .8333rem; /* 120px */
        font-family: "PingFangSC-Semibold";
        font-size: 0.34rem; /* 49px */
      }
      .new {
        padding-top: .3472rem; /* 50px */
        padding-bottom: .14583rem; /* 21 */
        line-height: 0.45138rem; /* 65px */
        font-size: 0.333333rem; /* 46px */
        font-family: "PingFangSC-Semibold";
        color: #326DAF;
        span {
          color: #EB4E40;
        }
      }
      input {
        width: 5.20138rem; /* 749 */
        height: 1.20138rem; /* 173px */
        margin: 0 auto;
        background: url("../assets/guess_bayue_kuang.png") no-repeat;
        background-size: 100% 100%;
        display: block;
        font-size: 0.416667rem; /* 60px */
        color: #EB4E40;
        font-family: "PingFangSC-Regular";
        text-align: center;
        &::-ms-input-placeholder{
          text-align: center;
          color: #999;
        }
        &::-webkit-input-placeholder{
          text-align: center;
          color: #999;
        }
        &:disabled{
          color: #6D6D6D;
        }
      }
      .btn {
        width: 3.44027rem; /* 495.4px */
        height: .8rem; /* 115.2px */
        margin: 0.2027rem auto 0; /* 29.2px */
        background-size: 100% 100%;
        line-height: .8rem; /* 115.2px */
        font-family: "PingFangSC-Semibold";
        font-size: 0.36rem; /* 51.84px */
        color: #fff;
      }
      .btn_n {
        background-image: url("../assets/guess_btn_liji.png");
      }
      .btn_d {
        background-image: url("../assets/guess_btn_ljjc_hui.png");
      }
    }
    .chance {
      font-size: 0.26rem; /* 37.44px */
      padding: .196527rem 0.4388rem; /* 28.3px 92px */
      font-family: "PingFangSC-Regular";
      position: relative;
      div {
        color: #6D6D6D;
        float: left;
        span {
          color: #EB4E40;
        }
        .login_in{
          color: #326DAF;
        }
      }
      a {
        float: right;
        color: #326DAF;
        i {
          width: 0.1388rem; /* 20px */
          height: 0.25rem; /* 36px */
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
    [v-cloak] {
      visibility: hidden;
    }
    .ruleDiv {
      float: right;
      font-family: PingFangSC-Regular;
      font-size: .26rem; /* 37.44 */
      color: #326DAF;
      a {
        float: right;
        color: #326DAF;
        i {
          width: 0.1388rem; /* 20px */
          height: 0.25rem; /* 36px */
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
  }
  footer {
    width: 100%;
    padding: 0 .5rem; /* 72px */
    margin-top: 1.1333rem; /* 163.2px */
    margin-bottom: .347222rem; /* 50 */
    box-sizing: border-box;
    .guessStatu{
      width: .9027rem; /* 130 */
      height: .9027rem; /* 130 */
      float: left;
      margin-right: .1rem; /* 14.4 */
      display: inline-block;
    }
    /*.second{*/
      /*margin-top: .1rem;*/
    /*}*/
    .container {
      height: 1.02rem; /* 57.6px */
      /*width: 5.05972rem; !* 786.2px *!*/
      overflow: hidden;
      position: relative;
      top: -.075rem;
      padding: 0 0.2rem 0 0.2rem;
      background-color: rgba(255, 255, 255, 0.4);
    }
    .information {
      transform: translateY(0);
      animation: information linear 20s infinite;
      -webkit-animation: information linear 20s infinite; /* Safari 与 Chrome */
      li {
        height: .5rem; /* 57.6px */
        line-height: 0.5rem; /* 57.6px */
        font-size: .26rem; /* 37.44 */
        font-family: "PingFangSC-Medium";
        overflow: hidden;
        border-bottom: 0.013888rem dashed #DE1200;
      }
      div{
        float: left;
        color: #DE1200;
        text-align: center;
        &:nth-of-type(1){
          width: 32%;
          text-align: left;
        }
        &:nth-of-type(2){
           width: 44%;
        }
        &:nth-of-type(3){
           width: 24%;
        }
      }
    }
    @keyframes information {
      0% {
        transform: translateY(0);
      }
      100% {
        transform: translateY(-80%);
      }
    }
  }
  .mask {
    width: 100%;
    .mask-box {
      position: absolute;
      z-index: 100;
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
      }
    }
    .changeAccount {
      > div {
        .box-mask(5.80555rem, 5.201388rem); /* 836 749 */
        background-color: #fff;
        .top {
          padding: 1.6rem 0 1.5rem; /* 65px */
          line-height: 0.395833rem; /* 57px */
          color: #ffffff;
          font-size: 0.4rem; /* 57.6px */
          text-align: center;
          img{
            width: .88889rem; /* 128px */
            height: .88889rem; /* 128px */
            margin: .27778rem auto 0 auto; /* 40px */
          }
        }
        .hintImg{
          padding: 1.4rem 0 1rem; /* 65px */
        }
        .bottom {
          a {
            float: left;
            display: block;
            text-align: center;
            font-size: 0.319444rem; /* 46px */
            height: 0.902778rem; /* 130px */
            line-height: 0.902778rem; /* 130px */
            width: 44%;
            margin: 0 3%;
            color: #666;
            background: #fff;
            border-radius: .5rem;
          }
          a:first-child {
            box-sizing: border-box;
          }
        }
      }
    }
    .hint {
      .container .bottom a {
        width: 3rem; /* 432 */
        height: .8055rem; /* 116 */
        margin: 0 auto; /* 76 */
        float: inherit;
      }
    }
    .goddess{
      .container{
        .box-mask(5.80555rem, 5.201388rem); /* 836 749 */
        p{
          text-align: center;
          padding: .267222rem 0 .194444rem; /* 50 28 */
          line-height: .465278rem; /* 67 */
          font-family: PingFangSC-Regular;
          font-size: .2925rem; /* 45 */
          color: #fff;
          span{
            font-family: PingFang-SC-Bold;
            font-size: .291667rem;
            color: #FEC12C;
          }
        }
        .img{
          width: 1.60416rem; /* 231 */
          height: 1.60416rem; /* 231 */
          margin: 0 auto;
        }
        a{
          display: block;
          width: 3rem; /* 432 */
          height: .8055rem; /* 116 */
          margin: 0 auto; /* 76 */
        }
      }
    }
  }
}

</style>
