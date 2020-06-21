import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/views/Home";
import Topo from "@/views/Topo/Topo";
import Login from "@/views/Login/Login";
import Manage from "@/views/manage/Manage";
import {MangeChildren} from "@/router/manage";

Vue.use(VueRouter);

// 注意：以 “ / ”开头的都会被当成从根路径开始

  const routes = [{
      path: '/',
      redirect:'/login',
  },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
  }
  ,
    {
      path: '/home',
      name: 'App',
      component: Home
    },
    {
      path: '/topo',
      name: 'Topo',
      component: Topo
    },
    // {
    //   path: '/manage',
    //   redirect:'/manage/EmpOverview',
    // },
    {
      path: '/manage/',
      name: 'Manage',
      component: Manage,
      children:MangeChildren
    }

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];

const router = new VueRouter({
  routes,
  mode:"history"
});

export default router
