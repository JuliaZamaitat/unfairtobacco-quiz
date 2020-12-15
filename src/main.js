import Vue from 'vue'
import App from './App.vue'
import router from './router'

import VueSplide from '@splidejs/vue-splide'
import VueConfetti from 'vue-confetti'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes, faHandPointUp } from '@fortawesome/free-solid-svg-icons'
import {  faTwitterSquare, faFacebookSquare, faYoutubeSquare, faInstagramSquare } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTimes, faTwitterSquare, faFacebookSquare, faYoutubeSquare, faInstagramSquare, faHandPointUp)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('pulse-loader', PulseLoader);

Vue.use(VueSplide)
Vue.use(VueConfetti)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
