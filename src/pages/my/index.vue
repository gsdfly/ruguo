<template>
  <div class="my">
    <div class="top">
        <div class="noLogin" v-if="userInfo.nickName=='玩家'">
          <p>尚未登录。</p>
          <p>登录后，这里将出现你的信息。</p>
          <button @getuserinfo="RuserInfoHandler" class="pop-btn" lang="zh_CN" openType="getUserInfo">使用微信登录</button>
        </div>
        <img class="avatar" :src="userInfo.avatarUrl" alt="" v-if="userInfo.nickName!='玩家'" />
        <p v-if="userInfo.nickName!='玩家'">{{userInfo.nickName}}</p>
      <!--<img class="imgBtn" src="/static/imgs/group2.png" alt=""/>-->
      <img class="imgBtn" src="/static/imgs/group.png" alt=""/>
      <button class="kefu" open-type="contact" @click="kefu">客服</button>
    </div>
    <div class="recentPlay">
      <h3 class="recentTitle"><img class="recentImg" src="/static/imgs/line2.png" alt="">最近常玩<img class="line" src="/static/imgs/line.png" alt="">
      </h3>
      <ul v-if="historyGames.length>0">
      <li v-for="(game,index) in historyGames" :key="index" @click="playGame(game)">
        <img :src="imgUrl+game.game_image" alt="" />
        <p>{{game.game_name}}</p>
        <!--<p>{{game.game_description}}</p>-->
      </li>
      </ul>
      <p v-else>你还没玩过游戏快去玩游戏吧。</p>
    </div>
    <!--<button @click="clear">清除</button>-->
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {goToAppLet} from './../../utils'
  import api from './../../api'
  export default {
    name:'my',
    data(){
      return {
        imgUrl:this.imgUrl
      }
    },
    computed:mapState({
      userInfo:state => state.user.userInfo,
      historyGames:state => state.user.historyGames,
    }),
    mounted(){
      //在每次跳转到我的页面时,获取本地我的历史游戏
      var historyGames = wx.getStorageSync('historyGames');
        if(historyGames){
          this.$store.dispatch('setHistoryGamesAction',historyGames)
        }
    },
    methods:{
//      clear(){
//        wx.clearStorageSync()
//      },
      kefu(){
        this.app.aldstat.sendEvent('点击客服')
      },
      RuserInfoHandler(res){
        //用户授权得到用户信息，将用户信息存储到本地
        if(res.mp.detail.userInfo){
          this.app.aldstat.sendEvent('用户点击我的登录授权');
          wx.login({
            success:function (result) {
              api.auth({code:result.code,iv:res.mp.detail.iv,encryptData:res.mp.detail.encryptedData}).then((res2)=>{
                this.$store.dispatch('setTokenAction',res2.data.token);
              })
            }.bind(this)
          })
          wx.setStorage({key:'userInfo',data:res.mp.detail.userInfo});
          this.$store.dispatch('setUserInfoAction',res.mp.detail.userInfo);
//          var nowTime = new Date().getTime();
//          wx.setStorageSync('lastLoginTime',nowTime);
        }else{
          this.app.aldstat.sendEvent('用户点击我的登录不授权');
        }
      },
      playGame(gameInfo){
        /**
         * 用户点击游戏跳转
         * 1.跳转小程序
         * 2.发送阿拉丁统计
         * 3.将游戏添加到本地，即是最近常玩项目
         */
        console.log(gameInfo);
        goToAppLet(gameInfo,this.$store);
        this.app.aldstat.sendEvent('跳转游戏',{
          '游戏名':gameInfo.game_name
        })
      },
      goMyCol(){
        wx.navigateTo({
          url: '../myCollection/main',
          success:function () {
            console.log('跳转成功')
          },
          fail:function () {
            console.log('跳转失败')
          }
        })
      },
      goHistoryGames(){
        wx.navigateTo({
          url: '/page/historyGames/main',
          success:function () {
            console.log('跳转成功')
          },
          fail:function () {
            console.log('跳转失败')
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  $textColor:#4d4d4d;
  .my{
    width: 100%;
    .top{
        width: 100%;
        text-align: center;
        padding: 0 0 0.48rem 0;
        position: relative;
      .noLogin{
        margin: 1.6rem 0 0 0;
          p{
            font-size: 0.32rem;
            line-height: 0.6rem;
          }
          .pop-btn{
            display: block;
            width: 2.6rem;
            height: 0.6rem;
            background: black;
            border-radius: 0.1rem;
            color: #fff;
            font-size: 0.32rem;
            line-height: 0.6rem;
            margin: 0.3rem auto 0.4rem auto;
          }
      }
        >p {
          font-size: 0.48rem;
          margin: 0.58rem 0 0.52rem 0;
        }
        .avatar{
          width: 1.9rem;
          height: 1.9rem;
          border-radius: 50%;
          margin: 0.5rem auto 0 auto;
        }
        .imgBtn{
          width: 6.48rem;
          height: 0.84rem;
          margin:0.14rem auto 0 auto;
        }
      .kefu{
        width: 6.48rem;
        height: 0.84rem;
        position: absolute;
        left: 50%;
        bottom: 0.48rem;
        font-size: 0;
        transform: translateX(-50%);
      }
    }
    .recentPlay{
      width: 100%;
      .recentTitle{
        width:100%;
        height: 0.4rem;
        display: flex;
        align-items: center;
        font-size: 0.3rem;
        font-weight: bold;
        .recentImg{
          width: 0.06rem;
          height: 0.4rem;
          margin: 0 0.15rem 0 0;
        }
        .line{
          width: calc(100% - 1.6rem);
          margin: 0 0 0 0.18rem;
          height: 0.08rem;
        }
      }
      ul{
        width: 100%;
        margin: 0.06rem 0 0 0;
        padding: 0 0.28rem;
        overflow: hidden;
        zoom: 1;
        li{
          width: 1.6rem;
          /*float: left;*/
          display: inline-block;
          margin-top:0.4rem;
          margin-right: calc((100% - 6.4rem)/3);
          vertical-align: top;
          &:nth-of-type(4n){
            margin-right: 0;
          }
          img{
            width: 1.6rem;
            height: 1.6rem;
            border-radius: 0.15rem;
            margin: 0 0 0.14rem 0;
          }
          p{
            color: $textColor;
            font-size: 0.2rem;
            line-height: 0.24rem;
            &:first-of-type{
              margin: 0 0 0.06rem 0;
            }
          }
        }
      }
      >p{
        font-size: 0.26rem;
        color: $textColor;
        text-align: center;
        line-height: 0.6rem;
      }
    }
  }
</style>
