
// eslint-disable-next-line no-unused-vars
import request from '../utils/request'

/**
 * 获取对应社团编号的活动
 * @param current
 * @param size
 * @param assId
 * @returns {AxiosPromise}
 */
export const findAssActivityPage = (current, size, assId) => {
  return request({
    url: '/activity/findAssActivityPage',
    method: 'get',
    params: {
      current,
      size,
      assId
    }
  })
}

/**
 * 获取我的活动记录
 * @param current
 * @param size
 * @param userId
 * @returns {AxiosPromise}
 */
export const findMyActivityPage = (current, size, userId) => {
  return request({
    url: '/activity/findMyActivityPage',
    method: 'get',
    params: {
      current,
      size,
      userId
    }
  })
}
