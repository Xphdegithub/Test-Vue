import axios from 'axios';
import { Loading } from 'element-ui';

axios.defaults.baseURL = 'https://mallapi.duyiedu.com';
// loading实例
let loading;
// 开启加载动画
function startLoading() {
  loading = Loading.service({
    lock: true,
    text: '拼命加载中',
    background: 'rgba(0, 0, 0, .5)',
  });
}
// 关闭加载动画
function endLoading() {
  loading.close();
}
// 请求拦截
axios.interceptors.request.use((config) => {
  startLoading();
  return config;
});
// 响应拦截
axios.interceptors.response.use((resp) => {
  setTimeout(() => {
    endLoading();
  }, 300);
  return resp.data;
});

export default axios;
