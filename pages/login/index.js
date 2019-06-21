// pages/login/index.js
import api from '../../api/apiList'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.login({
      success(res) {
        console.log(res)
        if (res.errMsg === 'login:ok') {
          let query = {
            code: res.code
          }
          api.getOpenid(query).then((res) => {
            let data = res.data
            if (data.code === 'S0A00000') {
              wx.setStorageSync('openId', data.openid)
              wx.setStorageSync('sessionKey', data.session_key)
            }
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  toGetPhone(e) {
    console.log(e)
    let data = e.detail
    if (data.errMsg === 'getPhoneNumber:ok') {
      wx.checkSession({
        success(e) {
          console.log(e)
          if (e.errMsg === 'checkSession:ok') {
            let query = {
              session_key: wx.getStorageSync('sessionKey'),
              encryptedData: data.encryptedData,
              iv: data.iv
            }
            api.getDecryptByMobile(query).then((res) => {
              let data = res.data
              if (data.code === 'S0A00000') {
                wx.setStorageSync('phoneNumber', JSON.parse(data.data).phoneNumber)
                let query = {
                  openid: wx.getStorageSync('openId'),
                  mobile: wx.getStorageSync('phoneNumber')
                }
                api.wxlogin(query).then((res) => {
                  let dataList = res.data
                  if (dataList.code === 'S0A00000') {
                    wx.setStorageSync('userId', dataList.userid)
                    wx.switchTab({
                      url: '/pages/myPage/index',
                    })
                  }
                })
              }
            })
          }
        }
      })
    }
  },
  toPhoneLogin: function () {
    wx.navigateTo({
      url: 'phoneLogin'
    })
  }
})