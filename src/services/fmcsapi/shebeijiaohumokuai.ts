// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** 获取设备及用户组信息 POST /front/dc/getGroupInfo */
export async function postFrontDcGetGroupInfo(
  body: {},
  options?: { [key: string]: any }
) {
  return request<{
    info: {
      groupID?: string;
      name?: string;
      uid?: string;
      createdTime?: string;
    }[];
    num: number;
    total: number;
  }>("/front/dc/getGroupInfo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取设备及用户组成员信息 POST /front/dc/getGroupMember */
export async function postFrontDcGetGroupMember(
  body: {},
  options?: { [key: string]: any }
) {
  return request<{
    info: {
      groupID?: number;
      memberID?: string;
      memberType?: number;
      createdTime?: string;
    }[];
    num: number;
    total: number;
  }>("/front/dc/getGroupMember", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 同步调用设备行为 POST /front/dc/sendAction */
export async function postFrontDcSendAction(
  body: {},
  options?: { [key: string]: any }
) {
  return request<{
    clientToken: string;
    outputParams: string;
    status: string;
    code: string;
  }>("/front/dc/sendAction", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
