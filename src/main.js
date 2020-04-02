import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import 'lib-flexible/flexible'
import '@/iconfont/iconfont.styl'
import "@/util/vaildate.js"



import VueAwesomeSwiper from 'vue-awesome-swiper'
// import style
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)



Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
