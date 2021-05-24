
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
