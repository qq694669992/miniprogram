import api from '../../api/apiList'
import qqmapsdk from '../../api/map'
var date = new Date();
var currentHours = date.getHours();
var currentMinute = date.getMinutes();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: '',
    account: '',
    headImage: '',
    phone: '',
    formUrl: '',
    labelArray: [],
    images: [],
    imagesList: '',
    // startDate: '',
    // endDate: '',
    region: [],
    addressDetails: '',
    isAgree: true,
    startDate: "请选择日期",
    multiArray: [[],[],[]],
    multiIndex: [0, 0, 0],
    startMonth: '',
    startDay: '',
    startHours: '',
    startMinute: '',
    isDisabled: true,
    endDate: "请选择日期",
    multiEndArray: [[],[],[]],
    multiEndIndex: [0, 0, 0],
    endMonth: '',
    endDay: '',
    endHours: '',
    endMinute: '',
    coordinate: '',
    modalCourse: false,
    query: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    console.log(wx.getStorageSync('userId'))
    that.setData({
      formUrl: options.formUrl,
      userId: wx.getStorageSync('userId'),
      account: wx.getStorageSync('account'),
      headImage: wx.getStorageSync('headImage'),
      phone: wx.getStorageSync('phone'),
    })
    this.getLabel()
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
    //判断页面栈里面的页面数是否大于2
    console.log(this.data.formUrl)
    if (getCurrentPages().length == 2) {
      //获取页面栈
      let pages = getCurrentPages()
      //给上一个页面设置状态
      let curPage = pages[pages.length - 2];
      let data = curPage.data;
      curPage.setData({
        'isBack': true,
        'formUrl': this.data.formUrl
      });
    }
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
  // 获取标签
  getLabel: function() {
    let that = this
    api.getTags().then(res => {
      let data = res.data
      if (data.code === 'S0A00000') {
        that.setData({
          labelArray: data.tags
        })
      }
    })
  },

  // 标签选择
  chosenLabel(e) {
    let that = this
    let index = e.currentTarget.dataset.index
    let isChosen = `labelArray[${index}].isChosen`
    that.setData({
      [isChosen]: !that.data.labelArray[index].isChosen
    })
  },

  // 图片上传
  bindChooiceProduct: function() {
    let that = this
    let imagelist = ''
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        let tempFilePaths = res.tempFilePaths
        let newList = that.data.images
        for (let i = 0; i < tempFilePaths.length; i++) {
          // newList.push(tempFilePaths[i])
          let file = tempFilePaths[i]
          api.uploadimg(file).then(res => {
            let data = JSON.parse(res.data)
            if (data.code === 'S0A00000') {
              newList.push(data.imgurl)
              imagelist = imagelist + ',' + data.imgurl
              that.setData({
                images: newList
              })
            }
          })
        }
      }
    })
  },
  bindStartDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startDate: e.detail.value
    })
  },
  bindEndDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endDate: e.detail.value
    })
  },
  bindRegionChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  switchChange(e) {
    this.setData({
      isAgree: e.detail.value
    })
  },
  //获取开始时间日期
  pickerTap: function () {
    date = new Date();

    var monthDay = [];
    var hours = [];
    var minute = [];

    currentHours = date.getHours();
    currentMinute = date.getMinutes();

    // 月-日
    for (var i = 0; i <= 30; i++) {
      var date1 = new Date(date);
      date1.setDate(date.getDate() + i);
      var md = (date1.getMonth() + 1) + "月" + date1.getDate() + '日';
      monthDay.push(md);
    }

    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };

    if (data.multiIndex[0] === 0) {
      if (data.multiIndex[1] === 0) {
        this.loadData(hours, minute);
      } else {
        this.loadMinute(hours, minute);
      }
    } else {
      this.loadHoursMinute(hours, minute);
    }

    data.multiArray[0] = monthDay;
    data.multiArray[1] = hours;
    data.multiArray[2] = minute;

    this.setData(data);
  },




  bindMultiPickerColumnChange: function (e) {
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

    // 然后再判断当前改变的是哪一列,如果是第1列改变
    if (e.detail.column === 0) {
      // 如果第一列滚动到第一行
      if (e.detail.value === 0) {

        that.loadData(hours, minute);

      } else {
        that.loadHoursMinute(hours, minute);
      }

      data.multiIndex[1] = 0;
      data.multiIndex[2] = 0;

      // 如果是第2列改变
    } else if (e.detail.column === 1) {

      // 如果第一列为今天
      if (data.multiIndex[0] === 0) {
        if (e.detail.value === 0) {
          that.loadData(hours, minute);
        } else {
          that.loadMinute(hours, minute);
        }
        // 第一列不为今天
      } else {
        that.loadHoursMinute(hours, minute);
      }
      data.multiIndex[2] = 0;

      // 如果是第3列改变
    } else {
      // 如果第一列为'今天'
      if (data.multiIndex[0] === 0) {

        // 如果第一列为 '今天'并且第二列为当前时间
        if (data.multiIndex[1] === 0) {
          that.loadData(hours, minute);
        } else {
          that.loadMinute(hours, minute);
        }
      } else {
        that.loadHoursMinute(hours, minute);
      }
    }
    data.multiArray[1] = hours;
    data.multiArray[2] = minute;
    this.setData(data);
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

  bindStartMultiPickerChange: function (e) {
    var that = this;
    var monthDay = that.data.multiArray[0][e.detail.value[0]];
    var hours = that.data.multiArray[1][e.detail.value[1]];
    var minute = that.data.multiArray[2][e.detail.value[2]];

    var startDate = monthDay + hours + minute;
    that.setData({
      startDate: startDate,
      startMonth: monthDay.substring(0, monthDay.indexOf('月')),
      startDay: monthDay.substring(monthDay.indexOf('月') + 1, monthDay.indexOf('日')),
      startHours: hours.substr(0, hours.indexOf('时')),
      startMinute: minute.substr(0, minute.indexOf('分')),
      isDisabled: false
    })
  },
  //获取结束时间日期
  pickerEndTap: function () {
    let startData
    if (this.data.startDate === '请选择日期') {
      wx.showToast({
        title: '请先选择开始时间',
        icon: 'none',
        duration: 2000,
      })
    } else {
      startData = new Date().getFullYear() + '/' + this.data.startMonth + '/' + this.data.startDay + ' ' + this.data.startHours + ':' + this.data.startMinute
      date = new Date(startData);
    }
    var monthDay = [];
    var hours = [];
    var minute = [];

    currentHours = date.getHours();
    currentMinute = date.getMinutes();
    // 月-日
    for (var i = 0; i <= 30; i++) {
      var date1 = new Date(date);
      date1.setDate(date.getDate() + i);
      var md = (date1.getMonth() + 1) + "月" + date1.getDate() + '日';
      monthDay.push(md);
    }

    var data = {
      multiEndArray: this.data.multiEndArray,
      multiEndIndex: this.data.multiEndIndex
    };
    console.log(data)
    if (data.multiEndIndex[0] === 0) {
      if (data.multiEndIndex[1] === 0) {
        this.loadEndData(hours, minute);
      } else {
        this.loadEndMinute(hours, minute);
      }
    } else {
      this.loadEndHoursMinute(hours, minute);
    }
    if (data.multiEndArray[1].length === 0 || data.multiEndArray[1].length === 24) {
      for (let j = 0; j < 24; j++) {
        hours.push(j + '时')
      }
      monthDay.splice(0, 1)
    }
    data.multiEndArray[0] = monthDay;
    data.multiEndArray[1] = hours;
    data.multiEndArray[2] = minute;
    this.setData(data);
  },




  bindMultiEndPickerColumnChange: function (e) {
    console.log(e)
    date = new Date(this.data.endDate);
    var that = this;

    var monthDay = [];
    var hours = [];
    var minute = [];

    currentHours = date.getHours();
    currentMinute = date.getMinutes();
    var data = {
      multiEndArray: this.data.multiEndArray,
      multiEndIndex: this.data.multiEndIndex
    };
    // 把选择的对应值赋值给 multiIndex
    data.multiEndIndex[e.detail.column] = e.detail.value;
    // 然后再判断当前改变的是哪一列,如果是第1列改变
    if (e.detail.column === 0) {
      // 如果第一列滚动到第一行
      if (e.detail.value === 0) {

        that.loadEndData(hours, minute);

      } else {
        that.loadEndHoursMinute(hours, minute);
      }

      data.multiEndIndex[1] = 0;
      data.multiEndIndex[2] = 0;

      // 如果是第2列改变
    } else if (e.detail.column === 1) {

      // 如果第一列为今天
      if (data.multiEndIndex[0] === 0) {
        // if (e.detail.value === 0) {
        //   that.loadEndData(hours, minute);
        // } else {
        //   that.loadEndMinute(hours, minute);
        // }
        that.loadEndData(hours, minute);
        // 第一列不为今天
      } else {
        that.loadEndHoursMinute(hours, minute);
      }
      data.multiEndIndex[2] = 0;

      // 如果是第3列改变
    } else {
      // 如果第一列为'今天'
      if (data.multiEndIndex[0] === 0) {

        // 如果第一列为 '今天'并且第二列为当前时间
        if (data.multiEndIndex[1] === 0) {
          that.loadEndData(hours, minute);
        } else {
          that.loadEndMinute(hours, minute);
        }
      } else {
        that.loadEndHoursMinute(hours, minute);
      }
    }
    data.multiEndArray[1] = hours;
    data.multiEndArray[2] = minute;
    this.setData(data);
  },

  loadEndData: function (hours, minute) {
    var minuteIndex;
    let currentMinute = this.data.startMinute
    let startHours = parseInt(this.data.startHours) + 1
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
      for (var i = startHours; i < 24; i++) {
        hours.push(i + '时');
      }
      // 分
      for (var i = 0; i < 60; i += 10) {
        minute.push(i + '分');
      }
    } else {
      // 时
      for (var i = startHours; i < 24; i++) {
        hours.push(i + '时');
      }
      // 分
      for (var i = minuteIndex; i < 60; i += 10) {
        minute.push(i + '分');
      }
    }
  },

  loadEndHoursMinute: function (hours, minute) {
    // 时
    for (var i = 0; i < 24; i++) {
      hours.push(i + '时');
    }
    // 分
    for (var i = 0; i < 60; i += 10) {
      minute.push(i + '分');
    }
  },

  loadEndMinute: function (hours, minute) {
    var minuteIndex;
    let currentMinute = this.data.startMinute
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
      for (var i = Number(this.data.startHours) + 1 + 1; i < 24; i++) {
        hours.push(i + '时');
      }
    } else {
      // 时
      for (var i = Number(this.data.startHours) + 1; i < 24; i++) {
        hours.push(i + '时');
      }
    }
    // 分
    for (var i = 0; i < 60; i += 10) {
      minute.push(i + '分');
    }
  },

  bindEndMultiPickerChange: function (e) {
    var that = this;
    var monthDay = that.data.multiEndArray[0][e.detail.value[0]];
    var hours = that.data.multiEndArray[1][e.detail.value[1]];
    var minute = that.data.multiEndArray[2][e.detail.value[2]];
    // if (monthDay === "今天") {
    //   var month = date.getMonth() + 1;
    //   var day = date.getDate();
    //   monthDay = month + "月" + day + "日";
    // } else if (monthDay === "明天") {
    //   var date1 = new Date(date);
    //   date1.setDate(date.getDate() + 1);
    //   monthDay = (date1.getMonth() + 1) + "月" + date1.getDate() + "日";

    // } else {
    //   var month = monthDay.split("-")[0]; // 返回月
    //   var day = monthDay.split("-")[1]; // 返回日
    //   monthDay = month + "月" + day + "日";
    // }

    var endDate = monthDay + hours + minute;
    that.setData({
      endDate: endDate,
      endMonth: monthDay.substring(0, monthDay.indexOf('月')),
      endDay: monthDay.substring(monthDay.indexOf('月') + 1, monthDay.indexOf('日')),
      endHours: hours.substr(0, hours.indexOf('时')),
      endMinute: minute.substr(0, minute.indexOf('分')),
    })
  },

  blurAddress(e) {
    let that = this
    if (that.data.region.length === 0) {
      that.setData({
        region: wx.getStorageSync('location')
      })
    }
    let query = {
      region: that.data.region[1],
      address: e.detail.value
    }
    console.log(query)
    // qqmapsdk.getQQGeocoder(e.detail.value, (res) => {
    //   console.log(res)
    // })
    api.geocoder(query).then( res => {
      console.log(res)
      let data = res.data
      if (data.code === 'S0A00000') {
        this.setData({
          coordinate: data.latxy
        })
      }
    })
  },

  toAgreement(e) {
    wx.navigateTo({
      url: '../../pages/myPage/userAgreement',
    })
  },

  release:function (e) {
    let that = this
    let tags = ''
    for (let i in that.data.labelArray) {
      if (that.data.labelArray[i].isChosen) {
        tags += that.data.labelArray[i].tagName + ','
      }
    }
    let startTime = '2019-' + (that.data.startMonth < 10 ? '0' + that.data.startMonth : that.data.startMonth) + '-' + (that.data.startDay < 10 ? '0' + that.data.startDay : that.data.startDay) + ' ' + (that.data.startHours < 10 ? '0' + that.data.startHours : that.data.startHours) + ':' + (that.data.startMinute < 10 ? '0' + that.data.startMinute : that.data.startMinute) + ':00'
    let endTime = '2019-' + (that.data.endMonth < 10 ? '0' + that.data.endMonth : that.data.endMonth) + '-' + (that.data.endDay < 10 ? '0' + that.data.endDay : that.data.endDay) + ' ' + (that.data.endHours < 10 ? '0' + that.data.endHours : that.data.endHours) + ':' + (that.data.endMinute < 10 ? '0' + that.data.endMinute : that.data.endMinute) + ':00'
    if (e.detail.value.title.trim() === '') {
      wx.showToast({
        title: '标题不能为空',
        icon: 'none',
        duration: 1000,
      })
    } else if (e.detail.value.price.trim() === '') {
      wx.showToast({
        title: '总金额不能为空',
        icon: 'none',
        duration: 1000,
      })
    } else if (tags === '') {
      wx.showToast({
        title: '至少选择一个标签',
        icon: 'none',
        duration: 1000,
      })
    } else if (that.data.startDate === '请选择日期') {
      wx.showToast({
        title: '请选择开始时间',
        icon: 'none',
        duration: 1000,
      })
    } else if (that.data.endDate === '请选择日期') {
      wx.showToast({
        title: '请选择结束时间',
        icon: 'none',
        duration: 1000,
      })
    } else if (e.detail.value.address.trim() === '') {
      wx.showToast({
        title: '请填写发布地址',
        icon: 'none',
        duration: 1000,
      })
    } else {
      let query = {
        title: e.detail.value.title.trim(),         // 标题
        jobNumber: '1',                             //  工作人数
        totalPrice: e.detail.value.price,           // 总金额
        userId: that.data.userId,                          //  用户id
        coordinate: that.data.coordinate,                  //  坐标
        address: e.detail.value.address.trim(),     //  详细地址
        tags: tags.substr(0, tags.length - 1),      //  标签
        requirement: '11111',                       //  零工要求
        jobDescription: e.detail.value.work.trim(), //  工作内容
        startTime: startTime,                       //  开始时间
        endTime: endTime,                           //  结束时间
        account: that.data.account,                      //  用户名
        phone: that.data.phone,                       //  手机号码
        headImage: that.data.headImage,                        //  用户头像
        images: that.data.images.join(','),                   //  图片
        city: that.data.region[0],                  //  城市
        area: that.data.region[1]                   //  区域
      }
      this.setData({
        modalCourse: true,
        query: query,
      })
    }
  },
  // 进程弹出框显示
  // courseShow() {
  //   this.setData({
  //     modalCourse: true
  //   })
  // },
  // 关闭
  hideModal() {
    this.setData({
      modalCourse: false
    })
  },
  queryPay() {
    console.log(this.data.query)
    api.release(this.data.query).then((res) => {
      console.log(res)
      let data = res.data
      if (data.code === 'S0A00000') {
        wx.showToast({
          title: '发布成功',
          icon: 'none',
          duration: 1000,
        })
        setTimeout(function () {
          wx.switchTab({
            url: '/pages/orderTaking/index',
          })
        }, 1000)
      }
    })
  },
  myCatchTouch: function () {
    return;
  },
  mycatchtap() {
    return;
  },
})