import api from '../../api/apiList'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: '',
    isZFirst: true,
    isFFirst: true,
    idZ: '',
    idF: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.getStorage({
      key: 'userId',
      success(res) {
        that.setData({
          userId: res.data,
          isZFirst: true,
          isFFirst: true,
        })
      },
    })
    console.log('isZFirst:' + that.data.isZFirst)
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
  // 身份证正面上传
  bindChooiceId: function (event) {
    let that = this
    let cardid = event.currentTarget.dataset.cardid
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      count: 1,
      success(res) {
        console.log(res)
        if (cardid === 'idZ') {
          that.setData({
            isZFirst: false,
            idZ: res.tempFilePaths
          }, () => {
            // console.log(that.data.images)
          })
        } else {
          that.setData({
            isFFirst: false,
            idF: res.tempFilePaths
          }, () => {
            // console.log(that.data.images)
          })
        }
      }
    })
  },
  authentication: function() {
    if (this.data.idZ === '') {
      wx.showToast({
        title: '请上传身份证正面照',
        icon: 'none',
        duration: 1000
      })
    } else if (this.data.idF === '') {
      wx.showToast({
        title: '请上传身份证反面照',
        icon: 'none',
        duration: 1000
      })
    } else {
      let query = {
        userid: this.data.userId,
        idpositiveimg: this.data.idZ.toString(),
        idsideimg: this.data.idF.toString(),
      }
      api.userAuthentication(query).then((res) => {
        console.log(res)
      })
    }
  }
})