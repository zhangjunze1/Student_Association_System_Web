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
