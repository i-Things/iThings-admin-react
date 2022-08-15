import type { Settings as LayoutSettings } from "@ant-design/pro-layout";
import { PageLoading } from "@ant-design/pro-layout";
import { history } from "umi";
import { postV1SystemUserIndex } from "./services/fmcsapi/yonghuguanli";
import { apiParamsGUID, getToken, getUID } from "./utils/utils";

// MenuIcon.tsx

const isDev = process.env.NODE_ENV === "development";
const loginPath = "/user/login";

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

      const params = {
        "fmcs-guid": apiParamsGUID()["fmcs-guid"],
      };
      const body = { uid: uid };
      const msg = await postV1SystemUserIndex(params, body);
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

// ProLayout 支持的api https://procomponents.ant.design/components/layout
// export const layout: RunTimeLayoutConfig = ({ initialState }) => {
//   return {
//     rightContentRender: () => <RightContent />,
//     disableContentMargin: false,
//     footerRender: () => <Footer />,
//     onPageChange: () => {
//       const { location } = history;
//       // 如果没有登录，重定向到 login
//       if (!initialState?.currentUser && location.pathname !== loginPath) {
//         history.push(loginPath);
//       }
//     },
//     menuDataRender: (menuData) => {
//       return menuData.map((item) => {
//         console.log(
//           "IconMap[item.icon as string]:",
//           IconMap[item.icon as string]
//         );
//         return {
//           ...item,
//           icon: (
//             <img
//               src={IconMap[item.icon as string]}
//               alt=""
//               style={{ width: 14, height: 14, marginRight: 5, marginBottom: 5 }}
//             />
//           ),
//         };
//       });
//     },
//     menuHeaderRender: undefined,
//     // 自定义 403 页面
//     // unAccessible: <div>unAccessible</div>,
//     ...initialState?.settings,
//   };
// };
