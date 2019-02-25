<template>
  <div class="found">
    <div class="circle" v-if="foundList.length>0" v-for="(item,index) in foundList" :key="index">
      <h3><img src="/static/imgs/line3.png" alt="">{{index ==0 ? '今日推荐' : item.date}}</h3>
      <div class="content" :class="item.bg_color" @click="goDetails(item)">
        <div class="contentTop">
          <h4>{{item.sub_title}}</h4>
          <h5>{{item.title}}</h5>
          <!--<img v-if="!isCollection" @click.stop="collection" class="shape" src="/static/imgs/shape.png" alt=""/>-->
          <!--<img v-else @click.stop="cancelCollection" class="shape" src="/static/imgs/shape_active.png" alt="">-->
        </div>
        <img class="coverImg" :src="imgUrl+item.image" alt=""/>
        <!--<p>dahbndasdasd dasdinini dasdasdasd dsadasd dasda ddddddasd</p>-->
        <div class="cover" @click.stop="">
          <img class="coverBg" :src="imgUrl+item.image" alt=""/>
          <div>
            <div class="coverLeft">
              <img :src="imgUrl+item.game.game_image" alt="">
            </div>
            <div class="coverCenter">
              <h3>{{item.game.game_name}}</h3>
              <p>{{item.game.game_description}}</p>
            </div>
            <div class="coverRight" @click="playGame(item.game)">开始</div>
          </div>
        </div>
        </div>
    </div>
    <div class="nothing" v-show="htmlShow" v-if="foundList.length<=0">
      <p>暂无发现内容，敬请期待</p>
    </div>
    <!--<div class="circle">-->
      <!--<h3><img src="/static/imgs/line3.png" alt="">今日推荐</h3>-->
      <!--<div class="content">-->
        <!--<div class="contentTop">-->
          <!--<h4>今日游戏</h4>-->
          <!--<h5>你知道斗地主是谁发明的吗？</h5>-->
          <!--<img class="shape" src="/static/imgs/shape_active.png" alt=""/>-->
        <!--</div>-->
        <!--<img src="/static/imgs/share.png" alt=""/>-->
        <!--<p>dahbndasdasd dasdinini dasdasdasd dsadasd dasda ddddddasd</p>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
  import {playGame} from './../../utils'
  import {mapState} from 'vuex'

  export default {
    name:'found',
    data(){
      return  {
        imgUrl:this.imgUrl,
        htmlShow:false,
        page:1,
        hasPages:false
      }
    },
    computed:mapState({
      foundList:state => state.user.foundList,
    }),
    mounted(){
      wx.showLoading({
        title: "加载中..."
      })
      this.$store.dispatch('setFoundListAction',{page:1}).then((res)=>{
        this.htmlShow = true;
        console.log(res.hasPages)
        this.hasPages = res.hasPages;
        wx.hideLoading()
      })
    },
    onPullDownRefresh(){
      this.$store.dispatch('setFoundListAction',{page:1}).then(()=>{
        wx.stopPullDownRefresh()
      })
    },
    onReachBottom(){
      if(this.hasPages){
        this.page = this.page+1;
        this.$store.dispatch('setFoundListAction',{page:this.page}).then((res)=>{
          this.hasPages = res.hasPages;
        })
      }
    },
    methods:{
      collection(){
        console.log('收藏')
      },
      cancelCollection(){
        console.log('取消收藏')
      },
      goDetails(article){
        console.log(article);
//        this.$store.dispatch('setDetailPageAction',article);
        this.app.aldstat.sendEvent('打开发现文章',{
          '文章名':article.title
        })
        wx.navigateTo({
          url: '../details/main?daily_id='+article.id,
          success:function () {
            wx.setNavigationBarTitle({
              title:article.title
            })
            console.log('跳转成功')
          },
          fail:function () {
            console.log('跳转失败')
          }
        })
      },
      playGame(gameInfo){
        console.log(gameInfo);
        playGame(gameInfo,this.$store,this.app)
      },
    },
  }
</script>

<style lang="scss" scoped>
  $textColor:#4d4d4d;
  .found{
    width: 100%;
    padding: 0.1rem 0 0 0;
    .circle{
      &:first-of-type{
        >h3{
          height: 1rem;
          line-height: 1rem;
          font-size:0.64rem;
          img{
            width: 0.08rem;
            height: 1rem;
          }
        }
      }
      >h3{
        width: 100%;
        color:$textColor;
        height: 0.4rem;
        line-height: 0.4rem;
        font-weight: bold;
        font-size: 0.3rem;
        img{
          width: 0.06rem;
          height: 0.4rem;
          float: left;
          margin: 0 0.15rem 0 0;
        }
      }
      .content{
        width: 7.16rem;
        height: 7.36rem;
        margin: 0.22rem auto 0.2rem auto;
        position: relative;
        border-radius: 0.26rem;
        box-shadow:0 0.1rem 0.5rem 0 rgba(0,0,0,0.1);
        overflow: hidden;
        /*box-shadow: 0 0.3rem 0.2rem #d2d2d2,0 0.4rem 0.2rem #f4f4f4;*/
        .contentTop{
          width: 100%;
          position: absolute;
          left: 0;
          top:0;
          color: #444a59;
          h4{
            font-size: 0.28rem;
            line-height: 0.28rem;
            margin: 0.3rem 0 0.25rem 0.4rem;
          }
          h5{
            margin: 0 0 0 0.4rem;
            max-width: 5.8rem;
            font-size: 0.54rem;
            line-height: 0.54rem;
          }
          .shape{
            width: 0.86rem;
            height: 0.86rem;
            position: absolute;
            right: 0.22rem;
            top:0.36rem;
          }
        }
        .coverImg{
          width: 100%;
          height: 100%;
          /*filter:blur(0.2rem);*/
        }
        >p{
          width: 100%;
          padding: 0 0.3rem;
          font-size:0.26rem;
          position: absolute;
          left: 0;
          top:6.3rem;
        }
        .cover{
          position: absolute;
          left: 0;
          bottom:0;
          width:100%;
          height:1.6rem;
          /*background: rgba(255,255,255,0.6);*/
          overflow: hidden;
          .coverBg{
            width: 7.16rem;
            height: 7.36rem;
            top:-5.76rem;
            position:absolute;
            left:0;
            filter:blur(20rpx);
            border-radius:0.26rem;
          }
          >div{
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top:0;
            background: rgba(255,255,255,0.6);
            .coverLeft{
              width: 1rem;
              height: 1rem;
              float: left;
              margin: 0.3rem 0.2rem 0 0.3rem;
              img{
                width: 100%;
                height: 100%;
              }
            }
            .coverCenter{
              width:calc(100% - 3.4rem);
              height: 100%;
              float: left;
              h3{
                width: 100%;
                height:0.4rem;
                line-height:0.4rem;
                font-size:0.32rem;
                margin: 0.4rem 0 0.1rem 0;
                font-weight:900;
                text-overflow:ellipsis;
                white-space:nowrap;
                overflow:hidden;
                border:none;
              }
              p{
                width: 100%;
                /*color:#444a59;*/
                opacity:0.6;
                height:0.3rem;
                line-height:0.3rem;
                font-size:0.24rem;
                text-overflow:ellipsis;
                white-space:nowrap;
                overflow:hidden;
                border:none;
              }
            }
            .coverRight{
              width: 1.4rem;
              height: 0.8rem;
              line-height: 0.8rem;
              font-size: 0.28rem;
              font-weight: 900;
              text-align:center;
              background-color:#FFC107;
              border-radius:0.06rem;
              color:#fff;
              transition:all 0.1s;
              float: right;
              margin: 0.4rem 0.3rem 0 0 ;
            }
          }
        }
        &.bb{
            .contentTop{
              color: #fff;
            }
            .cover{
              >div{
                background: rgba(0,0,0,0.6);
                .coverCenter{
                  color: #fff;
                }
                .coverRight{
                  background-color:#fff;
                  color:#FFC107;
                }
              }
            }
        }
        &.wb{
            .cover{
              >div{
                background: rgba(0,0,0,0.6);
                .coverCenter{
                  color: #fff;
                }
                .coverRight{
                  background-color:#fff;
                  color:#FFC107;
                }
              }
            }
        }
      }
    }
    .nothing{
      width: 100%;
      p{
        margin: 1rem 0 0 0;
        text-align: center;
      }
    }
  }
</style>
