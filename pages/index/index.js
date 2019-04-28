Page({
  data: {
    banner: [],
    list: [],
  },
  onShow: function() {
    this.getList()
  },
  getList: function () {
    let that = this
    wx.request({
      url: 'https://www.paizhao66.net/server/pages/index',
      data: {},
      method: 'GET',
      success: function(res) {
        let data = res.data
        console.log(data)
        if (data.code === 'S0A00000') {
          that.setData({
            banner: data.indexVo.advertises,
            list: data.indexVo.works
          })
        }
      }
    })
  }
})