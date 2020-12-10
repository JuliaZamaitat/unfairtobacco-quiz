import Vue from 'vue'
import App from './App.vue'
import router from './router'

import VueSplide from '@splidejs/vue-splide'

import vSelect from "vue-select";
Vue.component("v-select", vSelect);

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import {  faTwitterSquare, faFacebookSquare, faYoutubeSquare, faInstagramSquare } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTimes, faTwitterSquare, faFacebookSquare, faYoutubeSquare, faInstagramSquare)
Vue.component('font-awesome-icon', FontAwesomeIcon)


Vue.use(VueSplide)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
