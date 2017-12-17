// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//引入axios并注册到vue的$http原型中
import axios from 'axios';
Vue.prototype.$http = axios;

//备忘：icon字体组件没引入，原因，好像可以直接引入icon字体

//饿了吗ui插件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)

//引入iconfont
import 'common/fonts/iconfont.css'

Vue.config.productionTip = false

//引入百度地图并注册
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap,{
  ak:'hCBcm8H8opRLdC0f6OibbGavC0pne1uc'
})

//引入vuex 路径src/store/index.js
import store from 'store'

import 'common/scss/index.scss'

export let vue = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})


