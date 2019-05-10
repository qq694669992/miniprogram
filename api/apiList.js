/**
 * 接口列表
 */

import config from '../config.js';

import api from './index';

const path = {
  getIndexList: '/server/pages/index',       //  首页接口
  getReceipts: '/server/pages/getReceipts',            //接单列表
  searchList: '/server/pages/searchList',              // 接单搜索
  getTags: '/server/tags/getTags',      //  获取标签
  release: '/server/work/release',                     //发布
  getUserCenter: '/server/usercenter/getUserCenter',   // 获取我的
  getUserInfo: '/server/usercenter/getUserInfo',       // 个人信息获取
  loginOut: '/server/user/loginOut',  // 退出登录
  userAuthentication: '/server/usercenter/userAuthentication',    //  我的认证
  logincode: '/server/user/logincode',  //  短信登录
};

const getIndexList = (form) => api.get(path.getIndexList, form)       //  首页接口

const getReceipts = (form) => api.get(path.getReceipts, form)         //接单列表

const searchList = (form) => api.get(path.searchList, form)           //接单搜索

const getTags = (form) => api.get(path.getTags, form)                 //  获取标签

const release = (form) => api.post(path.release, form)                //发布

const getUserCenter = (form) => api.get(path.getUserCenter, form)     // 获取我的

const getUserInfo = (form) => api.get(path.getUserInfo, form)         // 个人信息获取

const loginOut = (form) => api.get(path.loginOut, form)               // 退出登录

const userAuthentication = (form) => api.post(path.userAuthentication, form) //  我的认证

const logincode = (form) => api.post(path.logincode, form)            //  短信登录

export default {
  getIndexList,
  getReceipts,
  searchList,
  getTags,
  release,
  getUserCenter,
  loginOut,
  userAuthentication,
  getUserInfo,
  logincode,
};