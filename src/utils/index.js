import api from '@/api'

export const addGame = (obj,store) => {
  var historyGames = wx.getStorageSync('historyGames');
  if(historyGames){
    //这里如果点击跳转的游戏已经存在了，就不在添加了
    for(let game of historyGames){
      if(game.game_id === obj.game_id){
        return;
      }
    }
    historyGames.push(obj);
  }else {
    historyGames = [obj]
  }
  wx.setStorageSync('historyGames',historyGames)
  store.dispatch('setHistoryGamesAction',historyGames)
}

//跳转小程序，成功之后会将游戏信息存储到本地
export const goToAppLet =  (obj,store) => {
  api.setClick({game_id:obj.game_id,token:store.state.user.token})
  wx.navigateToMiniProgram({
    appId:obj.game_app_id,
    path:obj.game_url,
    success:function () {
      store.commit('setOperation',{})
    },
    fail:function () {
      wx.showToast({
        icon:'none',
        title:'跳转失败,请重试'
      })
    }
  })
}


export const playGame = (gameInfo,store,app) =>{
  /**
   * 用户点击游戏跳转
   * 1.跳转小程序
   * 2.发送阿拉丁统计
   * 3.将游戏添加到本地，即是最近常玩项目
   */
  addGame(gameInfo,store);
  goToAppLet(gameInfo,store);
  app.aldstat.sendEvent('跳转游戏',{
    '游戏名':gameInfo.game_name
  })
}

