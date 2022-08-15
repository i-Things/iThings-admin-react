// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** 获取复杂表头表格数据 POST /api/v1/datav/table/complex-header */
export async function postV1DatavTableComplexHeader(
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
      columns?: { title?: string; dataIndex?: string; key?: string }[];
      list?: Record<string, any>[];
      headerList?: { title?: string; value?: string }[];
    };
  }>("/api/v1/datav/table/complex-header", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取简单表格数据 POST /api/v1/datav/table/simple */
export async function postV1DatavTableSimple(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postV1DatavTableSimpleParams & {
    // header
    /** 用户token */
    "fmcs-token": string;
    /** 查询id */
    "fmcs-guid"?: string;
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
      columns?: { title?: string; dataIndex?: string; key?: string }[];
      list?: Record<string, any>[];
    };
  }>("/api/v1/datav/table/simple", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 获取树状表格数据 POST /api/v1/datav/table/tree */
export async function postV1DatavTableTree(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postV1DatavTableTreeParams & {
    // header
    /** 用户token */
    "fmcs-token": string;
    /** 查询id */
    "fmcs-guid"?: string;
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
      columns?: { title?: string; dataIndex?: string; key?: string }[];
      list?: Record<string, any>[];
    };
  }>("/api/v1/datav/table/tree", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}
