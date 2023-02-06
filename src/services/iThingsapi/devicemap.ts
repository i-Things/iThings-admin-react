import request from '@/utils/request';

/** 地点输入提示 get  */
export async function getSuggestion(
  body: {
    /** 菜单名称 */
    query: string;
    /** 父菜单ID，一级菜单为1 */
    region: number;

    ak: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ code: number; msg: string }>('https://api.map.baidu.com/place/v2/suggestion', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params: body,
    ...(options || {}),
  });
}
