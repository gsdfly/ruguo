import './../static/sdk/ald-stat'
import Vue from 'vue'
import App from './App'
import store from './store'
import CONFIG from './config'

Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$store = store;
Vue.prototype.imgUrl = CONFIG.imgUrl;


const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [
      "pages/welcome/main",
      "pages/error/main",
      "^pages/index/main",
      "pages/details/main",
      "pages/found/main",
      "pages/my/main",
      "pages/historyGames/main",
      "pages/myCollection/main"
    ],
    window: {
      "backgroundTextStyle": "light",
      "navigationBarBackgroundColor": "#fff",
      "navigationBarTitleText": "如果游戏",
      "navigationBarTextStyle": "black"
    },
    tabBar: {
      list: [
        {
          "pagePath": "pages/index/main",
          "text": "游戏库",
          "iconPath": "static/imgs/game.png",
          "selectedIconPath": "static/imgs/game_active.png"
        },
        {
          "pagePath": "pages/found/main",
          "text": "发现",
          "iconPath": "static/imgs/found.png",
          "selectedIconPath": "static/imgs/found_active.png"
        },
        {
          "pagePath": "pages/my/main",
          "text": "我的",
          "iconPath": "static/imgs/my.png",
          "selectedIconPath": "static/imgs/my_active.png"
        }
      ],
      color: "#626262",
      selectedColor: "#000000",
      borderStyle: "white"
    },
    networkTimeout: {
      "request": 10000,
      "downloadFile": 10000
    }
  }
}
