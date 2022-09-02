import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { history } from 'umi';
import { postSystemUserRead } from './services/iThingsapi/yonghuguanlixin';
import { getToken, getUID } from './utils/utils';

const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: USER.UserInfoType;
  fetchUserInfo?: () => Promise<USER.UserInfoType | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const token = getToken();
      const uid = getUID();

      if (!token || !uid) {
        history.push(loginPath);
      }

      const body = { uid: uid };
      const msg = await postSystemUserRead(body);
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    };
  }
  return {
    fetchUserInfo,
    settings: {},
  };
}
