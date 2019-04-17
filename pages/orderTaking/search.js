Page({
  data: {
    searchHistory: [
      {
        name: '擦窗'
      },
      {
        name: '洗空调'
      },
      {
        name: '洗空调'
      },
      {
        name: '清洗抽油烟机'
      },
      {
        name: '零工'
      },
      {
        name: '临时工'
      },
      {
        name: '洗冰箱'
      },
      {
        name: '清洗办公室'
      }
    ],
    hotSearch: [
      {
        name: '擦窗'
      },
      {
        name: '洗空调'
      },
      {
        name: '洗空调'
      },
      {
        name: '清洗抽油烟机'
      },
      {
        name: '零工'
      },
      {
        name: '临时工'
      },
      {
        name: '洗冰箱'
      },
      {
        name: '清洗办公室'
      }
    ],
  },
  // searchInput: function() {
  //   this.setData({
  //     isShow: true
  //   })
  // },
  // searchBlur: function() {
  //   this.setData({
  //     isShow: false
  //   })
  // },
  toSearchResult: function() {
    wx.navigateTo({
      url: 'searchResult'
    })
  }
})