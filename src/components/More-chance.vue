<template>
  <div class="more-chance">
    <div class="chance1">
      <div class="list">
        <ul>
          <li><img src="../assets/jc_ico_kt.png" alt="" /></li>
          <li>开通两融账户</li>
          <li v-if="mainData.isMargin === 0"><a @click="planOne" href="javascript:void(0);"><img src="../assets/jc_btn_qkt.png" alt="" /></a></li>
          <li v-if="mainData.isMargin === 1"><a href="javascript:void(0);"><img src="../assets/jc_btn_ykt.png" alt="" /></a></li>
        </ul>
      </div>
      <div class="title">资金账号已经开通两融资格的客户，每日竞猜机会增加1次；</div>
    </div>
    <div class="chance2">
      <div class="list">
        <ul>
          <li><img src="../assets/jc_ico_gw.png" alt="" /></li>
          <li>持有资产不小于1000元</li>
          <li class="li_blue" v-if="!propData.userinfo.isLogin"><a @click="planTwo" href="javascript:void(0);">前往转账</a></li>
          <li class="li_blue" v-if="propData.userinfo.isLogin && mainData.isApply === 0"><a @click="planThree" href="javascript:void(0);">前往转账</a></li>
          <li class="li_gray" v-if="propData.userinfo.isLogin && mainData.isApply === 1"><a href="javascript:void(0);">已满足</a></li>
        </ul>
      </div>
      <div class="title">资金账户持有的资产不少于1000元的客户，每日竞猜机会增加1次。</div>
      <!--<div class="code">-->
        <!--<img src="../assets/jc_erweima.png" alt="" />-->
        <!--<p>扫码或微信搜索兴业证券<br>-->
          <!--<span>(xyzq601377)，</span>关注后绑定</p>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'More-chance',
  props: ['propData', 'mainData', 'againLogin'], // 接收父组件的值
  data () {
    return {
      data: [

      ],
      msg: 'More-chance'
    }
  },
  methods: {
    /**
     * 开通两融账户
     */
    planOne: function() {
      window.TDAPP.onEvent('ylbapp_guessindex_more_credit', '', {acc: this.propData.userinfo.account, tel: this.propData.userinfo.phone})
      navigator.uniaccount.jumpActivity({linkType: 2, link: 'https://estock.xyzq.com.cn/hallwap/biz/margincredit/index'})
    },
    /**
     * 持有资产不小于1000元 没有登录
     */
    planTwo: function() {
      this.againLogin();
    },
    /**
     * 持有资产不小于1000元 登录资产不足1000
     */
    planThree: function() {
      navigator.uniaccount.jumpActivity({linkType: 2, link: 'https://static.xyzq.cn/mhall/main.html#/biz/bank/transfer'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.more-chance{
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  > .chance1{
    width: 100%;
    height: 2.34027rem; /* 337 */
    background: #FFFFFF;
    margin-bottom: .2rem; /* 28.8 */
  }
  .title{
    width: 5.8194rem; /* 838 */
    color: #999999;
    background-size: 100% 100%;
    font-size: .2638rem; /* 38 */
    font-family: "PingFangSC-Semibold";
    margin-left: 1.4rem; /* 201.6 */
    line-height: .368055rem; /* 53 */
  }
  .list{
    width: 100%;
    position: relative;
    height: 1.1944rem; /* 172 */
    font-family: "PingFangSC-Semibold";
    font-size: .305556rem; /* 44 */
    li{
      float: left;
      box-sizing: border-box;
      &:nth-child(1){
        width: 1.4rem; /* 201.6 */
        img{
          margin-top: .3rem; /* 43.2 */
          margin-left: .4rem; /* 57.6 */
          width: .8055rem; /* 116 */
          height: .8055rem; /* 116 */
        }
      }
      &:nth-child(2){
        width: 4.229861rem; /* 609.1 */
        font-size: .34rem; /* 48.96 */
        margin-top: .3rem; /* 43.2 */
        line-height: .8055rem; /* 116 */
        color: #2D2D2D;
      }
      &:nth-child(3){
        margin-top: .4rem; /* 57.6 */
        a{
          img{
            width: 1.47916rem; /* 213 */
            height: .61111rem; /* 88 */
          }
        }
      }
    }
    .li_blue{
      width: 1.47916rem; /* 213 */
      height: .61111rem; /* 88 */
      text-align: center;
      line-height: .62111rem; /* 88 */
      background: #326DAF;
      font-size: .28rem; /* 40.32 */
      border-radius: .12rem; /* 17.28 */
      a{
        color: #ffffff;
        font-family: PingFangSC-Regular;
      }
    }
    .li_gray{
      width: 1.47916rem; /* 213 */
      height: .62111rem; /* 88 */
      text-align: center;
      font-size: .28rem; /* 40.32 */
      line-height: .61111rem; /* 88 */
      background: #DCDCDC;
      border-radius: .12rem; /* 17.28 */
      a{
        color: #2d2d2d;
        font-family: PingFangSC-Regular;
      }
    }
  }
  > .chance2{
    width: 100%;
    height: 2.34027rem; /* 337 */
    background: #FFFFFF;
    .code{
      margin-left: 1.4rem; /* 201.6 */
      margin-top: .403472rem; /* 58.1 */
      img{
        width: 1.6rem; /* 230.4 */
        height: 1.6rem; /* 230.4 */
        float: left;
      }
      p{
        font-size: .24rem; /* 34.56 */
        color: #999999;
        letter-spacing: .0429861rem; /* 3.31 */
        line-height: .34027rem; /* 49 */
        float: left;
        padding-left: .2rem; /* 28.8 */
        margin-top: .45972rem; /* 66.2 */
        span{
          letter-spacing: 0;
        }
      }
    }
  }
}
</style>

