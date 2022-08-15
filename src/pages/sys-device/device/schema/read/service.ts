import request from "@/utils/request";

export async function queryDeviceInfo(params: any) {
  const { data } = await request(`/api/v1/things/device/read`, {
    method: "post",
    data: params,
  });
  return data;
}
