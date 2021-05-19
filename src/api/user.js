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
