import Vue from 'vue'
import App from './index'

Vue.prototype.app = getApp();

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '发现',
    backgroundColor: "#fff",
    enablePullDownRefresh: true,
    onReachBottomDistance: true,
    backgroundTextStyle:"dark"
  }
}

