import request from "@/utils/request";

export async function queryDeviceList(params: any) {
  const { data } = await request(`/api/v1/things/device/index`, {
    method: "post",
    data: params,
  });
  return data;
}

export async function updateDevice(params: any) {
  const { data } = await request(`/api/v1/things/device/update`, {
    method: "post",
    data: params,
  });
  return data;
}

export async function removeDevice(params: any) {
  const { data } = await request(`/api/v1/things/device/delete`, {
    method: "post",
    data: params,
  });
  return data;
}
