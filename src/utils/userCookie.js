import Cookie from 'js-cookie';

const userInfoArr = ['username', 'email', 'role', 'appkey'];
/**
 *
 *设置用户cookie
 * @param {Object} params
 */
export function setCookie(params) {
  const userInfo = Object.entries(params);
  userInfo.forEach((item) => {
    Cookie.set(item[0], item[1]);
  });
}
/**
 *
 *获取用户cookie
 * @return {Object}
 */
export function getCookie() {
  const userInfo = {};
  userInfoArr.forEach((item) => {
    userInfo[item] = Cookie.get(item);
  });
  return userInfo;
}
// 移除用户Cookie
export function removeCookie() {
  userInfoArr.forEach((item) => {
    Cookie.remove(item);
  });
}
