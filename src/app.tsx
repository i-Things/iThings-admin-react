import type { MenuDataItem, Settings as LayoutSettings } from '@ant-design/pro-layout';
import { history, Navigate } from '@umijs/max';
import { Spin } from 'antd';
import type { ComponentType, LazyExoticComponent } from 'react';
import React from 'react';
import { postApiV1SystemCommonConfig } from './services/iThingsapi/tongyonggongneng';
import { postApiV1SystemUserResourceRead } from './services/iThingsapi/yonghuguanli';
import { OFFICIAL_WEBSITE } from './utils/const';
import { IconMap } from './utils/iconMap';
import { loadBMap } from './utils/map';
import { filterMenu } from './utils/menu';
import { getToken, getUID, setLocal, spanTree } from './utils/utils';

const loginPath = '/user/login';

let extraRoutes: any[] = [];
let userInfo = {};
let flatMenu: any[] = [];

// 菜单处理
let Component: JSX.Element | null = null;
let Element: LazyExoticComponent<ComponentType<any>> | null = null;

// 尝试加载对应的组件
const loadMyComponent = async (path) => {
  let module = null;
  try {
    module = await import(path + '.tsx'); // 使用React.lazy加载组件
  } catch (error) {
    // 处理加载组件时的错误
    module = await import('./pages/404');
  }
  return module;
};

// 确定当前菜单对应的组件
const confirmComponent = (component) => {
  if (component.includes('.tsx')) {
    return React.lazy(() =>
      loadMyComponent('./pages/' + component?.split('./')?.[1]?.split('.tsx')?.[0]),
    );
  } else {
    return React.lazy(() => loadMyComponent('./pages/' + component?.split('./')?.[1]));
  }
};

// 确定菜单
const handlerNomalMenu = (menuItem): LazyExoticComponent<ComponentType<any>> | Promise<any> => {
  if (menuItem.redirect) {
    const redirectMenu = flatMenu.filter((it) => it.path === menuItem.redirect);
    return confirmComponent(redirectMenu?.[0]?.component);
  }
  if ((menuItem.parentID != 1 || !menuItem.children) && !menuItem.redirect) {
    return confirmComponent(menuItem.component);
  }
  return loadMyComponent('./pages/404');
};

// 确定iframe
const handlerIframeMenu = (menuItem) => {
  return (
    <iframe src={menuItem.component || OFFICIAL_WEBSITE} height="800" style={{ width: '100%' }} />
  );
};

// 跳转外链
const handlerLinkMenu = (menuItem) => {
  menuItem.path = menuItem.component;
};

// 确定iframe,外链和微前端
const handlerMenu = (menuItem) => {
  switch (menuItem.type) {
    case 1:
      Component = handlerNomalMenu(menuItem);
      Element = (
        <React.Suspense fallback={<Spin />}>{Component && <Component />}</React.Suspense>
      ) as unknown as LazyExoticComponent<ComponentType<any>>;
      break;
    case 2:
      Element = handlerIframeMenu(menuItem);
      break;
    case 3:
      handlerLinkMenu(menuItem);
      Element = null;
      break;
  }
};

const loopMenuItem = (menus: any[], pId: number | string) => {
  return menus.flatMap((item) => {
    console.log('menuItem', item);

    handlerMenu(item);
    if (item.children) {
      return [
        {
          ...item,
          parentID: pId,
          hideInMenu: item.hideInMenu === 1,
          icon: (
            <img
              src={IconMap[(item.icon as string) || 'icon_data_01']}
              alt=""
              style={{
                width: 14,
                height: 14,
                marginRight: 5,
                marginBottom: 5,
              }}
            />
          ),
          children: [
            {
              path: item.path,
              element: <Navigate to={item.children[0].path} replace />,
            },
            ...loopMenuItem(item.children, item.parentID),
          ],
        },
      ];
    } else {
      return [
        {
          ...item,
          parentID: pId,
          hideInMenu: item.hideInMenu === 1,
          icon: (
            <img
              src={IconMap[(item.icon as string) || 'icon_data_01']}
              alt=""
              style={{
                width: 14,
                height: 14,
                marginRight: 5,
                marginBottom: 5,
              }}
            />
          ),
          element: Element,
        },
      ];
    }
  });
};
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
      const { data } = await postApiV1SystemCommonConfig({});
      setLocal(`mapData`, JSON.stringify(data));
      loadBMap();
      return { userInfo, menuInfo: filterMenu(extraRoutes)! };
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

export async function render(oldRender: Function) {
  const resourece = await postApiV1SystemUserResourceRead({});
  userInfo = resourece?.data?.info;
  flatMenu = resourece?.data?.menu?.sort((a, b) => (a.order as number) - (b.order as number));
  oldRender();
}

export async function patchClientRoutes({ routes }: { routes: any[] }) {
  const routerIndex = routes.findIndex((item) => item.path === '/');
  const parentID = routes[routerIndex].id;
  if (flatMenu) {
    extraRoutes = loopMenuItem(spanTree(flatMenu, 1, 'parentID'), parentID);
    routes[routerIndex].routes.push(...extraRoutes);
  }
}
