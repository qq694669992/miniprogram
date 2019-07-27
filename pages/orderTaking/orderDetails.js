import api from '../../api/apiList'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recruitId: '',
    list: [],
    labelArray: [],
    images: [],
    longitude: '',
    latitude: '',
    isAgree: false,
    markers: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      recruitId: options.recruitId
    })
    this.getDetails()
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
  getDetails() {
    let query = {
      recruitId: this.data.recruitId
    }
    api.getWorkDetails(query).then((res) => {
      console.log(res.data)
      let data = res.data
      if (data.code === 'S0A00000') {
        let longitude = data.workDetails.coordinate.split(',')[1]
        let latitude = data.workDetails.coordinate.split(',')[0]
        let markers = [{
          longitude: longitude,
          latitude: latitude,
        }]
        this.setData({
          list: data.workDetails,
          labelArray: data.workDetails.tags.split(','),
          images: data.workDetails.images && data.workDetails.images !== 'null' ? data.workDetails.images.split(',') : '',
          longitude: longitude,
          latitude: latitude,
          markers: markers,
        })
        console.log(this.data)
      }
    })
  },
  switchChange(e) {
    this.setData({
      isAgree: e.detail.value
    })
    console.log(this.data.isAgree)
  },
})