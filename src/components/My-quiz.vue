<template>
  <div class="my-quiz">
    <div class="des">每个交易日15:30更新中奖结果</div>
    <div class="no-login" v-if="!propData.userinfo.isLogin">
      <div class="des"><p>您还未登录</p><p>登录之后可查看我的竞猜</p></div>
      <a @click="noLogin" class="no-login-btn"><img src="../assets/guess_btn_qwdl.png" alt="" /></a>
    </div>
    <div v-if="!isPartake && propData.userinfo.isLogin" class="no-partake">
      <div class="des">您还未参与竞猜</div>
      <a href="#/" class="button">马上参与</a>
    </div>
    <div v-if="isPartake && propData.userinfo.isLogin" class="data">
      <div v-for="(value, index) in myQuiz" :key="index" class="list">
        <div class="title clearfix">
          <div class="left">{{value.date}}</div>
          <div class="right">收盘指数：{{value.stockIndex}}</div>
        </div>
        <div class="table">
          <div class="tr clearfix">
            <div class="left">我的竞猜指数</div>
            <div class="center">竞猜时间</div>
            <div class="right">获取的奖品</div>
          </div>
          <div v-for="(val, i) in value.recordList" :key="i" class="tr clearfix">
            <div class="left">{{(val.stockIndex / 100).toFixed(2)}}</div>
            <div class="center">{{getDate(val.createTime)}} {{getTime(val.createTime)}}</div>
            <div v-bind:class="['right', getClass(val.isWinning, value.date)]">{{getPrize(val.isWinning, value.date)}}<br>{{getPrize2(val.isWinning, val.createTime)}}</div>
          </div>
          <!-- <div class="tr clearfix">
            <div class="left">33.7584</div>
            <div class="center">10-19 16:22:56</div>
            <div class="right have-result">iPhone X</div>
          </div>
          <div class="tr clearfix">
            <div class="left">33.7584</div>
            <div class="center">10-19 16:22:56</div>
            <div class="right have-result isGoddess">L2体验月卡<br>YSL口红</div>
          </div>
          <div class="tr clearfix">
            <div class="left">33.7584</div>
            <div class="center">10-19 16:22:56</div>
            <div class="right">未中奖</div>
          </div> -->
        </div>
      </div>
    </div>
    <!-- 加载 -->
    <Loading v-show="mask.loading"></Loading>
  </div>
</template>

<script>
import Loading from './common/Loading'

export default {
  name: 'My_quiz',
  data () {
    return {
      isPartake: true, // 是否已参与竞猜
      mask: { // 弹窗控制
        loading: false // 加载
      },
      myQuiz: [
        //  {
        //    stockIndex: '待公布', // 竞猜当日股指
        //    recordList: [
        //      {
        //        id: '1000000416400252', // 编号
        //        account: '1****8', // 资金账号
        //        stockIndex: 337533, // 竞猜指数
        //        isWinning: 2, // 是否中奖(0-待公布;1-未中奖;2-50元话费;3-1000元加油卡)
        //        createTime: 1509523957000 // 竞猜时间
        //      },
        //      {
        //        id: '1000002130278147',
        //        account: '1****8',
        //        stockIndex: 338533,
        //        dif: null,
        //        isWinning: 1,
        //        createTime: 1509523952000
        //      },
        //      {
        //        id: '1000002130278147',
        //        account: '1****8',
        //        stockIndex: 338533,
        //        dif: null,
        //        isWinning: 1,
        //        createTime: 1509523952000
        //      }
        //    ],
        //    date: '11月05日' // 日期
        //  }
      ]
    }
  },
  watch: {
    'propData.userinfo.account': function (to, from) {
      // console.log(to, from)
      this.setDate()
    }
  },
  components: { // 公共组件
    Loading
  },
  props: ['propData', 'againLogin'], // 接收父组件的值
  methods: {
    /**
     * 将时间戳改为日期格式
     */
    getDate: function (time) {
      var date = new Date(time)
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      return (M + D)
    },
    /**
     * 将时间戳改为分秒格式
     */
    getTime: function (time) {
      var date = new Date(time)
      var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
      var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      return (h + m + s)
    },
    /**
     * 获取奖品结果
     */
    getPrize: function (type, date) {
      var arr = ['未公布', '未中奖', '50元话费', '1000元加油卡', '50元话费', '1000元加油卡']
      if (type === 2) return arr[4]
      else if (type === 3) return arr[5]
      return arr[type]
    },
    /**
     * 额外字段
     */
    getPrize2: function (type, date) {
      // console.log(date)
      // return
      // var month = parseInt(date.substr(0, 2))
      // var day =  parseInt(date.substr(3, 2))
      var arr = ['100元加油卡', '1G流量']
      if (type === 2 || type === 3) {
        if (date >= 1541401200000 && date <= 1541998800000) { // 11月5日 15：00 - 11月12日 13：00
          return arr[0]
        } else if (date >= 1545202800000 && date <= 1546232400000) { // 12月19日 15：00 - 12月31日 13：00
          return arr[1]
        }
        // if (month == 11 && day <= 12 && day >= 5) {
        //   return arr[0]
        // } else if (month == 12 && day <= 31 && day >= 20) {
        // // } else if (month == 9 && day <= 31 && day >= 2) {
        //   return arr[1]
        // }
      } else {
        return ''
      }
    },
    // /**
    //  * 居中显示
    //  */
    // isMt: function (type, date) {
    //   var month = parseInt(date.substr(0, 2))
    //   var day =  parseInt(date.substr(3, 2))
    //   if ((type === 2 || type === 3) && ((month == 11 && day <= 12 && day >= 5) || month == 12 && day <= 31 && day >= 20)) {
    //   // if ((type === 2 || type === 3) && ((month == 11 && day <= 12 && day >= 5) || month == 9 && day <= 31 && day >= 2)) {
    //     return 'mt'
    //   }
    //   return ''
    // },
    /**
     * 获取奖品类名
     */
    getClass: function (type, date) {
      var month = parseInt(date.substr(0, 2))
      var day =  parseInt(date.substr(3, 2))
      var arr = ['no-result', 'not-winning', 'have-result', 'have-result', 'have-result isGoddess', 'have-result isEndYear']
      if (type === 2 && month == 11 && day <= 12 && day >= 5) return arr[4]
      else if (type === 3 && month == 11 && day <= 12 && day >= 5) return arr[4]
      else if (type === 2 && month == 12 && day <= 31 && day >= 20) return arr[5]
      else if (type === 3 && month == 12 && day <= 31 && day >= 20) return arr[5]
      return arr[type]
    },
    /**
     * 点击前往登录
     */
    noLogin: function () {
      this.againLogin();
    },
    /**
     * ajax获取数据
     */
    setDate: function () {
      var account = this.propData.userinfo.account
      var token = this.propData.userinfo.token
      var client = this.propData.userinfo.client
      if (!account) {
        this.isPartake = false
        return
      }
      // alert('account: ' + account + '--token: ' + token + '--client' + client)
      this.mask.loading = true
      this.$ajax({
        url: '/myGuessRecord',
        params: {
          account: account,
          Token: token,
          Client: client
        }/* ,
        headers: { 'Token': token, 'Client': client } */
      })
      .then((res) => {
        // alert(JSON.stringify(res.data))
        // console.log(res.data)
        if (res.data.respbody) {
          var Data = res.data.respbody
          for (var i = 0; i < Data.length; i++) {
            if (Data[i].stockIndex !== '待更新') {
              Data[i].stockIndex = (Data[i].stockIndex / 100).toFixed(2)
            }
          }
          this.myQuiz = Data
          if (this.myQuiz.length !== 0) {
            this.isPartake = true
          } else {
            this.isPartake = false
          }
        } else {
          this.isPartake = false
        }
        this.mask.loading = false
      })
      .catch((error) => {
        this.mask.loading = false
        console.log(JSON.stringify(error))
      })
    }
  },
  mounted: function () {
    if (this.GLOBAL.isWeixin()) {
      this.isPartake = false
      return
    }
    if (this.GLOBAL.browser.versions.mobile) { // 判断是否是移动设备打开。browser代码在下面
      var ua = navigator.userAgent.toLowerCase() // 获取判断用的对象
      if ((ua.match(/MicroMessenger/i) + '') === 'micromessenger' || (ua.match(/WeiBo/i) + '') === 'weibo') {
        this.isPartake = false
        return
      }
    }
    this.setDate()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.my-quiz{
  padding: 0 .3125rem 0 .277778rem; /* 45 40 */
  position: relative;
  box-sizing: border-box;
  height: 100%;
  > .des{
    text-align: center;
    height: .951389rem; /* 137 */
    line-height: .951389rem; /* 137 */
    color: #fff;
    font-family: "PingFangSc-Regular";
    font-size: .25rem; /* 36 */
  }
  > .data{
    max-height: 9.375rem; /* 1350 */
    overflow-y: scroll;
    ::-webkit-scrollbar {/*隐藏滚轮*/
      display: none;
    }
    .list{
      border-radius: .347222rem; /* 50 */
      overflow: hidden;
      background-color: #fff;
      margin-bottom: .236111rem; /* 34 */
      .title{
        text-align: center;
        color: #fff;
        font-family: "PingFangSC-Semibold";
        background: #f9af29;
        background: -webkit-linear-gradient(left, #FEC629, #F49629); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(right, #FEC629, #F49629); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(right, #FEC629, #F49629); /* Firefox 3.6 - 15 */
        background: linear-gradient(to right, #FEC629, #F49629); /* 标准的语法 */
        height: .847222rem; /* 122 */
        line-height: .847222rem; /* 122 */
        .left{
          float: left;
          margin-left: 1.0625rem; /* 153 */
          font-size: .33333rem; /* 48 */
        }
        .right{
          float: left;
          font-size: .33333rem; /* 48 */
          margin-left: .34444rem; /* 56 */
        }
      }
      .table{
        color: #6D6D6D;
        padding-bottom: .194444rem; /* 28 */
        .tr{
          height: .5rem; /* 72 */
          line-height: .5rem; /* 72 */
          font-size: .305556rem; /* 44 */
          text-align: center;
          &:first-child{
            height: .673611rem; /* 97 */
            line-height: .673611rem; /* 97 */
            color: #999999;
          }
          .left{
            float: left;
            width: 2.138889rem; /* 308 */
            margin-left: .1rem;
          }
          .center{
            float: left;
            width: 2.56944rem; /* 370 */
          }
          .right{
            float: left;
            width: 2rem; /* 260 */
          }
          .mt{
            margin-top: .25rem; /* 36 */
          }
          .no-result{
            color: #f5a623;
          }
          .not-winning{
            color: #0084ff;
          }
          .have-result{
            color: #eb4e40;
          }
          .isGoddess{
            line-height: .277778rem; /* 40 */
            font-size: .236111rem; /* 34 */
          }
          .isEndYear{
            line-height: .277778rem; /* 40 */
            font-size: .236111rem; /* 34 */
          }
        }
      }
    }
  }
  > .no-login{
    position: absolute;
    width: 4.64583rem; /* 666 */
    height: 2.03333rem; /* 228 */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    text-align: center;
    .des{
      color: #fff;
      font-size: .315556rem; /* 44 */
      font-family: "PingFangSC-Regular";
      height: 1rem; /* 144 */
      line-height: .5rem; /* 72 */
      padding-bottom: .2rem;
    }
    .no-login-btn{
      display: block;
      width: 4.64583rem; /* 669 */
      height: .8333rem; /* 120 */
    }
  }
  > .no-partake{
    position: absolute;
    width: 4.625rem; /* 666 */
    height: 1.583333rem; /* 228 */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    text-align: center;
    .des{
      color: #fff;
      font-size: .305556rem; /* 44 */
      font-family: "PingFangSC-Regular";
      height: .798611rem; /* 115 */
      line-height: .798611rem; /* 115 */
    }
    .button{
      display: block;
      width: 4.625rem; /* 666 */
      height: .784722rem; /* 113 */
      line-height: .784722rem; /* 113 */
      background-image: url("../assets/btn_confirm_n.png");
      background-repeat: no-repeat;
      background-size: contain;
      font-size: .402778rem; /* 58 */
      color: #fff;
      font-family: "PingFangSC-Semibold";
    }
  }
}
</style>
