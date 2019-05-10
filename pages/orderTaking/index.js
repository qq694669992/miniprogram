import api from '../../api/apiList'
Page({
  data: {
    activeIndex: '0',
    list: [],
    compSorting: 'YES',
    distanceSorting: 'NO',
    evaluateSorting: 'NO',
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
        activeIndex: '0',
        compSorting: 'YES',
        distanceSorting: 'NO',
        evaluateSorting: 'NO',
      })
    } else if (id === 'near') {
      this.setData({
        activeIndex: '1',
        compSorting: 'NO',
        distanceSorting: 'YES',
        evaluateSorting: 'NO',
      })
    } else if (id === 'praise') {
      this.setData({
        activeIndex: '2',
        compSorting: 'NO',
        distanceSorting: 'NO',
        evaluateSorting: 'YES',
      })
    }
    this.getList()
  },
  getList: function() {
    let that = this
    let params = {
      compSorting: that.data.compSorting,
      distanceSorting: that.data.distanceSorting,
      evaluateSorting: that.data.evaluateSorting,
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