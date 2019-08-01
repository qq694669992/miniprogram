/**
 * 接口列表
 */

import config from '../config.js';

import api from './index';

const path = {
  getIndexList: '/server/pages/index',       //  首页接口
  workcomplete: '/server/pages/workcomplete',          //更多列表
  getReceipts: '/server/pages/getReceipts',            //接单列表
  searchList: '/server/pages/searchList',              // 接单搜索
  getWorkDetails: '/server/work/getWorkDetails',    // 发布详情
  getTags: '/server/tags/getTags',      //  获取标签
  release: '/server/work/release',                     //发布
  getUserCenter: '/server/usercenter/getUserCenter',   // 获取我的
  getUserInfo: '/server/usercenter/getUserInfo',       // 个人信息获取
  loginOut: '/server/user/loginOut',  // 退出登录
  uploadimg: '/server/uploadfile/uploadimg',                             //  上传图片
  userAuthentication: '/server/usercenter/userAuthentication',    //  我的认证
  getOpenid: '/server/wxlogin/getOpenid',                         //  获取openId
  getDecryptByMobile: '/server/wxlogin/getDecryptByMobile',       //  获取微信手机号码
  wxlogin: '/server/wxlogin/wxlogin',                             //  微信号码登录
  getVcode: '/server/user/getVcode',                              //  获取手机验证码
  logincode: '/server/user/logincode',  //  短信登录
  getUserBalance: '/server/usercenter/getUserBalance',  //  用户余额
  userRecharge: '/server/usercenter/userRecharge',                //  充值
  cashWithdrawal: '/server/usercenter/cashWithdrawal',            //  提现
  geocoder: '/server/txmap/geocoder',                             //  获取经纬度
  getOrderList: '/server/order/getOrderList',                     //  我的订单列表
  getWorks: '/server/work/getWorks',                              //  我的发布列表
  addOrder: '/server/order/addOrder',                             //  立即接单
  getOrderDetails: '/server/order/getOrderDetails',               //  订单详情
  addComment: '/server/order/addComment',                         //  评价
};

const getIndexList = (form) => api.get(path.getIndexList, form)       //  首页接口

const workcomplete = (form) => api.get(path.workcomplete, form)       //更多列表

const getReceipts = (form) => api.get(path.getReceipts, form)         //接单列表

const searchList = (form) => api.get(path.searchList, form)           //接单搜索

const getWorkDetails = (form) => api.get(path.getWorkDetails, form)   //发布详情

const getTags = (form) => api.get(path.getTags, form)                 //  获取标签

const release = (form) => api.post(path.release, form)                //发布

const getUserCenter = (form) => api.get(path.getUserCenter, form)     // 获取我的

const getUserInfo = (form) => api.get(path.getUserInfo, form)         // 个人信息获取

const loginOut = (form) => api.get(path.loginOut, form)               // 退出登录

const uploadimg = (filePath) => api.uploadFile(path.uploadimg, filePath)      // 上传图片

const userAuthentication = (form) => api.post(path.userAuthentication, form) //  我的认证

const getOpenid = (form) => api.get(path.getOpenid, form)            //  获取openId

const getDecryptByMobile = (form) => api.get(path.getDecryptByMobile, form)    //  获取手机微信号码

const wxlogin = (form) => api.get(path.wxlogin, form)                 //  微信号码登录

const getVcode = (form) => api.get(path.getVcode, form)               //  获取手机验证码

const logincode = (form) => api.post(path.logincode, form)            //  短信登录

const getUserBalance = (form) => api.get(path.getUserBalance, form)   //  用户余额

const userRecharge = (form) => api.post(path.userRecharge, form)      //  充值

const cashWithdrawal = (form) => api.post(path.cashWithdrawal, form)  //  提现

const geocoder = (form) => api.get(path.geocoder, form)               //  获取经纬度

const getOrderList = (form) => api.get(path.getOrderList, form)       //  我的订单列表

const getWorks = (form) => api.get(path.getWorks, form)               //  我的发布列表

const addOrder = (form) => api.post(path.addOrder, form)               //  立即接单

const getOrderDetails = (form) => api.get(path.getOrderDetails, form)  //  订单详情

const addComment = (form) => api.post(path.addComment, form)            //  评价

export default {
  getIndexList,
  workcomplete,
  getReceipts,
  searchList,
  getWorkDetails,
  getTags,
  release,
  getUserCenter,
  loginOut,
  uploadimg,
  userAuthentication,
  getUserInfo,
  getOpenid,
  getDecryptByMobile,
  wxlogin,
  getVcode,
  logincode,
  getUserBalance,
  userRecharge,
  cashWithdrawal,
  geocoder,
  getOrderList,
  getWorks,
  addOrder,
  getOrderDetails,
  addComment,
};