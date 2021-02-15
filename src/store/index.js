import Vue from 'vue';
import Vuex from 'vuex';
import { setCookie, getCookie, removeCookie } from '@/utils/userCookie';
import storeType from './store-types';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 用户信息
    userInfo: getCookie(),
    // 侧边栏路由列表
    routesList: [],
    // 面包屑
    crumbData: [
      {
        title: '首页',
        path: '/home'
      }
    ]
  },
  mutations: {
    // 设置用户信息【userInfo】
    [storeType.SET_USER_INFO](state, userInfo) {
      state.userInfo = userInfo;
    },
    // 清除用户信息【userInfo】
    [storeType.LOGOUT](state) {
      state.userInfo = {
        username: '',
        appkey: '',
        email: '',
        role: '',
      };
    },
    // 设置路由列表
    [storeType.SET_ROUTES](state, routes) {
      state.routesList = routes;
    },
    // 设置面包屑
    [storeType.SET_BREADCRUMB] (state, crumbData) {
      state.crumbData = [crumbData];
    },
  },
  actions: {
    setUserCookie({ commit }, userInfo) {
      commit(storeType.SET_USER_INFO, userInfo);
      setCookie(userInfo);
    },
    logout({ commit }) {
      commit(storeType.LOGOUT);
      removeCookie();
    },
    setRoutes({ commit }, routes) {
      commit(storeType.SET_ROUTES, routes);
    },
    setCrumbData ({commit}, crumbData) {
      commit(storeType.SET_BREADCRUMB, crumbData);
    }
  },
  modules: {
  },
});
