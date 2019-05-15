const app = getApp()
import api from '../../api/apiList'
Page({
  data: {
    banner: [],
    list: [],
  },
  onLoad: function(option) {
    this.getList()
  },
  getList: function () {
    let that = this
    api.getIndexList().then(res => {
      let data = res.data
      if (data.code === 'S0A00000') {
        that.setData({
          banner: data.indexVo.advertises,
          list: data.indexVo.works
        })
      }
    })
  }
})