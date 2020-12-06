import Vue from 'vue'
import VueRouter from 'vue-router'
import Diashows from '@/components/Diashows'
import Slider from '@/components/Slider'
import Quiz from '@/components/Quiz'


Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/slider',
      name: 'Slider',
      component: Slider
    },
    {
      path: '/',
      name: 'Diashows',
      component: Diashows
    },
    {
      path: '/quiz/:id',
      name: 'Quiz',
      component: Quiz,
      props: true
    }
    
  ]
})
