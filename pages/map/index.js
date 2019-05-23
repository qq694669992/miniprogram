let date = new Date();
let currentHours = date.getHours();
let currentMinute = date.getMinutes();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    multiArray: [[], [], []],
    multiIndex: [0, 0, 0],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.getLocation({
    //   type: 'gcj02',
    //   success: function(res) {
    //     console.log(res)

    //   },
    // })
    // // wx.chooseLocation({
    // //   success(e) {
    // //     console.log(e)
    // //   }
    // // })
    // wx.openLocation({
    //   latitude: 22.54077,
    //   longitude: 113.94609,
    //   scale: 18
    // })
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
  openStartTime() {
    let Month = []
    let Hours = []
    let Minutes = []

    currentHours = date.getHours();
    currentMinute = date.getMinutes();

    for (let i = 0; i < 30; i++) {
      let dateNew = new Date()
      dateNew.setDate(date.getDate() + i)
      let vm = dateNew.getMonth() + 1 + '月' + dateNew.getDate() + '日'
      Month.push(vm)
    }
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    if (data.multiIndex[0] === 0) {
      if (data.multiIndex[1] === 0) {
        this.loadData(Hours, Minutes);
      } else {
        this.loadMinute(Hours, Minutes);
      }
    } else {
      this.loadHoursMinute(Hours, Minutes);
    }
    data.multiArray[0] = Month;
    data.multiArray[1] = Hours;
    data.multiArray[2] = Minutes;
    this.setData(data);
  },
  startTimeChange(e) {
    console.log(e)
  },
  startTimeColumnChange(e) {
    date = new Date();
    var that = this;
    var monthDay = [];
    var hours = [];
    var minute = [];
    currentHours = date.getHours();
    currentMinute = date.getMinutes();
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    // 把选择的对应值赋值给 multiIndex
    data.multiIndex[e.detail.column] = e.detail.value;
    console.log(data.multiIndex[e.detail.column])
  },
  loadData: function (hours, minute) {
    var minuteIndex;
    if (currentMinute > 0 && currentMinute <= 10) {
      minuteIndex = 10;
    } else if (currentMinute > 10 && currentMinute <= 20) {
      minuteIndex = 20;
    } else if (currentMinute > 20 && currentMinute <= 30) {
      minuteIndex = 30;
    } else if (currentMinute > 30 && currentMinute <= 40) {
      minuteIndex = 40;
    } else if (currentMinute > 40 && currentMinute <= 50) {
      minuteIndex = 50;
    } else {
      minuteIndex = 60;
    }
    if (minuteIndex == 60) {
      // 时
      for (var i = currentHours + 1; i < 24; i++) {
        hours.push(i + '时');
      }
      // 分
      for (var i = 0; i < 60; i += 10) {
        minute.push(i + '分');
      }
    } else {
      // 时
      for (var i = currentHours; i < 24; i++) {
        hours.push(i + '时');
      }
      // 分
      for (var i = minuteIndex; i < 60; i += 10) {
        minute.push(i + '分');
      }
    }
  },
  loadMinute: function (hours, minute) {
    var minuteIndex;
    if (currentMinute > 0 && currentMinute <= 10) {
      minuteIndex = 10;
    } else if (currentMinute > 10 && currentMinute <= 20) {
      minuteIndex = 20;
    } else if (currentMinute > 20 && currentMinute <= 30) {
      minuteIndex = 30;
    } else if (currentMinute > 30 && currentMinute <= 40) {
      minuteIndex = 40;
    } else if (currentMinute > 40 && currentMinute <= 50) {
      minuteIndex = 50;
    } else {
      minuteIndex = 60;
    }

    if (minuteIndex == 60) {
      // 时
      for (var i = currentHours + 1; i < 24; i++) {
        hours.push(i + '时');
      }
    } else {
      // 时
      for (var i = currentHours; i < 24; i++) {
        hours.push(i + '时');
      }
    }
    // 分
    for (var i = 0; i < 60; i += 10) {
      minute.push(i + '分');
    }
  },
  loadHoursMinute: function (hours, minute) {
    // 时
    for (var i = 0; i < 24; i++) {
      hours.push(i + '时');
    }
    // 分
    for (var i = 0; i < 60; i += 10) {
      minute.push(i + '分');
    }
  },
})