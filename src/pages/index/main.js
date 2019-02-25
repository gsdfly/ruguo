import Vue from 'vue'
import App from './index'

//获取app对象
Vue.prototype.app = getApp();

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '如果游戏',
    backgroundColor: "#fff",
    enablePullDownRefresh: true,
    onReachBottomDistance: true,
    backgroundTextStyle:"dark"
  }
}
