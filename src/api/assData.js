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

/**
 * 申请新社团
 * @param name
 * @param position
 * @param funds
 * @param teacher
 * @param userId
 * @returns {AxiosPromise}
 */
export const applyNewAss = (name, position, funds, teacher, userId) => {
  return request({
    url: '/ass/applyNewAss',
    method: 'POST',
    params: {
      name,
      position,
      funds,
      teacher,
      userId
    }
  })
}

/**
 * 获取社长的社团信息
 * @param userId
 * @returns {AxiosPromise}
 */
export const findLeaderAss = (userId) => {
  return request({
    url: '/ass/findLeaderAss',
    method: 'get',
    params: {
      userId
    }
  })
}

/**
 * 获取社团列表模糊查询分页
 * @param current
 * @param size
 * @param assName
 * @param assState
 * @returns {AxiosPromise}
 */
export const findAssListQueryPage = (current, size, assName, assState) => {
  return request({
    url: '/ass/findAssListQueryPage',
    method: 'get',
    params: {
      current,
      size,
      assName,
      assState
    }
  })
}
