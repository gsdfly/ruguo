<template>
  <div class="welcome" v-if="showHtml">
    <div class="tip">
      <img src="/static/imgs/tip.png" alt=""/>
      <button @getuserinfo="RuserInfoHandler" class="pop-btn" lang="zh_CN" openType="getUserInfo">进入雨果游戏</button>
    </div>
  </div>
</template>

<script>
  import api from '@/api'
  export default {
    name:'welcome',
    data(){
      return {
        showHtml:false,
        isOnLogin:false,
      }
    },
//    created () {
//      wx.showLoading({
//        title: "请稍等..."
//      })
////      每次进来都需要调用登录，根据最后一次登录的时间来判断是否需要刷新用户信息，若是用户改变了的话也需要刷新用户信息
//      var lastLoginTime = wx.getStorageSync('lastLoginTime');
//      var nowTime = new Date().getTime();
//      if(lastLoginTime){
//        console.log((nowTime - lastLoginTime))
//        if((nowTime - lastLoginTime) > 1000*60*60*24*2){
//          //重新授权
//          this.showHtml = true;
//          wx.hideLoading();
//          wx.setStorageSync('lastLoginTime',nowTime);
//        }else {
//          var userInfo = wx.getStorageSync('userInfo');
//          wx.setStorageSync('lastLoginTime',nowTime);
//          if(userInfo){
//            console.log('用户存在且不用更新')
//            //若有用户信息，同时将用户信息存储到store中
//            this.$store.dispatch('setUserInfoAction',userInfo);
//            wx.login({
//              timeout:3000,
//              success:function (res) {
//                //登录自己的接口，根据返的值来判断是否需要显示欢迎页面,
//                //需要
//                api.onLogin({code:res.code}).then((result)=>{
//                  this.$store.dispatch('setTokenAction',result.data.token);
//                })
//                console.log(res)
//              }.bind(this),
//              fail:function () {
//                console.log('登录失败')
//              }
//            })
//            wx.hideLoading()
//            wx.reLaunch({
//              url:'/pages/index/main',
//              success:function () {
//                console.log('跳转成功');
//              },
//              fail:function (res) {
//                console.log(res);
//              }
//            })
//          }else {
//            this.showHtml = true;
//            wx.hideLoading()
//          }
//        }
//      }else {
//        wx.setStorageSync('lastLoginTime',nowTime);
//        this.showHtml = true;
//        wx.hideLoading();
//      }
//    },
    methods:{
      RuserInfoHandler(res){
        console.log(res);
        wx.login({
          success:function (result) {
            api.auth({code:result.code,iv:res.mp.detail.iv,encryptData:res.mp.detail.encryptedData}).then((res2)=>{
              this.$store.dispatch('setTokenAction',res2.data.token);
            })
          }.bind(this)
        })
        this.app.aldstat.sendEvent('用户点击进入小程序');
        //用户授权得到用户信息，将用户信息存储到本地
        console.log(res.mp.detail.userInfo)
        if(res.mp.detail.userInfo){
          wx.setStorage({key:'userInfo',data:res.mp.detail.userInfo});
          this.$store.dispatch('setUserInfoAction',res.mp.detail.userInfo);
          wx.reLaunch({
            url:'/pages/index/main',
            success:function () {
              console.log('跳转成功');
            },
            fail:function (res) {
              console.log(res);
            }
          })
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  .welcome{
    width: 100%;
    height: 100%;
    background: red;
    .tip{
      width: 100%;
      position: fixed;
      top:50%;
      transform: translateY(-50%);
      img{
        width: 6rem;
        height: 6rem;
        margin: 0 auto;
      }
      button{
        position: absolute;
        width: 6rem;
        height: 1.2rem;
        left: 50%;
        bottom: 1.2rem;
        transform: translateX(-50%);
        font-size: 0;
      }
    }
  }

</style>
