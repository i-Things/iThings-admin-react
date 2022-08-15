import request from "@/utils/request";
import {
  getCaptchaImgResponse,
  logigetCaptchaImgType,
  loginType,
  loginUserInfoType,
} from "./data";

/**
 *  获取验证码
 *
 * @export
 * @param {logigetCaptchaImgType} data
 * @return {*}  {Promise<getCaptchaImgResponse>}
 */
export async function getCaptchaImg(
  data: logigetCaptchaImgType
): Promise<getCaptchaImgResponse> {
  return request(`/api/front/verify/captcha`, {
    method: "POST",
    data,
  });
}

/**
 * 用户登录接口
 *
 * @export
 * @param {loginType} data
 * @return {*}  {Promise<BffResponse<string>>}
 */
export async function login(data: loginType): Promise<loginUserInfoType> {
  return request(`/api/front/user/login`, {
    method: "POST",
    data,
  });
}
