// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** 获取多层级取值的数据结构 POST /api/v1/datav/misc/list-nest */
export async function postApiV1DatavMiscListNest(
  body: {
    /** 可以设置为域模型、数据模型或者已经定义了的代表某个查询条件的模板 */
    model: string;
    /** 通过json组合的查询条件，默认每个json属性之间为and组合条件 */
    clause?: Record<string, any>;
    /** sql或graphql等查询语句，直接提供给后台接口进行查询 */
    ql?: string;
  },
  options?: { [key: string]: any }
) {
  return request<Record<string, any>>("/api/v1/datav/misc/list-nest", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取树状结构数据 用于左侧菜单、树状分类、大纲、行政地区等类型场景。返回的数据是无限层级json POST /api/v1/datav/misc/tree */
export async function postApiV1DatavMiscTree(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postApiV1DatavMiscTreeParams & {
    // header
    /** 用户token */
    "fmcs-token": string;
    /** guid */
    "fms-guid"?: string;
  },
  body: {
    /** 可以设置为域模型、数据模型或者已经定义了的代表某个查询条件的模板 */
    model: string;
    /** 通过json组合的查询条件，默认每个json属性之间为and组合条件 */
    clause?: Record<string, any>;
    /** sql或graphql等查询语句，直接提供给后台接口进行查询 */
    ql?: string;
  },
  options?: { [key: string]: any }
) {
  return request<{
    code: number;
    msg: string;
    data: {
      title?: string;
      key?: string;
      value?: string;
      children?: API.E6A091E78AB6E88A82E782B9[];
    };
  }>("/api/v1/datav/misc/tree", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}
