import RightContent from '@/components/RightContent';
import { IconMap } from '@/utils/iconMap';
import { ProLayout } from '@ant-design/pro-layout';
import moment from 'moment';
import 'moment/locale/zh-cn';
import defaultSettings from '../../config/defaultSettings';
// @ts-ignore
import { useEffect } from 'react';
import { dynamic, history, Link, useModel } from 'umi';
moment.locale('zh-cn');

const generateMenu = (item) => {
  const menu = {
    path: item.path,
    name: item.name,
    icon: IconMap[item.icon],
  };
  return menu;
};

const generateRouter = async (item) => {
  const router = {
    path: item.path,
    exact: true,
  };
  if (item.redirect) {
    router.redirect = item.redirect;
  }
  if (item.component !== 'Layout') {
    // router.component = dynamic({
    //   loader: async function () {
    //     // 这里的注释 webpackChunkName 可以指导 webpack 将该组件 HugeA 以这个名字单独拆出去
    //     const { default: HugeA } = await import(/* webpackChunkName: 'p__systemManagers__users__index' */ '../pages/systemManagers/users/index');
    //     return HugeA;
    //   },
    // });
    router.component = require('../pages/systemManagers/users/index').default;
  }
  console.log(router.component);

  return router;
};

const getAsyncRouter = (asyncRouterMap) => {
  let Routers = [];
  if (asyncRouterMap && asyncRouterMap.length > 0) {
    asyncRouterMap.forEach((item) => {
      if (item.children) {
        Routers.push(generateRouter(item));
        Routers = Routers.concat(getAsyncRouter(item.children));
      } else {
        Routers.push(generateRouter(item));
      }
    });
  }
  return Routers;
};

const getRouterMenu = (asyncRouterMap) => {
  const RouterMenus = [];
  if (asyncRouterMap && asyncRouterMap.length > 0) {
    asyncRouterMap.forEach((item) => {
      const parent = generateMenu(item);
      let children = [];
      if (item.children) {
        children = getRouterMenu(item.children);
      }
      if (children.length > 0) {
        parent.children = children;
      }
      RouterMenus.push(parent);
    });
  }
  console.log(RouterMenus);
  return RouterMenus;
};

const BasicLayout = (props) => {
  console.log(props);
  const { children } = props;
  const { initialState } = useModel('@@initialState');
  const asyncRouters = initialState?.currentUser?.menuInfo;

  const reactRouters = getAsyncRouter(asyncRouters);
  useEffect(() => {
    reactRouters.forEach((item) => {
      props.route.routes.push(item);
    });
    // eslint-disable-next-line no-irregular-whitespace
    if (reactRouters.length > 0) {
      props.route.routes.push({ component: dynamic(() => import('../pages/404')) });
    }
    // fix bug: 刷新浏览器对应的path不会加载component
    history.push(window.location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reactRouters.length]);
  console.log(reactRouters);

  return (
    <ProLayout
      {...props}
      {...defaultSettings}
      onMenuHeaderClick={() => history.push('/')}
      menuItemRender={(menuItemProps, defaultDom) => {
        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      breadcrumbRender={(routers = []) => [...routers]}
      // footerRender={() => defaultFooterDom}
      route={{ routes: getRouterMenu(asyncRouters) }}
      rightContentRender={() => <RightContent />}
    >
      {children}
    </ProLayout>
  );
};

// const BasicLayout: React.FC = (props) => {
//   const { children } = props;

//   return (
//     <ProLayout
//       siderWidth={250}
//       rightContentRender={() => <RightContent />}
//       disableContentMargin={false}
//       footerRender={false}
//       menuItemRender={(menuItemProps: any, defaultDom: any) => {
//         if (menuItemProps.isUrl || menuItemProps.children || !menuItemProps.path) {
//           return (
//             // @ts-ignore
//             <Link to={menuItemProps.path ? menuItemProps.path : '#'}>{defaultDom}</Link>
//           );
//         }
//         if (menuItemProps.pro_layout_parentKeys.length < 2) {
//           // @ts-ignore
//           return <Link to={menuItemProps.path}>{defaultDom}</Link>;
//         } else {
//           return (
//             // @ts-ignore
//             <Link to={menuItemProps.path}>
//               {menuItemProps.icon}
//               {defaultDom}
//             </Link>
//           );
//         }
//       }}
//       subMenuItemRender={(TWTProps: any, defaultDom: any) => {
//         return (
//           <>
//             <div>{defaultDom}</div>
//           </>
//         );
//       }}
//       menuDataRender={(menuData: any) => {
//         console.log(menuData);

//         return menuData.map((item: any) => {
//           return {
//             ...item,
//             icon: (
//               <img
//                 src={IconMap[item.icon as string]}
//                 alt=""
//                 style={{
//                   width: 14,
//                   height: 14,
//                   marginRight: 5,
//                   marginBottom: 5,
//                 }}
//               />
//             ),
//           };
//         });
//       }}
//       collapsedButtonRender={false}
//       {...props}
//       {...defaultSettings}
//     >
//       <div>
//         {/* <ConfigProvider locale={zhCN}> */}
//         {children}
//         {/* </ConfigProvider> */}
//       </div>
//     </ProLayout>
//   );
// };

export default BasicLayout;
