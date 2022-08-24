import request from '@/utils/request';

/**
 *  获取验证码
 *
 * @export
 * @param {logigetCaptchaImgType} data
 * @return {*}  {Promise<getCaptchaImgResponse>}
 */
export async function getUserInfo(): Promise<USER.UserInfoType> {
  return request(`/api/front/user/userInfo`, {
    method: 'GET',
  });
}
