<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="child-view" :propData="propData" :iphoneData="iphoneData" :youkuData="youkuData" :mainData="mainData" :againLogin="againLogin" @transferUser="getChild"></router-view>
    </transition>
    <NavController :propData="propData" :isUpdate="isUpdate" v-show="mask.navTab"></NavController>
    <!-- 加载 -->
    <Loading v-show="mask.loading"></Loading>
  </div>
</template>

<script>
import NavController from './components/Nav.vue'
import Loading from './components/common/Loading'

export default {
  name: 'app',
  data () {
    return {
      transitionName: 'slide-left',
      ajaxTime: 0, // 请求ajax次数
      source: null, // axios阻止ajax请求方法
      isUpdate: 0, // 中奖人名单是否已更新
      shareData: { // 分享
        title: '【猜股指 赢好礼】', // 标题
        desc: '参加兴业证券竞猜股指活动，每日赢取1000元加油卡！', // 描述
        url: 'https://static.xyzq.cn/activity/guess-stock3/index.html#/', // 地址
        imgUrl: 'https://static.xyzq.cn/activity/guess-stock3/static/images/guesss_fx_img.png', // 图标地址
      },
      propData: { // 传值给子组件
        leftTimes: '', // 剩余次数
        userinfo: { // 用户信息
          // isLogin: true, // 是否登录
          // account: '450045173', // 资金帐号
          // token: 'ceshi',
          // client: 'ceshi',
          // opstation: 'ceshi'
          isLogin: false, // 是否登录
          account: '', // 资金帐号
          token: '',
          client: '',
          opstation: ''
        }
      },
      mainData: {
        // 主体数据
        // leftTimes: 0, // 当前剩余次数
        isMargin: 0, //0是没开通 1是已开通 是否开通了两融账户
        isApply: 0, // 0是资产小于1000 1是资产大于等于1000
        Date: "11月02日", // 当前竞猜日期
        available: 1, // 当前是否能够竞猜
        nowPrice: 0, // 最新指数
        deadline: 0, // 活动是否已结束
        myStockIndex: "", // 我的最近一次竞猜指数
        haveNumber: "", // 是否填入竞猜股指数字
        disabled: false, // 控制input是否可输入
        isGoddess: false, // 是否是 双11
        isEndYear: false, // 是否是 年终
        mask: { // 弹窗控制
          goddess: false, // 双十一弹窗是否显示
          endYear: false, // 年终弹窗是否显示
          notice: false // 活动预告弹窗是否显示
        },
        guessList: [
          // 滚动列表
          {
            id: "1000001464854966", // 编号
            account: "1****8", // 资金账号
            stockIndex: 339533, // 竞猜指数
            createTime: 1509515194000 // 竞猜时间
          },
          {
            id: "1000001464854966", // 编号
            account: "1****8", // 资金账号
            stockIndex: 339533, // 竞猜指数
            createTime: 1509515194000 // 竞猜时间
          },
          {
            id: "1000001464854966", // 编号
            account: "1****8", // 资金账号
            stockIndex: 339533, // 竞猜指数
            createTime: 1509515194000 // 竞猜时间
          },
          {
            id: "1000001464854966", // 编号
            account: "1****8", // 资金账号
            stockIndex: 339533, // 竞猜指数
            createTime: 1509515194000 // 竞猜时间
          },
          {
            id: "1000001464854966", // 编号
            account: "1****8", // 资金账号
            stockIndex: 339533, // 竞猜指数
            createTime: 1509515194000 // 竞猜时间
          },
          {
            id: "1000001464854966", // 编号
            account: "1****8", // 资金账号
            stockIndex: 339533, // 竞猜指数
            createTime: 1509515194000 // 竞猜时间
          },
          {
            id: "1000001464854966", // 编号
            account: "1****8", // 资金账号
            stockIndex: 339533, // 竞猜指数
            createTime: 1509515194000 // 竞猜时间
          },
          {
            id: "1000001464854966", // 编号
            account: "1****8", // 资金账号
            stockIndex: 339533, // 竞猜指数
            createTime: 1509515194000 // 竞猜时间
          },
          {
            id: "1000001464854966", // 编号
            account: "1****8", // 资金账号
            stockIndex: 339533, // 竞猜指数
            createTime: 1509515194000 // 竞猜时间
          },
          {
            id: "1000001464854966", // 编号
            account: "1****8", // 资金账号
            stockIndex: 339533, // 竞猜指数
            createTime: 1509515194000 // 竞猜时间
          }
        ]
      },
      iphoneData: [ // iPhone中奖名单
        // {
        //   id: '1000001522285605', // 编号
        //   account: '1****8', // 资金账号
        //   stockIndex: 333333, // 竞猜股指
        //   dif: null, // 无关
        //   isWinning: 2, // 是否中奖(0-待公布;1-未中奖;2-优酷年卡;3-iPhone X)
        //   createTime: 1509505359000, // 竞猜时间
        //   targetTime: null
        // }
      ],
      youkuData: [ // 优酷月卡中奖名单
        // {
        //   id: '1000001522285605', // 编号
        //   account: '1****8', // 资金账号
        //   stockIndex: 333333, // 竞猜股指
        //   dif: null, // 无关
        //   isWinning: 2, // 是否中奖(0-待公布;1-未中奖;2-优酷年卡;3-iPhone X)
        //   createTime: 1509505359000, // 竞猜时间
        //   targetTime: null
        // }
      ],
      mask: { // 弹窗控制
        loading: false, // 加载
        navTab: true // 切换栏
      },
      childData: {} // 接收子组件的值
    }
  },
  components: { // 公共组件
    NavController,
    Loading
  },
  watch: {
    '$route' (to, from) { // 切换路由时，前进后退使用不同动画
      const toDepth = this.getLength(to.path)
      const fromDepth = this.getLength(from.path)
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      this.getUrl()
    },
    'propData.userinfo.isLogin': function (to, from) {
      // console.log(to, from)
      this.setData()
    }
  },
  methods: {
    /**
     * 接收子组件传值
     */
    getChild: function (msg) {
      this.childData = msg
      this.propData.account = msg.account
      this.propData.token = msg.token
      this.propData.client = msg.client
    },
    /**
     * 剔除空项获取路由长度
     */
    getLength: function (str) {
      var arr = str.split('/')
      for (let i = 0; i < arr.length; i++) {
        const el = arr[i]
        if (el === '') {
          arr.splice(i, 1)
          i--
        }
      }
      return arr.length
    },
    /**
     * 判断是非为首页
     */
    getUrl: function () {
      var url = this.$route.path
      if (url === "/" ) {
        this.mask.navTab = true
      } else {
        this.mask.navTab = false
      }

    },
    /**
     * cordova加载
     */
    cordovaLoad: function (callback) {
      // console.log(this.mask)
      /**
       * 获取opstation
       * Y_(A安卓|I苹果)_(手机号)_(安卓imei | 苹果UUID)_(安卓mac(若无也为空)|苹果空)_优理宝内部版本号_优理宝外部版本号
       * _客户ip_服务器标识_服务器端口
       * @returns {String}
       */
      navigator.uniaccount.getAppInfo((data) => {
        // alert('1' + JSON.stringify(data))
        let opStation = '';
        if (data) {
          let device = this.GLOBAL.isAndroid() ? 'AH' : 'IH';
          let { activiedMobile, imei, mac, appVersion, appVersionCode } = data;
          if (device === 'AH') {
            opStation = `Y_${device}_${activiedMobile}_${imei}_${mac}_${appVersionCode}_${appVersion}`;
          } else {
            opStation = `Y_${device}_${activiedMobile}_${mac}__${appVersionCode}_${appVersion}`;
          }
        }
        this.propData.userinfo.opstation = opStation
         // alert(opStation)
      })
      // 获取登录信息
      var that = this
      navigator.uniaccount.ulbAccLogin(function (data) {
        var response = data
        if (typeof data === 'string') {
          response = JSON.parse(response)
        }
        // alert(JSON.stringify(response))
        // 如果登录方式为兴证通方式则返回
        // alert(response.respBody.userinfo.accountType)
        if (response.respBody.userinfo.accountType !== '2') {
          // that.openMask(2)
          return
        }
        var client = response.respBody.userinfo.clientId;
        var token = response.respBody.logintoken;
        var account = response.respBody.userinfo.fundAccount;
        that.propData.userinfo.account = account
        that.propData.userinfo.client = client
        that.propData.userinfo.token = token
        that.propData.userinfo.isLogin = true
        if (callback) callback()
        // alert('phone: ' + phone + '--xuid: ' + xuid)
      }, function (data) {
        alert('未登录')
      }, {reloginflag: '2', accounttype: '2'})
    },
    /**
     * 重新登录方法
     */
    againLogin: function (success) {
      var that = this
      navigator.uniaccount.ulbAccLogin(function (data) {
        var response = data
        if (typeof data === 'string') {
          response = JSON.parse(response)
        }
        // 如果登录方式为兴证通方式则返回
        if (response.respBody.userinfo.accountType !== '2') {
          // that.openMask(2)
          return
        }
        // that.closeMask(2)
        var client = response.respBody.userinfo.clientId;
        var token = response.respBody.logintoken;
        var account = response.respBody.userinfo.fundAccount;
        that.propData.userinfo.account = account
        that.propData.userinfo.client = client
        that.propData.userinfo.token = token
        that.propData.userinfo.isLogin = true
        // that.setData(1)
        if (success) success()
      }, function (data) {
        alert('登录失败')
      }, {reloginflag: '1', accounttype: '2'})
    },
    /**
     * 点击分享按钮
     */
    share: function () {
      navigator.uniaccount.ulbShare('【猜股指 赢好礼】', 'https://static.xyzq.cn/activity/guess-stock3/static/images/guesss_fx_img.png', '参加兴业证券竞猜股指活动，每日赢取1000元加油卡！', 'https://static.xyzq.cn/activity/guess-stock/index.html#/')
    },
    /**
     * ajax获取活动首页数据
     */
    setData: function() {
      // 节流
      if (this.ajaxTime) this.source.cancel('取消第一次ajax请求')
      this.ajaxTime++
      this.source = this.$ajax.CancelToken.source()

      var account = this.propData.userinfo.account;
      var token = this.propData.userinfo.token;
      var client = this.propData.userinfo.client;
      var opstation = this.propData.userinfo.opstation;
      this.mask.loading = true
      this.$ajax({
        url: "/index",
        params: {
          account: account,
          Token: token,
          Client: client,
          opstation: opstation
        },
        cancelToken: this.source.token
        // headers: { 'X-Token': token, 'X-Client': client }
      })
      .then((res) => {
        if (res.data) {
          var Data = res.data.respbody;
          console.log(Data);
          // alert(JSON.stringify(Data))
          // 添加数据
          this.mainData.Date = Data.Date;
          this.mainData.isApply = Data.isApply;
          this.mainData.available = Data.available;
          this.mainData.isMargin = Data.isMargin;
          this.mainData.myStockIndex = Data.myStockIndex;
          // console.log(Data.Date)
          // console.log(window.localStorage.getItem("guess-stock-Date"))
          if (!window.localStorage.getItem("guess-stock-Date")) {
            window.localStorage.setItem(
              "guess-stock-Date",
              Data.Date
            )
          } else {
            if (Data.Date !== window.localStorage.getItem("guess-stock-Date")) {
              window.localStorage.removeItem("guess-stock-Goddess")
            }
          }
          if (parseInt(Data.Date.substr(0, 2)) == 11 && parseInt(Data.Date.substr(3, 2)) <= 12 && parseInt(Data.Date.substr(3, 2)) >= 5) { // 如果在 11月5号至11月12号
          // if (parseInt(Data.Date.substr(0, 2)) == 9 && parseInt(Data.Date.substr(3, 2)) <= 30 && parseInt(Data.Date.substr(3, 2)) >= 5) { // 如果在 11月5号至11月12号
            this.mainData.isGoddess = true
            if (!window.localStorage.getItem("guess-stock-Goddess")) {
              window.localStorage.setItem(
                "guess-stock-Goddess",
                1
              )
              window.localStorage.setItem(
                "guess-stock-Date",
                Data.Date
              )
              this.mainData.mask.goddess = true
            }
          } else if (parseInt(Data.Date.substr(0, 2)) == 12 && parseInt(Data.Date.substr(3, 2)) <= 31 && parseInt(Data.Date.substr(3, 2)) >= 20)  { // 如果在 12月20日 - 12月31日
          // } else if (parseInt(Data.Date.substr(0, 2)) == 9 && parseInt(Data.Date.substr(3, 2)) <= 30 && parseInt(Data.Date.substr(3, 2)) >= 5) { // 如果在 11月5号至11月12号
            this.mainData.isEndYear = true
            if (!window.localStorage.getItem("guess-stock-Goddess")) {
              window.localStorage.setItem(
                "guess-stock-Goddess",
                1
              )
              window.localStorage.setItem(
                "guess-stock-Date",
                Data.Date
              )
              this.mainData.mask.endYear = true
            }
          }
          if (isNaN((parseFloat(Data.nowPrice) / 100).toFixed(2))) {
            this.mainData.nowPrice = "";
          } else {
            this.mainData.nowPrice =
              (parseFloat(Data.nowPrice) / 100).toFixed(2) || "";
          }
          // this.mainData.nowPrice = (parseFloat(Data.nowPrice) / 100).toFixed(2) || ''
          this.propData.leftTimes = Data.leftTimes > 0 ? Data.leftTimes : 0;
          if ((!this.mainData.available || this.propData.leftTimes === 0) && !isNaN(this.mainData.myStockIndex)) {
            this.mainData.haveNumber = parseFloat((
              parseFloat(this.mainData.myStockIndex) / 100
            ).toFixed(2));
            // alert(this.mainData.haveNumber)
            // alert(typeof this.mainData.haveNumber)
            this.mainData.disabled = true;
          } else {
            this.mainData.haveNumber = "";
            this.mainData.disabled = false;
          }
          // if (!this.mainData.available) this.mainData.disabled = true
          var guessList = Data.guessList;
          var listData = [];
          // var listData2 = [];
          if (guessList.length === 0) {
            guessList = [
              {
                id: "暂无", // 编号
                account: "暂无", // 资金账号
                stockIndex: 0, // 竞猜指数
                createTime: 1509300000000 // 竞猜时间
              },
              {
                id: "暂无", // 编号
                account: "暂无", // 资金账号
                stockIndex: 0, // 竞猜指数
                createTime: 1509300000000 // 竞猜时间
              }
            ];
          }
          // else if (guessList.length === 1) {
          //   guessList[1] = {
          //     id: "暂无", // 编号
          //     account: "暂无", // 资金账号
          //     stockIndex: 0, // 竞猜指数
          //     createTime: 1509300000000 // 竞猜时间
          //   }
          // }
          var j = 0;
          for (var i = 0; i < 10; i++) {
            if (i < guessList.length) {
              listData.push(guessList[i]);
            } else {
              listData.push(guessList[j]);
              j++;
              if (j >= guessList.length) {
                j = 0;
              }
            }
          }
          // 第二列数据
          // var m = 1;
          // for (var n = 1; n < 20; n=n+2) {
          //   if (n < guessList.length) {
          //     listData2.push(guessList[n]);
          //   } else {
          //     listData2.push(guessList[m]);
          //     m = m+2;
          //     if (m >= guessList.length) {
          //       m = 1;
          //     }
          //   }
          // }
          // alert(JSON.stringify(listData))
          this.mainData.guessList = listData;
          // this.mainData.guessList2 = listData2;
          console.log(listData)
          var isUpdate = Data.isUpdate
          if (isUpdate === 0) {
            window.localStorage.removeItem('guess-stock2-isClick')
          }
          window.localStorage.setItem('guess-stock2-isUpdate', isUpdate)
          this.isLeftOk = true;
          // console.log(Data.deadline);
          if (Data.deadline) {
            this.mainData.disabled = true;
            // this.mainData.Date = ''
            this.mainData.nowPrice = "";
            this.mainData.deadline = 1;
          } else {
            // console.log("能猜");
          }
          //this.mainData.Date<="03月08日" 每天第一次打开 this.mask.goddess = true
        }
        this.mask.loading = false
      })
      .catch((err) => {
        this.mask.loading = false
        // alert(JSON.stringify(err))
        console.log(err);
      });
    },
    /**
     * ajax获取中奖人名单数据
     */
    setData2: function () {
      this.$ajax({
        url: '/winner'
      })
      .then((res) => {
        if (res.data.respbody) {
          var Data = res.data.respbody
          console.log(Data)
          // 初始化数据
          this.youkuData = []
          this.iphoneData = []
          for (var i = 0; i < Data.length; i++) {
            var el = Data[i]
            if (el.isWinning === 2) {
              this.youkuData.push(el)
            } else if (el.isWinning === 3) {
              this.iphoneData.push(el)
            }
          }
        }
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    /**
     * 设置微信分享
     */
    setWeixinShare: function () {
      var SHARE_TITLE = this.shareData.title
      var SHARE_DESC = this.shareData.desc
      var SHARE_URL = this.shareData.url // 必须是对的地址
      var SHARE_IMG = this.shareData.imgUrl

      var appid = ''
      var timestamp = ''
      var noncestr = ''
      var signature = ''
      var currentDomain = window.location.href.split(/\?|\#/)
      history.replaceState('', document.title, (currentDomain[0] + '#' + currentDomain[2]))

      this.$ajax({
        url: 'https://wechat.xyzq.cn/wechatbiz/accountApi?act=getJsapiInfo',
        params: {'url': SHARE_URL}, // 微信直接分享地址会变
        responseType: 'json'
      })
      .then((res) => {
        var data = res.data
        // alert(JSON.stringify(data))
        if (data.code == 0) {
          appid = 'wx513461a9e5de5010'
          timestamp = data.timestamp
          noncestr = data.noncestr
          signature = data.signature
          console.log('appid: %s', appid)
          console.log('timestamp: %s', timestamp)
          console.log('noncestr: %s', noncestr)
          console.log('signature: %s', signature)

          wx.config({
            debug: false,
            appId: appid,
            timestamp: timestamp,
            nonceStr: noncestr,
            signature: signature,
            jsApiList: [
              // 所有要调用的 API 都要加到这个列表中
              'onMenuShareTimeline',
              'onMenuShareAppMessage'
            ]
          })
        }
      })

      wx.ready(function () {
        wx.onMenuShareAppMessage({
          title: SHARE_TITLE, // 分享标题
          desc: SHARE_DESC, // 分享描述
          link: SHARE_URL, // 分享链接
          imgUrl: SHARE_IMG, // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
            // 用户确认分享后执行的回调函数
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        })
        //分享到朋友圈
        wx.onMenuShareTimeline({
          title: SHARE_TITLE,
          desc: SHARE_DESC, // 分享描述
          link: SHARE_URL,
          imgUrl: SHARE_IMG, // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function (res) {
            // 用户确认分享后执行的回调函数
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        })
        wx.error(function (res) {
          // alert('wx.error'+res.errMsg)
        })
      })
    }
  },
  beforeMount: function () {
    if (window.location.href.indexOf('inUlb') > -1 || window.location.href.indexOf('inulb') > -1) {
      window.onload = () => {
        var ulbTimer = setInterval(() => {
          if (navigator.uniaccount.getAppInfo && navigator.uniaccount.ulbAccLogin) {
            this.cordovaLoad()
            clearInterval(ulbTimer)
          } else {
            console.log('1')
          }
        }, 300)
      }
    }
    if (this.GLOBAL.isWeixin()) {
      window.onload = this.setWeixinShare
    }
  },
  mounted: function () {
    this.getUrl()
    this.setData()
    this.setData2()
    // 猜股指主页埋点
    window.TDAPP.onEvent('ylbapp_guessindex_menu_action', '', {acc: this.propData.userinfo.account, tel: this.propData.userinfo.phone})
    if (window.localStorage.getItem('guess-stock2-isUpdate')) {
      var isUpdate = window.localStorage.getItem('guess-stock2-isUpdate')
      var isClick = window.localStorage.getItem('guess-stock2-isClick') || 0
      if (isUpdate === '1' && isClick !== '1') {
        this.isUpdate = 1
      }
    }
    var timer = setInterval(() => {
      if (window.localStorage.getItem('guess-stock2-isUpdate')) {
        var isUpdate = window.localStorage.getItem('guess-stock2-isUpdate')
        var isClick = window.localStorage.getItem('guess-stock2-isClick') || 0
        if (isUpdate === '1' && isClick !== '1') {
          this.isUpdate = 1
        }
        // alert('local.isUpdate: ' + isUpdate + '--isClick: ' + isClick + '--this.isUpdate: ' + that.isUpdate)
        clearInterval(timer)
      } else {
        console.log('1')
      }
    }, 3000)
  }
}
</script>

<style lang="less">
html, body{
    height: 100%;
    ::-webkit-scrollbar {/*隐藏滚轮*/
      display: none;
    }
}
/* [v-cloak]{
    visibility: hidden;
} */
#app{
  width: 100%;
  height: 100%;  box-sizing: border-box;
  /* padding-bottom: 1.548611rem; */ /* 223 */
  background: url('./assets/background.png') no-repeat;
  background-size: 100% 100%;
  overflow-y: scroll;
    /* 过渡动画 */
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
      opacity: 0
    }
    .child-view {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      transition: all .5s cubic-bezier(.55,0,.1,1);
      box-sizing: border-box;
      padding-bottom: 0.951388rem; /* 137 */      overflow-y: scroll;
    }
    .slide-left-enter, .slide-right-leave-active {
      opacity: 0;
      -webkit-transform: translate(30px, 0);
      transform: translate(30px, 0);
    }
    .slide-left-leave-active, .slide-right-enter {
      opacity: 0;
      -webkit-transform: translate(-30px, 0);
      transform: translate(-30px, 0);
    }

}
</style>
