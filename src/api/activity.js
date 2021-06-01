
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

/**
 * 发送图片
 * @param file
 * @returns {AxiosPromise}
 */
export const addActivityPic = (data) => {
  return request({
    url: '/oss/activityPre/uploadFile',
    method: 'POST',
    data: data
  })
}

/**
 * 新建活动
 * @param activitySub
 * @param activityContent
 * @param activityScore
 * @param activityFinishTime1
 * @param activityFinishTime2
 * @param activityStartTime1
 * @param activityStartTime2
 * @param imageUrl
 * @returns {AxiosPromise}
 */
export const addNewActivity = (activitySub, activityContent, activityScore, activityFinishTime1, activityFinishTime2, activityStartTime1, activityStartTime2, imageUrl
  , userId, assId, userTrueName) => {
  return request({
    url: '/activity/addNewActivity',
    method: 'POST',
    params: {
      activitySub,
      activityContent,
      activityScore,
      activityFinishTime1,
      activityFinishTime2,
      activityStartTime1,
      activityStartTime2,
      imageUrl,
      userId,
      assId,
      userTrueName
    }
  })
}

/**
 * 管理员中 获取申请的活动
 * @param current
 * @param size
 * @param assName
 * @param activityState
 * @returns {AxiosPromise}
 */
export const findApplyActivity = (current, size, assName, activityState) => {
  return request({
    url: '/activity/findApplyActivity',
    method: 'get',
    params: {
      current,
      size,
      assName,
      activityState
    }
  })
}

/**
 * 获取正在审核中的活动及其数量
 * @returns {AxiosPromise}
 */
export const findActivityAndApplyCount = () => {
  return request({
    url: '/ass/findActivityAndApplyCount',
    method: 'get'
  })
}

/**
 * 审批同意活动
 * @param activityId
 * @returns {AxiosPromise}
 */
export const agreeActivity = (activityId) => {
  return request({
    url: '/activity/agreeActivity',
    method: 'POST',
    params: {
      activityId
    }
  })
}

/**
 * 拒绝活动
 * @param activityId
 * @returns {AxiosPromise}
 */
export const notAgreeActivity = (activityId) => {
  return request({
    url: '/activity/notAgreeActivity',
    method: 'POST',
    params: {
      activityId
    }
  })
}

/**
 * 活动截至报名
 * @param activityId
 * @returns {AxiosPromise}
 */
export const endActivityApply = (activityId) => {
  return request({
    url: '/activity/endActivityApply',
    method: 'POST',
    params: {
      activityId
    }
  })
}

/**
 * 活动结语
 * @param activityId
 * @param activityEndContent
 * @param imageUrl
 * @returns {AxiosPromise}
 */
export const addEndActivity = (activityId, activityEndContent, imageUrl) => {
  return request({
    url: '/activity/addEndActivity',
    method: 'POST',
    params: {
      activityId,
      activityEndContent,
      imageUrl
    }
  })
}

/**
 * 删除活动
 * @param activityId
 * @returns {AxiosPromise}
 */
export const deleteActivityByActivityId = (activityId) => {
  return request({
    url: '/activity/deleteActivityByActivityId',
    method: 'POST',
    params: {
      activityId
    }
  })
}
