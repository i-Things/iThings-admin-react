import * as icons from '@ant-design/icons';
import type { MenuDataItem } from '@ant-design/pro-layout';
import { createElement } from 'react';
import { dynamic } from 'umi';

const Component = {
  /** 欢迎页面 */
  Welcome: dynamic(() => import('@/pages/Welcome')),
  登录: dynamic(() => import('@/pages/user/login')),
  用户管理: dynamic(() => import('@/pages/systemManagers/users')),
};

function dynamicRoutesToUsableRoutes(routes: MenuDataItem[]): MenuDataItem[] {
  return routes.map((route) => {
    // route 是后端返回的数据
    // item 是最终antd-pro需要数据
    const item: MenuDataItem = {
      ...route,
      exact: false,
    };

    // icon 匹配
    if (route?.icon) {
      item.icon = createElement(icons[route.icon]);
    }

    // 组件匹配, 因为后端菜单配置的时候只会返回当前菜单对应的组件标识，所以通过组件标识来匹配组件
    if (route?.name) {
      item.component = Component[route.name || ''];

      item.exact = true;
    }

    // 子路由 处理
    if (route.routes && route.routes.length > 0) {
      item.routes = [
        // 如果有子路由那么肯定是要进行重定向的，重定向为第一个组件
        { path: item.path, redirect: route.routes[0].path, exact: true },
        ...dynamicRoutesToUsableRoutes(route.routes),
      ];
      item.children = [
        { path: item.path, redirect: route.routes[0].path, exact: true },
        ...dynamicRoutesToUsableRoutes(route.routes),
      ];
    }
    return item;
  });
}
export default dynamicRoutesToUsableRoutes;
