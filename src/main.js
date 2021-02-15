import Vue from 'vue';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from './http';
import VEcharts from 'v-charts-v2';
import echarts from 'echarts';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(Element);
Vue.use(VEcharts);
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;
// console.log(echarts);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
