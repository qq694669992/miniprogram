Page({
  data: {
    keyword: '',
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
  searchInput(e) {
    this.setData({
      keyword: e.detail.value
    })
  },
  toSearchResult: function() {
    wx.navigateTo({
      url: 'searchResult?keyword=' + this.data.keyword
    })
  }
})