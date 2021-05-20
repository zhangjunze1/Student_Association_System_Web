// eslint-disable-next-line no-unused-vars
import request from '../utils/request'

/**
 * 获取系统数据（系统成员+社团数量+活动数量）（首页展示）
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

/**
 * 获取社团列表
 * @returns {AxiosPromise}
 */
export const findAssList = () => {
  return request({
    url: '/ass/findAssList',
    method: 'get'
  })
}

/**
 * 获取社团列表分页
 * @param current
 * @param size
 * @returns {AxiosPromise}
 */
export const findAssListPage = (current, size) => {
  return request({
    url: '/ass/findAssListPage',
    method: 'get',
    params: {
      current,
      size
    }
  })
}

/**
 * 获取我的社团列表分页
 * @param current
 * @param size
 * @param userId
 * @returns {AxiosPromise}
 */
export const findMyAssListPage = (current, size, userId) => {
  return request({
    url: '/ass/findMyAssListPage',
    method: 'get',
    params: {
      current,
      size,
      userId
    }
  })
}
