import type { ProductParams } from '@/pages/operationsMonitorings/data';
import { postApiV1ThingsProductInfoIndex } from '@/services/iThingsapi/chanpinguanli';
import { postApiV1ThingsDeviceInfoIndex } from '@/services/iThingsapi/shebeiguanli';
import { useRequest } from 'ahooks';
import { Card, Form, message, Select } from 'antd';
import type { DefaultOptionType } from 'antd/lib/select';
import { useState } from 'react';
import styles from './index.less';

interface FilterProps {
  params: ProductParams;
  changeParams: (val: ProductParams) => void;
  changeDevice?: () => void;
}

const Filter: React.FC<FilterProps> = (props) => {
  const { params, changeParams, changeDevice } = props;

  const [form] = Form.useForm();

  const [productOptions, setProductOptions] = useState<DefaultOptionType[]>(null!);
  const [deviceOptions, setDeviceOptions] = useState<DefaultOptionType[]>(null!);

  /** 获取产品列表 */
  useRequest(
    async () => {
      const res = await postApiV1ThingsProductInfoIndex({
        page: { page: 1, size: 9999 },
      });
      return res.data;
    },
    {
      onSuccess: (res) => {
        form.setFieldsValue({
          productID: res?.list?.[0]?.productID,
        });
        setProductOptions(
          () =>
            res?.list?.map((item) => ({
              label: item.productName,
              value: item.productID,
            })) || [],
        );
        changeParams({
          productID: res?.list?.[0]?.productID || '',
        });
      },
      onError: (error) => {
        message.error('获取产品列表错误' + error.message);
      },
    },
  );

  /** 获取设备列表 */
  useRequest(
    async () => {
      const res = await postApiV1ThingsDeviceInfoIndex({
        page: { page: 1, size: 9999 },
        productID: params?.productID,
      });
      return res.data;
    },
    {
      refreshDeps: [params?.productID],
      ready: !!params?.productID,
      onSuccess: (res) => {
        form.setFieldsValue({
          deviceName: res?.list?.[0]?.deviceName,
        });
        setDeviceOptions(
          () =>
            res?.list?.map((item) => ({
              label: item.deviceName,
              value: item.deviceName,
            })) || [],
        );
        changeParams({
          deviceName: res?.list?.[0]?.deviceName || '',
        });
        changeDevice?.();
      },
      onError: (error) => {
        message.error('获取设备列表错误' + error.message);
      },
    },
  );

  const handleChangeProduct = (val: string) => {
    changeParams({ productID: val });
  };

  const handleChangeDevice = (val: string) => {
    changeParams({ deviceName: val });
    changeDevice?.();
  };

  const handleFilter = (val: string, options?: DefaultOptionType) => {
    return String(options?.label)?.includes(val);
  };

  return (
    <Card className={styles.filter}>
      <Form layout="inline" form={form}>
        <Form.Item label="请选择产品" name="productID">
          <Select
            showSearch
            style={{ width: 256 }}
            options={productOptions}
            placeholder="请选择产品"
            filterOption={handleFilter}
            onSelect={handleChangeProduct}
          />
        </Form.Item>
        <Form.Item label="请选择设备" name="deviceName">
          <Select
            showSearch
            style={{ width: 256 }}
            options={deviceOptions}
            placeholder="请选择设备"
            filterOption={handleFilter}
            onSelect={handleChangeDevice}
          />
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Filter;
