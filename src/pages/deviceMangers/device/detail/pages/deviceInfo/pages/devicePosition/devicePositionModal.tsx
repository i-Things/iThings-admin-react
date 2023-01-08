import { LAYOUT_TYPE_VERTICAL } from '@/utils/const';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ModalForm, ProFormDigit, ProFormFieldSet, ProFormText } from '@ant-design/pro-form';
import { Button, message } from 'antd';

import type { DeviceInfo } from '@/pages/deviceMangers/device/detail/pages/deviceInfo/data';
import React, { useMemo, useRef, useState } from 'react';

export interface modalFormType {
  address: string;
  point: number[];
}

const DevicePositionModal: React.FC<{
  getDevicePositionVal: (value: modalFormType) => void;
  record: DeviceInfo;
  flag: 'pos' | 'loc';
}> = ({ getDevicePositionVal, record, flag }) => {
  console.log(record);
  const [visible, setVisible] = useState(false);
  const editFormRef = useRef<ProFormInstance>();

  const onOpen = () => setVisible(true);
  const onClose = () => setVisible(false);

  const initialValues = useMemo(() => {
    if (record?.address) {
      return {
        address: record.address,
        point: [record.position?.longitude, record.position?.latitude],
      };
    }
    return undefined;
  }, [record?.address, record?.position]);

  const formSubmit = async (values: modalFormType) => {
    console.log(values);
    if (!Object.keys(values).length) {
      message.error('请输入某一项的值');
      return false;
    }
    if (values?.point?.length > 0)
      if (isNaN(Number(values?.point?.[0])) && isNaN(Number(values?.point?.[1]))) {
        message.error('经纬度只能为数值且两项都要填');
        return false;
      }
    getDevicePositionVal(values);
    onClose();
    return true;
  };

  return (
    <ModalForm<modalFormType>
      formRef={editFormRef}
      initialValues={initialValues}
      width={500}
      title={'设备定位编辑'}
      trigger={
        <Button type="link" onClick={onOpen}>
          编辑
        </Button>
      }
      visible={visible}
      autoFocusFirstInput
      modalProps={{
        onCancel: onClose,
      }}
      submitTimeout={2000}
      layout={LAYOUT_TYPE_VERTICAL}
      onFinish={formSubmit}
    >
      {/*<section className="menu-tool-tip">*/}
      {/*  <ExclamationCircleTwoTone*/}
      {/*    className="menu-icon"*/}
      {/*    twoToneColor="#ed6a0c"*/}
      {/*    style={{ margin: '10px 5px' }}*/}
      {/*  />*/}
      {/*  经纬度和位置详情二选一填即可，如果两个都填，以经纬度信息为准*/}
      {/*</section>*/}
      <ProFormText name="address" placeholder="" label="设备位置" width={'lg'} />
      {/*<ProFormText name="address" placeholder="" label="位置详情" width={'lg'} />*/}
      {flag === 'loc' && (
        <ProFormFieldSet name="point" label="设备经纬度">
          <ProFormDigit
            name="longitude"
            placeholder="请输入设备经度"
            min={0}
            max={180}
            width="sm"
            fieldProps={{ precision: 9 }}
          />
          <ProFormDigit
            name="latitude"
            placeholder="请输入设备纬度"
            min={0}
            max={90}
            width="sm"
            fieldProps={{ precision: 9 }}
          />
        </ProFormFieldSet>
      )}
    </ModalForm>
  );
};

export default DevicePositionModal;
