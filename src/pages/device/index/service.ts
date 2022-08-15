import { postV1ThingsDeviceIndex } from "@/services/fmcsapi/shebeiguanli";

export async function queryDeviceList(param: any): Promise<IQueryDeviceList> {
  const requestTime: API.postV1ThingsDeviceIndexParams = {
    "fmcs-guid": String(Date.parse(new Date().toString())),
  };

  const { data } = await postV1ThingsDeviceIndex(requestTime, {
    page: param,
    productID: "246EUXwpfVu",
  });
  const ret: IQueryDeviceList = {
    total: data.total!,
    data: data.list as IDeviceMsg[],
  };
  return ret;
}
