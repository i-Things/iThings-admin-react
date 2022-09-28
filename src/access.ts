import type { MenuDataItem } from '@ant-design/pro-layout';

/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: {
  currentUser?: { userInfo: USER.UserInfoType; menuInfo: MenuDataItem[] } | undefined;
}) {
  const { currentUser } = initialState || {};

  return {
    canAdmin: currentUser && currentUser.userInfo?.role === 1,
  };
}
