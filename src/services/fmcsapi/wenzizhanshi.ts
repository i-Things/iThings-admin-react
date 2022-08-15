// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** 获取一组文本数据 获取后端数据列表显示在前端文本内容中，获取的数值都为文本模式，前端酌情考虑是否需要做类型转换 POST /api/v1/datav/text/list */
export async function postV1DatavTextList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postV1DatavTextListParams & {
    // header
    /** 用户token */
    "fmcs-token": string;
    /** 查询guid */
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
    data: { name?: string; value?: string }[];
  }>("/api/v1/datav/text/list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 获取单条文本数据 获取后端一条数据显示在前端文本内容中，获取的数值都为文本模式，前端酌情考虑是否需要做类型转换 POST /api/v1/datav/text/row */
export async function postV1DatavTextRow(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postV1DatavTextRowParams & {
    // header
    /** 用户token */
    "fmcs-token": string;
    /** 前端查询guid */
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
    data: { name?: string; value?: string };
  }>("/api/v1/datav/text/row", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}
