import dynamicRoutesToUsableRoutes from '@/utils/dynamicRoutesToUsableRoutes';
import type { MenuDataItem } from '@ant-design/pro-layout';
import { getMenuData } from '@ant-design/pro-layout';
import { renderRoutes } from '@umijs/renderer-react';
// import { Router } from 'react-router';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import type { IRoute } from 'umi';
import { useModel } from 'umi';

interface RootNodePorps {
  routes: MenuDataItem[];
}

const RootNode: React.FC<RootNodePorps> = (props) => {
  // @ts-ignore
  const plugin = props.children.props.plugin; // 这里是获取 renderRoutes 中所需要的plugin参数

  // 获取保存的用户信息
  const { initialState } = useModel('@@initialState');

  // renderRoutes 中的routes参数
  const [routes, setRoutes] = useState<IRoute[]>([]);

  useEffect(() => {
    // 获取后端的菜单
    const menuInfo = initialState?.currentUser?.menuInfo;

    if (menuInfo) {
      // 获取当前的菜单，这是配置文件中的routes生成的，
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const routes = props.routes;
      console.log(routes);

      // 获取通过menuinfo生成的路由信息
      const menuData = getMenuData(initialState?.currentUser?.menuInfo).menuData as MenuDataItem[];
      console.log(menuData);

      // 替换原来的路由信息， 因为目前为止还没有匹配组件，所以必须要把对应的组件匹配上去，页面才能渲染
      routes[0].routes = dynamicRoutesToUsableRoutes(menuData);
      routes[0].children = dynamicRoutesToUsableRoutes(menuData);
      console.log(routes[0].routes[0].path);

      // 路由重定向
      if (routes[0].routes.length > 0) {
        routes[0].routes.push({
          path: '/',
          redirect: routes[0].routes[0].path,
          exact: true,
        });

        routes[0].children.push({
          path: '/',
          redirect: routes[0].routes[0].path,
          exact: true,
        });
      }
      // 设置最终的路由
      setRoutes(routes);
    }
  }, [initialState?.currentUser?.menuInfo]);

  // const store = {};
  return (
    // <Provider store={store}>
    <Router history={history}>{renderRoutes({ routes, plugin })}</Router>
    // </Provider>
  );
};

export default RootNode;
