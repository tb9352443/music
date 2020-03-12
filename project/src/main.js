import Vue from "vue";
import App from "./App.vue";
import router from './routers/router'
import './style/reset.css'
import axios from 'axios'
import store from './store/store'
import 'animate.css'
import VueLazyLoad from 'vue-lazyload'
Vue.config.productionTip = false;

Vue.prototype.$axios = axios;

Vue.use(VueLazyLoad,{
  preload:1.3,
  error:'/favicon.ico',
  loading:'/favicon.ico',
  attempt:1
})
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
