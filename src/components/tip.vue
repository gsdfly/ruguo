<template>
  <div class="tip">
    <div class="tip-main">
      <img v-if="operation.image" @click="playGame" class="gameImg" :src="imgUrl+operation.image" alt="" mode="widthFix"/>
      <img src="http://res.catchme.com.cn/imgs-2017-12-29-20-42/icon_close.png" alt="" class="close"  @click="closeBg"/>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    data(){
      return {
        imgUrl:this.imgUrl
      }
    },
    computed: mapState({
      operation: state => state.user.operation,
    }),
    methods:{
      closeBg(){
        this.$store.commit('setOperation',{});
      },
      playGame(){
        this.$emit('playGame',this.operation.game);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tip{
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top:0;
    background: rgba(0,0,0,0.72);
    .tip-main{
      position: absolute;
      left: 50%;
      top:50%;
      transform: translate(-50%,-50%);
      width: 90%;
      .gameImg{
        width: 100%;
      }
      .close{
        width: 0.82rem;
        height: 0.82rem;
        margin: 0.4rem auto 0 auto;
      }
    }
  }
</style>
