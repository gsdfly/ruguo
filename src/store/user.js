import api from './../api'

const state = {
  token:"13123",
  userInfo:{nickName:'玩家'},
  historyGames:[],
  foundList:[],
  detailPage:{},
  operation:{}
}

const mutations = {
  setToken(state,value){
    state.token = value
  },
  setUserInfo(state,obj){
    state.userInfo = obj
  },
  setHistoryGames(state,arr){
    state.historyGames = arr
  },
  setFoundList(state,arr){
    state.foundList = arr
  },
  setDetailPage(state,obj){
    state.detailPage = obj
  },
  setOperation(state,obj){
    state.operation = obj
  }
}

const actions = {
  setTokenAction(ctx,value){
    ctx.commit('setToken',value)
  },
  setUserInfoAction(ctx,obj){
    ctx.commit('setUserInfo',obj)
  },
  setHistoryGamesAction(ctx,arr){
    ctx.commit('setHistoryGames',arr)
  },
  setFoundListAction(ctx,params){
    return new Promise((success,err)=>{
      api.getFoundList(params).then((res)=>{
        console.log(res.data.dailies)
        // 遍历处理时间
        var len = res.data.dailies.length;
        for(var i=0;i<len;i++){
          var arr = res.data.dailies[i].date.split('-');
          res.data.dailies[i].date= arr[1]+'月'+arr[2]+'日'
        }
        var foundList;
        if(params.page ===1){
          foundList = res.data.dailies;
        }else{
          foundList =  ctx.state.foundList.concat(res.data.dailies)
        }
        ctx.commit('setFoundList',foundList)
        success(res.data)
      }).catch((error)=>{
        err(error)
      })
    });
  },
  setDetailPageAction(ctx,params){
    return new Promise((success,err)=>{
      api.getDetail(params).then((res)=>{
        console.log(res.data)
        ctx.commit('setDetailPage',res.data)
        success(res.data)
      }).catch((error)=>{
        err(error)
    })
  })
  },
  setOperationAction(ctx,params) {
    return new Promise((success, err) => {
      api.getOperation(params).then((res)=>{
        if(res.data.length !== 0){
          ctx.commit('setOperation',res.data);
          success(res.data)
        }
      }).catch((error)=>{
        err(error)
    })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
