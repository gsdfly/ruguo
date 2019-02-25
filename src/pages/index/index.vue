<template>
  <div class="container">
    <swiper :indicator-dots="indicatorDots"
            :autoplay="autoplay" :interval="interval" previous-margin="47.5rpx" :duration="duration"
            :circular="circular" @change="swiperChange($event)">
      <block v-for="(item,index) in banner" :key="index">
        <swiper-item @click="playGame(item.game)"
                     :class="{'current':current===index,'provent':(banner.length==2 && index==0) || (banner.length!=2 &&(current-1 < 0 ? banner.length-1 : current-1))===index,'next':(banner.length==2 && index==1) || (banner.length!=2&&(current+1 >= banner.length ? 0 : current+1)===index)}">
          <img :src="imgUrl+item.image" class="slide-image"/>
        </swiper-item>
      </block>
    </swiper>
    <div class="gameList" v-if="games.length>0" v-for="(item,index) in games" :key="index">
      <h3><img src="/static/imgs/line2.png" alt="">{{item.tag_name}}</h3>
      <ul>
        <li v-for="(gameItem,index2) in item.games" :key="index2" @click="playGame(gameItem)">
          <img :src="imgUrl+gameItem.game_image" alt=""/>
          <p>{{gameItem.game_name}}</p>
          <!--<p>{{gameItem.game_description}}</p>-->
        </li>
      </ul>
    </div>
    <tip v-if="operation.image" @playGame="playGame"></tip>
  </div>
</template>

<script>
  import api from './../../api'
  import {mapState} from 'vuex'
  import {playGame} from './../../utils'
  import user from "../../store/user";
  import tip from './../../components/tip.vue'

  export default {
    data() {
      return {
        games: {},
        banner: [],
        indicatorDots: true,
        autoplay: false,
        interval: 5000,
        duration: 1000,
        circular: true,
        current: 0,
        imgUrl:this.imgUrl
      }
    },
//    onHide(){
//      this.$store.commit('setOperation',{});
//    },
    created() {
//      wx.hideTabBar()
      //理一下流程，用户进来首先判断本地是否存有用户信息，有只用调用登录，没有的话调用接口授权、若调用接口失败及就是没有授权弹出出来
      //不管下面的tabbar吗
      wx.showLoading({
        title: "加载中..."
      });
//      var lastLoginTime = wx.getStorageSync('lastLoginTime');
//      var nowTime = new Date().getTime();
      var userInfo = wx.getStorageSync('userInfo');
      var self = this;
      if(userInfo){
        self.$store.dispatch('setUserInfoAction', userInfo);
      }
      wx.login({
        timeout: 3000,
        success: function (res) {
          api.onLogin({code: res.code}).then((result) => {
            self.$store.dispatch('setTokenAction', result.data.token);
          })
        },
        fail: function () {
          console.log('登录失败')
          wx.reLaunch({
            url: '/pages/error/main'
          })
        }
      })
//      if(lastLoginTime && (nowTime - lastLoginTime) < 1000*60*60*24*2 && userInfo){
//        console.log((nowTime - lastLoginTime))
//         //存在且用户最后一次登录时间距离这次登录时间小于2天
//          console.log('用户存在且不用更新')
//          //若有用户信息，同时将用户信息存储到store中
//          self.$store.dispatch('setUserInfoAction', userInfo);
//          wx.login({
//            timeout: 3000,
//            success: function (res) {
//              api.onLogin({code: res.code}).then((result) => {
//                self.$store.dispatch('setTokenAction', result.data.token);
//              })
//            },
//            fail: function () {
//              console.log('登录失败')
//              wx.reLaunch({
//                url: '/pages/error/main'
//              })
//            }
//          })
//      }else {
//          wx.login({
//            success: function (result) {
//              wx.getUserInfo({
//                lang:'zh_CN',
//                success: function (res) {
//                  wx.setStorage({key: 'userInfo', data: res.userInfo});
//                  self.$store.dispatch('setUserInfoAction', res.userInfo);
//                  wx.setStorageSync('lastLoginTime',nowTime);
//                  api.auth({code: result.code, iv: res.iv, encryptData: res.encryptedData}).then((res2) => {
//                    self.$store.dispatch('setTokenAction', res2.data.token);
//                  })
//                },
//                fail: function () {
//                  api.onLogin({code: result.code}).then((response) => {
//                    self.$store.dispatch('setTokenAction', response.data.token);
//                  })
//                }
//              })
//            }
//          })
//      }
    },
    onPullDownRefresh() {
      //下拉刷新时,重新请求页面的信息
      this.init()
    },
    computed: mapState({
      operation: state => state.user.operation,
    }),
    mounted() {
//    wx.showLoading({
//      title: "加载中..."
//    })
      //获取推荐游戏
      this.$store.dispatch('setOperationAction').then(()=>{
        wx.hideLoading()
      })
      this.init()
    },
    components:{
      tip
    },
    methods: {
      init() {
        api.getBanner().then((res) => {
          this.banner = res.data;
        })
        api.getGameList().then((res) => {
          this.games = res.data;
          wx.hideLoading()
          wx.stopPullDownRefresh()
        })
      },
      swiperChange(e) {
        console.log(e)
        this.current = e.target.current;
      },
      playGame(gameInfo) {
        /**
         * 用户点击游戏跳转
         * 1.跳转小程序
         * 2.发送阿拉丁统计
         * 3.将游戏添加到本地，即是最近常玩项目
         */
        console.log(gameInfo);
        playGame(gameInfo, this.$store, this.app)
//      addGame(gameInfo,this.$store);
//      goToAppLet(gameInfo,this.$store);
//      this.app.aldstat.sendEvent('跳转游戏',{
//        '游戏名':gameInfo.game_name
//      })
      },
    },


  }
</script>

<style lang="scss" scoped>
  $textColor: #4d4d4d;
  .container {
    width: 100%;
    height: 100%;
    swiper {
      width: 100%;
      height: 4.2rem;
      swiper-item {
        width: 6.58rem !important;
        height: 100%;
        /*padding: 0 0.08rem;*/
        box-sizing: border-box;
        &.next {
          img {
            /*width: 6.2rem;*/
            /*height: 3.8rem;*/
            transform: scale(0.904762) translateX(-0.15rem);
            /*margin: 0.2rem 0 0 0;*/
            /*float: left;*/
          }
        }
        &.provent {
          img {
            transform: scale(0.904762) translateX(0.155rem);
            /*width: 6.2rem;*/
            /*height: 3.8rem;*/
            /*margin: 0.2rem 0 0 0;*/
            /*float: right;*/
          }
        }
        &.current {
          img {
            width: 6.58rem !important;
            height: 4.2rem !important;
            float: right;
            margin: 0 !important;
            transform: scale(1);
          }
        }
      }
      img {
        width: 6.58rem;
        height: 4.2rem;
        border-radius: 10px;
        float: right;
        transition: all 0.2s ease-in 0s;
      }
    }
    .gameList {
      margin-top: 0.34rem;
      /*overflow: hidden;*/
      &:last-of-type {
        margin-bottom: 0.34rem;
      }
      > h3 {
        height: 0.4rem;
        line-height: 0.44rem;
        color: #313232;
        font-size: 0.3rem;
        font-weight: bold;
        text-indent: 0.15rem;
        img {
          width: 0.06rem;
          height: 0.4rem;
          float: left;
        }
      }
      ul {
        width: 100%;
        margin: 0.06rem 0 0 0;
        padding: 0 0.28rem;
        overflow: hidden;
        zoom: 1;
        li {
          width: 1.6rem;
          display: inline-block;
          margin-top: 0.4rem;
          margin-right: calc((100% - 6.4rem) / 3);
          vertical-align: top;
          &:nth-of-type(4n) {
            margin-right: 0;
          }
          img {
            width: 1.6rem;
            height: 1.6rem;
            border-radius: 0.15rem;
            margin: 0 0 0.14rem 0;
          }
          p {
            color: $textColor;
            font-size: 0.24rem;
            line-height: 0.28rem;
            font-weight: bold;
            &:first-of-type {
              margin: 0 0 0.06rem 0;
            }
          }
        }
      }
    }
  }
</style>
