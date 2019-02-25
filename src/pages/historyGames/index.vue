<template>
  <div class="historyGames">
    <h1>历史游戏页面</h1>
    <div v-for="(game,index) in historyGames" :key="index">
      {{game.name}}
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name:'historyGames',
    computed:mapState({
      historyGames:state => state.user.historyGames,
    }),
  }
</script>

<style lang="scss" scoped>

</style>
