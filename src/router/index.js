import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/views/Home";
import Topo from "@/views/main/TopoChildren/Topo";
import Emplist from "@/views/main/Empmanage/EmpList/Emplist";
import Login from "@/views/Login/Login";
import Main from "@/views/main/Main";
import NetEquipList from "@/views/AssetsMange/NetEquipList/NetEquipList";
import AssetOverview from "@/views/AssetsMange/AssetOverview";
import EmpOverview from "@/views/main/Empmanage/EmpOverview";
import NetDeviceList from "@/views/AssetsMange/NetDeviceList";
Vue.use(VueRouter);

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
      path: '/main',
      redirect:'/main/emplist',
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      children:[
        {
          path: '/main/home',
          name: 'App',
          component: Home
        },
        {
          path: '/main/topo',
          name: 'Topo',
          component: Topo
        },
        {
          path:'/main/emplist',
          name: "Emplist",
          component:Emplist
        },
        {
          path:'/main/EmpOverview',
          name: "EmpOverview",
          component:EmpOverview
        },
        {
          path:'/main/AssetOverview',
          name: "AssetOverview",
          component:AssetOverview
        },
        {
          path:'/main/NetEquipList',
          name: "NetEquipList",
          component:NetEquipList
        },
        {
          path:'/main/NetDeviceList',
          name: "NetDeviceList",
          component:NetDeviceList
        },




      ]
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
