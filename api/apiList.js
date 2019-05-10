/**
 * 接口列表
 */

import config from '../config.js';

import api from './index';

const path = {
  getIndexList: '/server/pages/index',       //  首页接口
  getUserCenter: '/server/usercenter/getUserCenter',   // 我的获取个人信息
  loginOut: '/server/user/loginOut',  // 退出登录
  userAuthentication: '/server/usercenter/userAuthentication',    //  我的认证

  // 发布
  getTags: '/server/tags/getTags',      //  获取标签

  logincode: '/server/user/logincode',  //  短信登录
};

const getIndexList = (form) => api.get(path.getIndexList, form)

const getUserCenter = (form) => api.get(path.getUserCenter, form)

const loginOut = (form) => api.get(path.loginOut, form)

const userAuthentication = (form) => api.post(path.userAuthentication, form)

const getTags = (form) => api.get(path.getTags, form)

const logincode = (form) => api.post(path.logincode, form)

export default {
  getIndexList,
  getUserCenter,
  loginOut,
  userAuthentication,
  getTags,
  logincode,
};