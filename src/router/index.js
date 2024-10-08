import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router








// import Vue from 'vue';
// import Router from 'vue-router';
// import RouteService from './routeGuard'; // Import the route guard

// Vue.use(Router);

// const routes = [
//   {
//     path: '/admin',
//     name: 'AdminDashboard',
//     component: () => import('./views/AdminDashboard.vue'),
//     beforeEnter: (to, from, next) => {
//       // Check for admin role permission before entering this route
//       const canAccess = RouteService('admin_access', to);
//       if (canAccess === true) {
//         next();
//       } else if (typeof canAccess === 'string') {
//         next(canAccess); // Redirect to the URL (e.g., signin or unauthorized)
//       }
//     },
//   },
//   {
//     path: '/employee',
//     name: 'EmployeeDashboard',
//     component: () => import('./views/EmployeeDashboard.vue'),
//     beforeEnter: (to, from, next) => {
//       // Check for employee role permission before entering this route
//       const canAccess = RouteService('employee_access', to);
//       if (canAccess === true) {
//         next();
//       } else if (typeof canAccess === 'string') {
//         next(canAccess);
//       }
//     },
//   },
//   {
//     path: '/hr',
//     name: 'HRDashboard',
//     component: () => import('./views/HRDashboard.vue'),
//     beforeEnter: (to, from, next) => {
//       // Check for HR role permission before entering this route
//       const canAccess = RouteService('hr_access', to);
//       if (canAccess === true) {
//         next();
//       } else if (typeof canAccess === 'string') {
//         next(canAccess);
//       }
//     },
//   },
//   {
//     path: '/signin',
//     name: 'Signin',
//     component: () => import('./views/Signin.vue'),
//   },
//   {
//     path: '/unauthorized',
//     name: 'Unauthorized',
//     component: () => import('./views/Unauthorized.vue'),
//   },
// ];

// const router = new Router({
//   mode: 'history',
//   routes,
// });

// export default router;

