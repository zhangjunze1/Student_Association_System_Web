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

/**
 * 管理员申请新社团
 * @param name
 * @param position
 * @param funds
 * @param teacher
 * @param userNum
 * @returns {AxiosPromise}
 */
export const applyNewAssByAdmin = (name, position, funds, teacher, userNum) => {
  return request({
    url: '/ass/applyNewAssByAdmin',
    method: 'POST',
    params: {
      name,
      position,
      funds,
      teacher,
      userNum
    }
  })
}

/**
 * 社团申请通过
 * @param assId
 * @param LeaderName
 * @returns {AxiosPromise}
 */
export const agreeAssApply = (assId, LeaderName) => {
  return request({
    url: '/ass/agreeAssApply',
    method: 'POST',
    params: {
      assId,
      LeaderName
    }
  })
}

/**
 * 社团申请不通过
 * @param assId
 * @param LeaderName
 * @returns {AxiosPromise}
 */
export const notAgreeAssApply = (assId, LeaderName) => {
  return request({
    url: '/ass/notAgreeAssApply',
    method: 'POST',
    params: {
      assId,
      LeaderName
    }
  })
}

/**
 * 换社长
 * @param assId
 * @param newNumber
 * @returns {AxiosPromise}
 * @constructor
 */
export const ChangeLeaderByNumber = (assId, newNumber) => {
  return request({
    url: '/ass/ChangeLeaderByNumber',
    method: 'POST',
    params: {
      assId,
      newNumber
    }
  })
}

/**
 * 删除社团
 * @param assId
 * @returns {AxiosPromise}
 */
export const deleteThisAss = (assId) => {
  return request({
    url: '/ass/deleteThisAss',
    method: 'POST',
    params: {
      assId
    }
  })
}

/**
 * 更改社团公告
 * @param assId
 * @param notice
 * @returns {AxiosPromise}
 */
export const editAssNotice = (assId, notice) => {
  return request({
    url: '/ass/editAssNotice',
    method: 'POST',
    params: {
      assId,
      notice
    }
  })
}

/**
 * 获取社团-活动统计信息
 * @returns {AxiosPromise}
 */
export const getAssAct = () => {
  return request({
    url: '/assActivity/assActStatistics',
    method: 'GET'
  })
}
