/** 获取用户信息列表 POST /api/v1/system/user/index */
import request from '@/utils/request';
export async function postDeviceGroupIndex(
  body: {
    /** 分页 */
    page: { page?: number; size?: number };
    /** 按用户账号筛选 */
    userName?: string;
    /** 按手机号筛选 */
    phone?: string;
    /** 按邮箱筛选 */
    email?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{
    code: number;
    msg: string;
    data: {
      list?: {
        groupName: string;
        groupID: string;
        createdTime: string;
      }[];
      total?: string;
    };
  }>('/api/v1/device/group/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
