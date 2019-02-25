import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

//获取app对象
Vue.prototype.app = getApp();


