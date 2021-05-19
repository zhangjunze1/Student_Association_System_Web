// eslint-disable-next-line no-unused-vars
import request from '../utils/request'

/**
 * 查找实施疲劳记录
 * @returns {AxiosPromise}
 */
// eslint-disable-next-line camelcase
export const userRegister = (name, true_name, pwd, repwd, phone, number, gender) => {
  return request({
    url: '/user/userRegister',
    method: 'POST',
    params: {
      name,
      true_name,
      pwd,
      repwd,
      phone,
      number,
      gender
    }
  })
}

/**
 * 用户登录
 * @param number
 * @param password
 * @returns {AxiosPromise}
 */
export const userLogin = (number, password) => {
  return request({
    url: '/user/userLogin',
    method: 'POST',
    params: {
      number,
      password
    }
  })
}
