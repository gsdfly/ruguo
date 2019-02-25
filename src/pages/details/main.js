import Vue from 'vue'
import App from './index'

Vue.prototype.app = getApp();


const app = new Vue(App)

app.$mount()


