<template>
  <div class="details">
    <!--<swiper :indicator-dots="indicatorDots"-->
    <!--:autoplay="autoplay" :interval="interval" :duration="duration" :circular="circular">-->
    <!--<block v-for="(item,index) in imgUrls" :key="index">-->
    <!--<swiper-item @click="playGame(item)">-->
    <!--<img :src="item" class="slide-image"/>-->
    <!--</swiper-item>-->
    <!--</block>-->
    <!--</swiper>-->
    <div class="details-top">
      <img v-if="detailPage.image" :src="imgUrl+detailPage.image"
           mode="aspectFill" alt=""/>
      <div class="title">
        <p>{{detailPage.sub_title}}</p>
        <h3>{{detailPage.title}}</h3>
      </div>
    </div>
    <div class="content">
      <wxParse :content="detailPage.content" />
    </div>
    <!--<p class="p">《越狱逃亡》最近更新了一个新的版本，游戏内容进行了大幅度的更新，与之前相比完全成为两款游戏。</p>-->
    <!--<p class='p'>或者说之前的版本更像是一个半成品，现在总算是一款经过雕琢之后的成品，游戏的可玩性大大提高了。</p>-->
    <div class="game" v-for="(game,index) in detailPage.daily_games" :key="index">
      <div class="game-left">
        <img :src="imgUrl+game.game_image" alt=""/>
      </div>
      <div class="game-center">
        <h3>{{game.game_name}}</h3>
        <!--<div class="star">-->
          <!--<span>★</span>-->
          <!--<span>★</span>-->
          <!--<span>★</span>-->
          <!--<span>★</span>-->
          <!--<span>★</span>-->
          <!--<p><span>5/</span>939 reviews</p>-->
        <!--</div>-->
        <p>{{game.game_description}}</p>
      </div>
      <div class="game-right" @click="playGame(game)">
        <img src="/static/imgs/btn_start.png" alt="">
      </div>
    </div>
    <div class="bottom" v-show="showHtml">
      <button open-type="share" class="zfBtn">转发</button>
      <img class="btnShare" src="/static/imgs/share.png" alt=""/>
      <!--<img class="shape" src="/static/imgs/shape.png" alt="">-->
    </div>
  </div>
</template>

<script>
  import wxParse from 'mpvue-wxparse'
  import {mapState} from 'vuex'
  import {playGame} from './../../utils'

  export default {
    name: 'details',
    data() {
      return {
        showHtml:false,
        imgUrl:this.imgUrl
      }
    },
    components: {
      wxParse
    },
    computed: mapState({
      detailPage: state => state.user.detailPage,
    }),
    onShareAppMessage(res){
      if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target)
      }
      console.log('/pages/details/main?daily_id='+this.detailPage.id)
      return {
        title: '如果游戏',
        path: '/pages/details/main?daily_id='+this.detailPage.id
      }
    },
    mounted() {
      wx.showLoading({
        title: "加载中..."
      })
      this.$store.dispatch('setDetailPageAction',{daily_id:this.$root.$mp.query.daily_id || 1}).then((res)=>{
        this.showHtml= true;
        wx.hideLoading()
      })
    },
    methods: {
//      onShareAppMessage(res){
//        console.log(res)
//        console.log('1111111')
//      },
      playGame(gameInfo){
        console.log(gameInfo)
        playGame(gameInfo,this.$store,this.app);
      },
    }
  }
</script>

<style lang="scss" scoped>
  /*@import url("~mpvue-wxparse/src/wxParse.css");*/
  @import url('./details.css');

  .details {
    width: 100%;
    .details-top {
      width: 100%;
      img {
        width: 7rem;
        height: 4rem;
        margin: 0 auto;
        border-radius: 0.16rem;
      }
      .title {
        margin: 0.5rem 0 0 0;
        /*position: absolute;*/
        /*left: 0.55rem;*/
        /*top:0.22rem;*/
        /*background: red;*/
        /*h4{*/
        /*font-size: 0.28rem;*/
        /*line-height: 0.28rem;*/
        /*margin: 0.3rem 0 0.25rem 0.4rem;*/
        /*}*/
        /*h5{*/
        /*margin: 0 0 0 0.4rem;*/
        /*max-width: 5.8rem;*/
        /*font-size: 0.54rem;*/
        /*line-height: 0.54rem;*/
        /*}*/
        p {
          opacity: 0.6;
          height: 0.4rem;
          line-height: 0.4rem;
          margin-left: 0.25rem;
          font-size: 0.28rem;
        }
        h3 {
          font-weight: 900;
          font-size: 0.54rem;
          margin-left: 0.25rem;
          height: 0.7rem;
          line-height: 0.7rem;
        }
      }
    }
    .content {
      padding: 0 0.25rem;
    }
    .game {
      width: 100%;
      height: 1rem;
      padding: 0 0.25rem;
      margin: 0.33rem 0 0 0;
      &:first-of-type {
        margin: 0.72rem 0 0 0;
      }
      .game-left {
        width: 1rem;
        height: 1rem;
        float: left;
        img {
          width: 100%;
          height: 100%;
          border-radius: 0.14rem;
        }
      }
      .game-center {
        height: 100%;
        float: left;
        margin: 0 0 0 0.4rem;
        h3 {
          font-size:0.32rem;
          margin: 0.1rem 0 0.1rem 0;
          line-height:0.4rem;
          /*font-size: 0.26rem;*/
          /*line-height: 0.26rem;*/
          /*margin: 0.13rem 0 0.18rem 0;*/
          text-indent: 0.03rem;
        }
        p{
          line-height:0.3rem;
          font-size:0.24rem;
        }
        /*.star {*/
          /*height: 0.24rem;*/
          /*line-height: 0.24rem;*/
          /*span {*/
            /*margin: 0 0.08rem 0 0;*/
          /*}*/
          /*p {*/
            /*display: inline;*/
            /*font-size: 0.2rem;*/
            /*span {*/
              /*font-size: 0.24rem;*/
            /*}*/
          /*}*/
        /*}*/
      }
      .game-right {
        width: 1.82rem;
        height: 100%;
        display: flex;
        align-items: center;
        float: right;
        margin: 0 0.1rem 0 0;
        img {
          width: 1.82rem;
          height: 0.56rem;
        }
      }
    }

    .bottom {
      width: 100%;
      height: 1.32rem;
      display: flex;
      align-items: center;
      position: relative;
      margin: 1.35rem 0 0 0;
      .zfBtn{
        width: 4.86rem;
        height: 0.64rem;
        position: absolute;
        left: 1rem;
        top:0.34rem;
        font-size: 0;
      }
      .btnShare {
        width: 4.86rem;
        height: 0.64rem;
        margin: 0 0 0 1rem;
      }
      .shape {
        width: 1.3rem;
        height: 1.32rem;
        position: absolute;
        right: 0.32rem;
      }
    }
  }

  /*.details{*/
  /*width: 100%;*/
  /*swiper{*/
  /*width: 100%;*/
  /*height: 4rem;*/
  /*margin: 0 0 0.56rem 0;*/
  /*swiper-item{*/
  /*img{*/
  /*width: 7rem;*/
  /*height: 100%;*/
  /*margin:0 auto;*/
  /*border-radius: 0.16rem;*/
  /*}*/
  /*}*/
  /*}*/
  /*.p{*/
  /*padding: 0 0.25rem;*/
  /*font-size: 0.24rem;*/
  /*line-height: 0.34rem;*/
  /*color: #666566;*/
  /*}*/
  /*.game{*/
  /*width: 100%;*/
  /*height: 1rem;*/
  /*padding: 0 0.25rem;*/
  /*margin: 0.33rem 0 0 0;*/
  /*&:first-of-type{*/
  /*margin: 0.72rem 0 0 0;*/
  /*}*/
  /*.game-left{*/
  /*width: 1rem;*/
  /*height: 1rem;*/
  /*float: left;*/
  /*img{*/
  /*width: 100%;*/
  /*height: 100%;*/
  /*border-radius: 0.14rem;*/
  /*}*/
  /*}*/
  /*.game-center{*/
  /*height: 100%;*/
  /*float: left;*/
  /*margin: 0 0 0 0.4rem;*/
  /*h3{*/
  /*font-size: 0.26rem;*/
  /*line-height: 0.26rem;*/
  /*margin: 0.13rem 0 0.18rem 0;*/
  /*text-indent: 0.03rem;*/
  /*}*/
  /*.star{*/
  /*height: 0.24rem;*/
  /*line-height: 0.24rem;*/
  /*span{*/
  /*margin: 0 0.08rem 0 0;*/
  /*}*/
  /*p{*/
  /*display: inline;*/
  /*font-size: 0.2rem;*/
  /*span{*/
  /*font-size:0.24rem;*/
  /*}*/
  /*}*/
  /*}*/
  /*}*/
  /*.game-right{*/
  /*width: 1.82rem;*/
  /*height: 100%;*/
  /*display: flex;*/
  /*align-items: center;*/
  /*float: right;*/
  /*margin: 0 0.1rem 0 0;*/
  /*img{*/
  /*width: 1.82rem;*/
  /*height: 0.56rem;*/
  /*}*/
  /*}*/
  /*}*/
  /*.bottom{*/
  /*width: 100%;*/
  /*height: 1.32rem;*/
  /*display: flex;*/
  /*align-items: center;*/
  /*position: relative;*/
  /*margin: 1.35rem 0 0 0;*/
  /*.btnShare{*/
  /*width: 4.86rem;*/
  /*height: 0.64rem;*/
  /*margin: 0 0 0 1rem;*/
  /*}*/
  /*.shape{*/
  /*width: 1.3rem;*/
  /*height: 1.32rem;*/
  /*position: absolute;*/
  /*right: 0.32rem;*/
  /*}*/
  /*}*/
  /*}*/
</style>
