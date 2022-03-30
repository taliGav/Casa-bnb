import { createRouter, createWebHashHistory } from 'vue-router';
import home from '@/views/home.vue';
import about from '@/views/about.vue';
import stayApp from '@/views/stay-app.vue';
import stayDetails from '@/views/stay-details.vue';
import userPage from '@/views/user-page.vue';
import addStay from '@/views/host/add-stay.vue';
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
      path: '/stay/:destination?/:dates?/:guests?/:amenities?/:minPrice?/:maxPrice?',
      name: 'stay',
      component: stayApp,
    },
    {
      path: '/stay/:id',
      name: 'stay-details',
      component: stayDetails,
    },
    {
      path: '/user',
      name: 'user-page',
      component: userPage,
    },
    {
      path: '/add-stay',
      name: 'add-stay',
      component: addStay,
    },
  ],
});

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  next();
});

export default router;
