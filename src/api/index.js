import CONFIG from './../config'
import Fly from 'flyio/dist/npm/wx'
var fly = new Fly();


fly.config.baseURL=CONFIG.url+'api/';
//写一个拦截器，处理请求的各种情况
//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  (response) => {
    //只将请求结果的data字段返回
    return Promise.resolve(response.data);
  },
  (err) => {
    //发生网络错误后会走到这里
    wx.reLaunch({
      url:'/pages/error/main',
      success:function () {
        console.log('跳转成功');
      },
      fail:function (res) {
        console.log(res);
      }
    })
    return Promise.reject("网络错误")
  }
)

export default {
  // onLogin: function (params) {
  //   return fly.post('api/mini/onLogin', Object.assign({}, {token: CONFIG.token}, params))
  // },
  onLogin:function (params) {
    return fly.post('mini/login',params)
  },
  auth:function (params) {
    return fly.post('mini/auth',params)
  },
  getBanner:function (params) {
    return fly.get('banner',params)
  },
  getGameList:function (params) {
    return fly.get('tag',params)
  },
  setClick:function (params) {
    return fly.get('click',params)
  },
  getFoundList:function (params) {
    return fly.get('dailies',params)
  },
  getDetail:function (params) {
    return fly.get('daily',params)
  },
  //获取进来推荐游戏
  getOperation:function (params) {
    return fly.get('operation',params)
  }
  // getGameList:function (params) {
  //   return fly.get('https://h5game-websocket.gametall.com/gamebox/billboard/list',params)
  // },
  // test:function (params) {
  //   return fly.get('https://front.nocrush.xyz/api/banner',params)
  // }
}
