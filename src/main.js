import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'

Vue.use(ElementUI);
Vue.config.productionTip = false

import echarts from 'echarts'
Vue.prototype.$echarts = echarts

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
