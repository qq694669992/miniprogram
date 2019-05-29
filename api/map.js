import QQMapWX from '../utils/qqmap-wx-jssdk.js';

let qqmapsdk = new QQMapWX({
  key: '3WEBZ-TJ3C4-2ETUI-XMQGU-4K3FS-AQBFQ',
})

const getQQGeocoder = (address, callback) => {
  qqmapsdk.geocoder({
    address: address,
    success:(res) => {
      callback(res)
    },
    fail: (error) => {

    }
  })
}

export default {
  getQQGeocoder,
}