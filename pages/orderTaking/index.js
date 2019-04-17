Page({
  data: {
    activeIndex: '0',
    imageUrl: 'http://img1.imgtn.bdimg.com/it/u=2735633715,2749454924&fm=26&gp=0.jpg'
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
  }
})