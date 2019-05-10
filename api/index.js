/**
 * api 初始文件
 */
import api from './base';
import config from '../config'

export default api.setOption({
  baseUrl: config.apiHost,   //  接口环境
  params: {

  },
});