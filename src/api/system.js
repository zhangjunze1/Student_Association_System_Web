// eslint-disable-next-line no-unused-vars
import request from '../utils/request'

/**
 * 获取系统公告信息
 * @returns {AxiosPromise}
 */
export const findSystemNotice = () => {
  return request({
    url: '/notice/findSystemNotice',
    method: 'GET'
  })
}

/**
 * 更新公告
 * @param notice
 * @returns {AxiosPromise}
 */
export const editSystemNotice = (notice) => {
  return request({
    url: '/notice/editSystemNotice',
    method: 'POST',
    params: {
      notice
    }
  })
}

/**
 * 报名社团
 * @param assId
 * @param userId
 * @returns {AxiosPromise}
 */
export const addApplyForAss = (assId, userId) => {
  return request({
    url: '/memberAss/addApplyForAss',
    method: 'POST',
    params: {
      assId,
      userId
    }
  })
}

/**
 * 社长同意他人对本社的申请
 * @param assId
 * @param userId
 * @returns {AxiosPromise}
 */
export const agreeApplyForMyAss = (assId, userId) => {
  return request({
    url: '/memberAss/agreeApplyForMyAss',
    method: 'POST',
    params: {
      assId,
      userId
    }
  })
}

/**
 * 社长拒绝他人对本社的申请
 * @param assId
 * @param userId
 * @returns {AxiosPromise}
 */
export const notagreeApplyForMyAss = (assId, userId) => {
  return request({
    url: '/memberAss/notagreeApplyForMyAss',
    method: 'POST',
    params: {
      assId,
      userId
    }
  })
}

/**
 * 删除社员
 * @param assId
 * @param userId
 * @returns {AxiosPromise}
 */
export const deleteMemberFromAss = (assId, userId) => {
  return request({
    url: '/memberAss/deleteMemberFromAss',
    method: 'POST',
    params: {
      assId,
      userId
    }
  })
}

/**
 * 申请活动
 * @param activityId
 * @param userId
 * @returns {AxiosPromise}
 */
export const applyForActivity = (activityId, userId) => {
  return request({
    url: '/userActivity/applyForActivity',
    method: 'POST',
    params: {
      activityId,
      userId
    }
  })
}

/**
 * 同意社员的活动请求
 * @param activityId
 * @param userId
 * @returns {AxiosPromise}
 */
export const agreeUserApplyActivity = (activityId, userId) => {
  return request({
    url: '/userActivity/agreeUserApplyActivity',
    method: 'POST',
    params: {
      activityId,
      userId
    }
  })
}

/**
 * 拒绝社员的活动请求
 * @param activityId
 * @param userId
 * @returns {AxiosPromise}
 */
export const notagreeUserApplyActivity = (activityId, userId) => {
  return request({
    url: '/userActivity/notagreeUserApplyActivity',
    method: 'POST',
    params: {
      activityId,
      userId
    }
  })
}
