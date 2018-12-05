<template>
  <div class="winner-list">
      <div class="des">每个交易日15:30更新</div>
      <div class="iphone">
        <div class="title">1000元加油卡{{youkuData[0] && getActDate(youkuData[0].createTime)}}</div>
        <div class="list">
          <div v-if="iphoneData.length === 0" class="no-prize">暂时无人中奖</div>
          <ul v-for="(value, index) in iphoneData" :key="index" class="clearfix">
            <li>{{getDate(value.createTime)}}</li>
            <li>{{getTime(value.createTime)}}</li>
            <li>{{value.account}}</li>
            <li>{{(value.stockIndex / 100).toFixed(2)}}</li>
          </ul>
        </div>
      </div>
      <div class="youku-card">
        <div class="title">50元话费{{youkuData[0] && getActDate(youkuData[0].createTime)}}</div>
        <div class="list">
          <div v-if="youkuData.length === 0" class="no-prize">暂时无人中奖</div>
          <ul v-for="(value, index) in youkuData" :key="index" class="clearfix">
            <li>{{getDate(value.createTime)}}</li>
            <li>{{getTime(value.createTime)}}</li>
            <li>{{value.account}}</li>
            <li>{{(value.stockIndex / 100).toFixed(2)}}</li>
          </ul>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Winner_list',
  props: ['propData', 'iphoneData', 'youkuData'], // 接收父组件的值
  methods: {
    /**
     * 判断活动日期是否在11月5日至12日之间
     */
    getActDate: function (time) {
      console.log(time)
      if (time >= 1541401200000 && time <= 1541998800000) { // 11月5日 15：00 - 11月12日 13：00
        return '+100元加油卡'
      } else if (time >= 1545202800000 && time <= 1546232400000) { // 12月19日 15：00 - 12月31日 13：00
        return '+1G流量'
      }
      return ''
      // if (this.$parent.mainData.isGoddess) {
      //   return '+100元加油卡'
      // }else if (this.$parent.mainData.isEndYear) {
      //   return '+1G流量'
      // } else {
      //   return ''
      // }
    },
    /**
     * 将时间戳改为日期格式
     */
    getDate: function (time) {
      var date = new Date(time)
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月'
      var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '日'
      return (M + D)
    },
    /**
     * 将时间戳改为 时：分 格式
     */
    getTime: function (time) {
      var date = new Date(time)
      var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
      var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      return (h + m + s)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.winner-list{
  padding: 0 .3125rem 0 .277778rem; /* 45 40 */
  > .des{
    text-align: center;
    height: .951389rem; /* 137 */
    line-height: .951389rem; /* 137 */
    color: #fff;
    font-family: "PingFangSc-Regular";
    font-size: .25rem; /* 36 */
  }
  > .iphone{
    border-radius: .347222rem; /* 50 */
    overflow: hidden;
    .title{
      background: #f45611;
      background: -webkit-linear-gradient(left, #F67806, #F3351C); /* Safari 5.1 - 6.0 */
      background: -o-linear-gradient(right, #F67806, #F3351C); /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient(right, #F67806, #F3351C); /* Firefox 3.6 - 15 */
      background: linear-gradient(to right, #F67806, #F3351C); /* 标准的语法 */
      height: .847222rem; /* 122 */
      line-height: .847222rem; /* 122 */
    }
  }
  .title{
    text-align: center;
    color: #fff;
    background-size: 100% 100%;
    font-size: .375rem; /* 54 */
    font-family: "PingFangSC-Semibold";
  }
  .list{
    color: #6D6D6D;
    background-color: #fff;
    font-family: "PingFangSC-Semibold";
    font-size: .305556rem; /* 44 */
    li{
      height: .729167rem; /* 105 */
      line-height: .729167rem; /* 105 */
      float: left;
      box-sizing: border-box;
      &:nth-child(1){
        width: 1.493056rem; /* 215 */
        text-align: right;
      }
      &:nth-child(2){
        width: 1.488889rem; /* 200 */
        padding-left: .104167rem; /* 15 */
      }
      &:nth-child(3){
        width: 2.534722rem; /* 365 */
        text-align: center;
      }
      &:nth-child(4){
        width: 1.358333rem; /* 210 */
        color: #F13A29;
      }
    }
  }
  > .youku-card{
    border-radius: .347222rem; /* 50 */
    overflow: hidden;
    margin-top: .243056rem; /* 35 */
    .title{
      background: #f9af29;
      background: -webkit-linear-gradient(left, #FEC629, #F49629); /* Safari 5.1 - 6.0 */
      background: -o-linear-gradient(right, #FEC629, #F49629); /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient(right, #FEC629, #F49629); /* Firefox 3.6 - 15 */
      background: linear-gradient(to right, #FEC629, #F49629); /* 标准的语法 */
      height: .833333rem; /* 120 */
      line-height: .833333rem; /* 120 */
    }
  }
  .no-prize{
    text-align: center;
    height: .868056rem; /* 125 */
    line-height: .868056rem; /* 125 */
  }
}
</style>
