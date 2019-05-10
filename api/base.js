const app = getApp()
import config from '../config'

/**
 * 封装微信 wx.request 请求方法
 * get
 * post
 */

const apiFun = () => {};

/**
 * 判断传入参数的类型，以字符串的形式返回
 * @obj: 数据
 */
const dataType = (obj) => {
  if (obj === null) return 'Null';
  if (obj === undefined) return 'Undefined';
  return Object.prototype.toString.call(obj).slice(8, -1);
};

/**
 * 处理对象参数值,排除对象参数值为""、null、undefined,并返回一个新对象
 */
const dealObjectValue = (obj) => {
  let param = {};
  if (obj === null || obj === undefined || obj === "") return param;
  for (var key in obj) {
    if (dataType(obj[key]) === 'Object') {
      param[key] = dealObjectValue(obj[key])
    } else if (obj[key] !== null && obj[key] !== undefined && obj[key] !== "") {
      param[key] = obj[key];
    }
  }
  return param;
}

const urlParams = (url, params) => {
  let ret = decodeURIComponent(url);

  let retUrl = ret.match(/(.*)\?(.*)/);
  let urlParmasHave = '';
  
  if (retUrl && retUrl.length > 0) {
    ret = retUrl[1];
    urlParmasHave = retUrl[2] || '';
  }

  const arr = urlParmasHave.split('&');

  let data = {}
  if (arr && arr.length) {
    for (let i = 0; i < arr.length; i+=1) {
      const item = arr[i]
      if (item) {
        const itemArr = item.split('=');
        data[itemArr[0]] = itemArr[1]
      }
    }
  }

  data = {
    ...data,
    ...params,
  };

  if (data && typeof data === 'object') {
    const keys = Object.keys(data);
    if (keys && keys.length) {
      ret += '?';
      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i]
        if (data[key] !== null) {
          ret += `${i === 0 ? '' : '&'}${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`;
        }
      }
    }
  }
  return ret
};

apiFun.prototype = {
  baseUrl: '',
  params: {},
  request: undefined,
  response: undefined,
  /**
   * 初始化api的基础参数
   * @type {*} Object
   * @param {*} baseUrl  接口路径
   * @param {*} params   基础参数，接口入参
   * @param {*} request  请求拦截器
   * @param {*} response 回调拦截器
   */
  setOption(data) {
    this.baseUrl = data.baseUrl || '';
    this.params = data.params || {};
    this.request = data.request || undefined;
    this.response = data.response || undefined;
    return this
  },

  /**
   *  get 方法
   *  @param {*} path 接口地址
   *  @param {*} data 参数
   */
  get(path, data, open = false, token = false, responseType = 'text') {
    const that = this;
    let reqData = dealObjectValue(data);
    let reqParams = dealObjectValue(that.params);
    // 请求前先拦截一下，看用户有没有自定义事件
    if (typeof that.request === 'function') {
      that.request(that);
    }
    let baseUrl = open ? '' : that.baseUrl
    wx.request({
      method: 'GET',
      url: `${baseUrl || ''}${path}`,
      responseType,
      data: {
        ...reqParams,
        ...reqData
      },
      success(res) {
        if (res.data.code !== 'S0A00000') {
          wx.showModal({
            content: res.data.message || '请求失败，请检查网络状态',
            showCancel: false
          })
        }
        if (typeof that.callback === 'function') {
          that.callback(res, 1)
        }
      },
      fail(res) {
        if (typeof that.callback === 'function') {
          wx.showModal({
            content: '请求失败，请检查网络状态',
            showCancel: false
          })
          that.callback(res, 0)
        }
      }
    });
    return this;
  },

  /**
   * post 方法
   * @param {*} path 接口地址
   * @param {*} data 参数
   * @param {*} params 跟在url的参数
   * @example
   * api.post(path, data, {
   *  param,
   * });
   */
  post(path, data, params) {
    const that = this;
    let reqparams = dealObjectValue(that.params);
    //  请求前先拦截一下，看用户有没有自定义事件
    if (typeof that.request === 'function') {
      that.request(that);
    }
    const paramsSend = params && typeof params === 'object' ? params.params : {};
    wx.request({
      method: 'POST',
      url: urlParams(`${that.baseUrl || ''}${path}`, {
        ...reqparams,
        ...paramsSend,
      }),
      data,
      success(res) {
        if (res.data.code != 'S0A00000') {
          wx.showModal({
            content: res.data.message || '请求失败，请检查网络状态',
            showCancel: false,
            success(modalRes) {
              if (modalRes.confirm && typeof that.callback === 'function') {
                that.callback(res, 1);
              }
            }
          })
        } else {
          if (typeof that.callback === 'function') {
            that.callback(res, 1);
          }
        }
      },
      fail(res) {
        if (typeof that.callback === 'function') {
          wx.showModal({
            content: '请求失败，请检查网络状态',
            showCancel: false
          })
          that.callback(res, 0);
        }
      },
    });
    return this;
  },

  // then  回调成功事件
  then(callback) {
    if (typeof callback === 'function') {
      this.success = callback;
    }
    return this;
  },

  //   catch 回调失败事件
  catch(callback) {
    if (typeof callback === 'function') {
      this.fail = callback;
    }
    return this
  },

  /**
   * 回调函数，无论什么请求，成功还是失败，先往这里跑
   * @param {*} res 回调的结果
   * @param {*} type 回调的类型，0：fail 1：success，默认都往success跑
   */
  callback(res, type) {
    // 回调前先拦截一下，看用户有没有自定义事件
    if (typeof this.response === 'function') {
      this.response(res);
    }

    switch (type) {
      case 0:
        if (typeof this.fail === 'function') {
          this.fail(res);
        }
        break;
      default:
        if (typeof this.success === 'function') {
          this.success(res);
        }
        break;
    }
  },
  //  success 的回调
  success(res) {
    return this;
  },
  //  fail  的回调
  fail(res) {
    return this;
  },
}


const api = new apiFun();

module.exports = api;