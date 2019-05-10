import api from '../../api/apiList'
Page({
  data: {
    activeIndex: '0',
    list: [],
    imageUrl: 'http://img1.imgtn.bdimg.com/it/u=2735633715,2749454924&fm=26&gp=0.jpg'
  },
  onShow: function() {
    this.getList()
  },
  toSearch: function () {
    wx.navigateTo({
      url: 'search'
    })
  },
  chosenView: function(event) {
    let id = event.currentTarget.id
    if (id === 'all') {
      this.setData({
        activeIndex: '0'
      })
    } else if (id === 'near') {
      this.setData({
        activeIndex: '1'
      })
    } else if (id === 'praise') {
      this.setData({
        activeIndex: '2'
      })
    }
  },
  getList: function() {
    let that = this
    let params = {
      compSorting: 'NO',
      distanceSorting: 'NO',
      evaluateSorting: 'NO',
    }
    api.getReceipts(params).then((res) => {
      let data = res.data
      if (data.code === 'S0A00000') {
        that.setData({
          list: data.receipts
        })
      }
    })
  },
  toReleaseDetails: function() {
    wx.navigateTo({
      url: 'releaseDetails',
    })
  }
})