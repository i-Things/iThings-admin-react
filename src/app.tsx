import type { MenuDataItem, Settings as LayoutSettings } from '@ant-design/pro-layout';
import { history } from '@umijs/max';
import { postApiV1SystemCommonConfig } from './services/iThingsapi/tongyonggongneng';
import { postApiV1SystemUserResourceRead } from './services/iThingsapi/yonghuguanli';
import { IconMap } from './utils/iconMap';
import { loadBMap } from './utils/map';
import { getToken, getUID, setLocal, spanTree } from './utils/utils';

const loginPath = '/user/login';

const loopMenuItem = (menus: any[]): MenuDataItem[] =>
  menus.map(({ icon, children, hideInMenu, ...item }) => {
    return {
      ...item,
      icon: (
        <img
          src={IconMap[icon as string]}
          alt=""
          style={{
            width: 14,
            height: 14,
            marginRight: 5,
            marginBottom: 5,
          }}
        />
      ),
      children: children && loopMenuItem(children),
      hideInMenu: hideInMenu === 1,
    };
  });

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: { userInfo: USER.UserInfoType; menuInfo: MenuDataItem[] };
  fetchUserInfo?: () => Promise<
    { userInfo: USER.UserInfoType; menuInfo: MenuDataItem[] } | undefined
  >;
}> {
  const fetchUserInfo = async () => {
    try {
      const token = getToken();
      const userID = getUID();

      if (!token || !userID) {
        return history.push(loginPath);
      }
      const resourece = await postApiV1SystemUserResourceRead({});
      const { data } = await postApiV1SystemCommonConfig({});
      setLocal(`mapData`, JSON.stringify(data));
      loadBMap();
      const menuInfo = loopMenuItem(
        spanTree(
          resourece?.data?.menu?.sort((a, b) => (a.order as number) - (b.order as number)),
          1,
          'parentID',
        ),
      );
      return { userInfo: resourece.data.info, menuInfo };
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
