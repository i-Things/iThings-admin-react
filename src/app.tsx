import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { history } from 'umi';
import { postSystemMenuIndex } from './services/iThingsapi/caidanguanli';
import { postSystemUserRead } from './services/iThingsapi/yonghuguanlixin';
import { getToken, getUID } from './utils/utils';
const loginPath = '/user/login';

// const loopMenuItem = (menus: any[]): MenuDataItem[] =>
//   menus.map(({ icon, children, ...item }) => {
//     return {
//       ...item,
//       icon: IconMap[icon as string],
//       children: children && loopMenuItem(children),
//     };
//   });

// const menuDataRender: any = () => {
//   const item = localStorage.getItem('menuTree') + '';
//   console.log(loopMenuItem(spanTree(JSON.parse(item), 1, 'parentID')));
//   return loopMenuItem(spanTree(JSON.parse(item), 1, 'parentID'));

//   // return tree(JSON.parse(item), 0, "parent_id");
// };

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
      const menuTree = await postSystemMenuIndex({ page: { page: 1, size: 99999 } });
      const menuInfo = menuTree?.data?.list;

      // const menuInfo = loopMenuItem(spanTree(menuTree?.data?.list, 1, 'parentID'));
      return { userInfo: msg.data, menuInfo };
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

// export function rootContainer(container: ReactNode) {
//   // RootNode 是根渲染组件
//   return React.createElement(RootNode, null, container);
// }

// export const layout: RunTimeLayoutConfig = ({ initialState }) => {
//   return {
//     rightContentRender: () => <RightContent />,
//     disableContentMargin: false,
//     waterMarkProps: {
//       content: initialState?.currentUser?.userInfo?.name,
//     },
//     menuDataRender: (menuData) => {
//       console.log(menuData);
//       return menuData.map((item: any) => {
//         return {
//           ...item,
//           icon: (
//             <img
//               src={IconMap[item.icon as string]}
//               alt=""
//               style={{
//                 width: 14,
//                 height: 14,
//                 marginRight: 5,
//                 marginBottom: 5,
//               }}
//             />
//           ),
//         };
//       });
//     },
//     onPageChange: () => {
//       const { location } = history;
//       // 如果没有登录，重定向到 login
//       if (!initialState?.currentUser && location.pathname !== loginPath) {
//         history.push(loginPath);
//       }
//     },
//     menuHeaderRender: undefined,
//     // 自定义 403 页面
//     // unAccessible: <div>unAccessible</div>,
//     // 增加一个 loading 的状态
//     // childrenRender: (children, props) => {
//     //   // if (initialState?.loading) return <PageLoading />;
//     //   return (
//     //     <>
//     //       {children}
//     //       {!props.location?.pathname?.includes('/login') && (
//     //         <SettingDrawer
//     //           enableDarkTheme
//     //           settings={initialState?.settings}
//     //           onSettingChange={(settings) => {
//     //             setInitialState((preInitialState) => ({
//     //               ...preInitialState,
//     //               settings,
//     //             }));
//     //           }}
//     //         />
//     //       )}
//     //     </>
//     //   );
//     // },
//     ...initialState?.settings,
//   };
// };
// export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
//   return {
//     rightContentRender: () => <RightContent />,
//     disableContentMargin: false,
//     waterMarkProps: {
//       content: initialState?.currentUser?.userInfo?.name,
//     },
//     menuDataRender: () => menuDataRender(),
//     onPageChange: () => {
//       const { location } = history;
//       // 如果没有登录，重定向到 login
//       if (!initialState?.currentUser && location.pathname !== loginPath) {
//         history.push(loginPath);
//       }
//     },
//     menuHeaderRender: undefined,
//     // 自定义 403 页面
//     // unAccessible: <div>unAccessible</div>,
//     // 增加一个 loading 的状态
//     childrenRender: (children, props) => {
//       // if (initialState?.loading) return <PageLoading />;
//       return (
//         <>
//           {children}
//           {!props.location?.pathname?.includes('/login') && (
//             <SettingDrawer
//               enableDarkTheme
//               settings={initialState?.settings}
//               onSettingChange={(settings) => {
//                 setInitialState((preInitialState) => ({
//                   ...preInitialState,
//                   settings,
//                 }));
//               }}
//             />
//           )}
//         </>
//       );
//     },
//     ...initialState?.settings,
//   };
// };

// import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
// import { PageLoading } from '@ant-design/pro-layout';
// import { history } from 'umi';
// import { postSystemUserRead } from './services/iThingsapi/yonghuguanlixin';
// import { getToken, getUID } from './utils/utils';

// const loginPath = '/user/login';

// /** 获取用户信息比较慢的时候会展示一个 loading */
// export const initialStateConfig = {
//   loading: <PageLoading />,
// };

// /**
//  * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
//  * */
// export async function getInitialState(): Promise<{
//   settings?: Partial<LayoutSettings>;
//   currentUser?: USER.UserInfoType;
//   fetchUserInfo?: () => Promise<USER.UserInfoType | undefined>;
// }> {
//   const fetchUserInfo = async () => {
//     try {
//       const token = getToken();
//       const uid = getUID();

//       if (!token || !uid) {
//         history.push(loginPath);
//       }

//       const body = { uid: uid };
//       const msg = await postSystemUserRead(body);
//       return msg.data;
//     } catch (error) {
//       history.push(loginPath);
//     }
//     return undefined;
//   };
//   // 如果是登录页面，不执行
//   if (history.location.pathname !== loginPath) {
//     const currentUser = await fetchUserInfo();
//     return {
//       fetchUserInfo,
//       currentUser,
//       settings: {},
//     };
//   }
//   return {
//     fetchUserInfo,
//     settings: {},
//   };
// }
