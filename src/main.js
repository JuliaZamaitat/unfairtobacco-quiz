import Vue from 'vue'
import App from './App.vue'
import router from './router'

import VueSplide from '@splidejs/vue-splide'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTimes)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueSplide)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
