/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: USER.UserInfoType | undefined }) {
  const { currentUser: userInfo } = initialState || {};

  return {
    canAdmin: userInfo && userInfo?.role === 1,
  };
}
