// eslint-disable-next-line no-unused-vars
import request from '../utils/request'

/**
 * 查询所有未启动车辆的信息
 * @returns {AxiosPromise}
 */
export const findsystemData = () => {
  return request({
    url: '/ass/findsystemData',
    method: 'get',
    params: {
    }
  })
}
