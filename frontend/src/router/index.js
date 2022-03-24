import { createRouter, createWebHashHistory } from 'vue-router'
import home from '@/views/home.vue'
import about from '@/views/about.vue'
import stayApp from '@/views/stay-app.vue'
import stayDetails from '@/views/stay-details.vue'
// import stayEdit from '@/views/stay-edit.vue'
// import dashboard from '@/views/dashboard.vue'
// import login from '@/views/login.vue'
// import userDetails from '@/views/user-details.vue'
// import reviewsExplore from '@/views/reviews-explore.vue'

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
    },
    {
      path: '/stay/:destination?/:dates?/:guests?/:amenities?',
      name: 'stay',
      component: stayApp,
    },
    {
      path: '/stay/:id',
      name: 'stay-details',
      component: stayDetails,
    },
    // {
    //   path: '/stay/edit/:id?',
    //   name: 'stay-edit',
    //   component: stayEdit,
    // },
    // {
    //   path: '/dashboard',
    //   name: 'dashboard',
    //   component: dashboard,
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: about,
    // },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: login,
    // },
    // {
    //   path: '/user',
    //   name: 'user',
    //   component: userDetails,
    // },
    // {
    //   path: '/review',
    //   name: 'review',
    //   component: reviewsExplore,
    // },
  ],
})

export default router
