import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import Login from '../views/Login.vue';
import Index from '../views/Index.vue';
import Home from '../views/Home.vue';
import Statistics from '../views/Statistics.vue';
import GoodLists from '../views/GoodList.vue';
// import AddGood from '../views/AddGood.vue';
import NotFound from '../views/404.vue';
import Register from '../views/Register.vue';
import getPermission from './permission';

Vue.use(VueRouter);

const asyncRouteMap = [
  {
    path: '/index',
    name: 'Index',
    redirect: '/home',
    component: Index,
    children: [
      {
        path: '/home',
        name: 'Home',
        meta: {
          title: '首页',
          hidden: true,
          index: '1',
          icon: 'el-icon-menu',
        },
        component: Home,
      },
      {
        path: '/statistics',
        name: 'Statistics',
        meta: {
          title: '统计',
          hidden: true,
          index: '2',
          icon: 'el-icon-edit-outline',
        },
        component: Statistics,
      },
      {
        path: '/product',
        name: 'Product',
        meta: {
          title: '商品',
          hidden: true,
          index: '3',
          icon: 'el-icon-goods',
        },
        component: () => import('../views/Prouduct.vue'),
        children: [{
          path: '/goodlist',
          name: 'GoodList',
          meta: {
            title: '商品列表',
            hidden: true,
            index: '3-1',
            icon: 'el-icon-tickets',
            superior: '商品',
          },
          component: GoodLists,
        },
        {
          path: '/addgood',
          name: 'AddList',
          component: () => import('../views/AddGood.vue'),
          meta: {
            title: '添加商品',
            hidden: true,
            index: '3-2',
            icon: 'el-icon-edit',
            superior: '商品',
          },
        },
        ],
      },
    ],
  }];
const routes = [{
  path: '/',
  meta: {
    hidden: false,
  },
  redirect: '/login',
},
{
  path: '/login',
  name: 'Login',
  meta: {
    hidden: false,
  },
  component: Login,
},
{
  path: '/register',
  name: 'Register',
  meta: {
    hidden: false,
  },
  component: Register,
},
{
  path: '/notfound',
  name: 'notfound',
  meta: {
    hidden: false,
  },
  component: NotFound,
},
{
  path: '*',
  meta: {
    hidden: false,
  },
  component: NotFound,
},
];
// 解决重复点击路由报错的BUG
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const router = new VueRouter({
  routes,
});

let isAddRoute = false;
router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && to.path !== '/register') {
    if (store.state.userInfo.appkey) {
      if (!isAddRoute) {
        const rolePermission = getPermission(store.state.userInfo.role, asyncRouteMap);
        router.addRoutes(rolePermission);
        store.dispatch('setRoutes', rolePermission);
        isAddRoute = true;
        if (!from.name) {
          return next(to);
        }
      }
      return next();
    }
    return next('/login');
  }
  return next();
});

export default router;
