import Vue from 'vue'
import App from './App.vue'
import router from './router'

import VueSplide from '@splidejs/vue-splide'

Vue.use(VueSplide)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
