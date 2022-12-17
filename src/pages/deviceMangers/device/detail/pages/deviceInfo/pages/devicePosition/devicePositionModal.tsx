import { LAYOUT_TYPE_VERTICAL } from '@/utils/const';
import { ExclamationCircleTwoTone } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ModalForm, ProFormFieldSet, ProFormText } from '@ant-design/pro-form';
import { Button, message } from 'antd';

import React, { useRef, useState } from 'react';

const GroupTags: React.FC<{
  getDevicePositionVal: (value) => void;
}> = ({ getDevicePositionVal }) => {
  const [visible, setVisible] = useState(false);
  const editFormRef = useRef<ProFormInstance>();

  const onOpen = () => setVisible(true);
  const onClose = () => setVisible(false);

  const formSubmit = async (values) => {
    if (!Object.keys(values).length) {
      message.error('请输入某一项的值');
      return false;
    }
    if (values?.geoCoord?.length > 0)
      if (isNaN(Number(values?.point?.[0])) && isNaN(Number(values?.point?.[1]))) {
        message.error('经纬度只能为数值且两项都要填');
        return false;
      }
    getDevicePositionVal(values);
    onClose();
    return true;
  };

  return (
    <ModalForm<{ tags: TagProps[] }>
      formRef={editFormRef}
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
      <section className="menu-tool-tip">
        <ExclamationCircleTwoTone className="menu-icon" twoToneColor="#ed6a0c" />
        经纬度和设备位置二选一填即可，如果两个都填，以经纬度信息为准
      </section>
      <ProFormText name="deviceAddress" placeholder="请输入设备所在地址" label="设备位置" />
      <ProFormFieldSet name="point" label="设备经纬度">
        <ProFormText name="longitude" placeholder="请输入设备经度" width="sm" />
        <ProFormText name="latitude" placeholder="请输入设备纬度" width="sm" />
      </ProFormFieldSet>
    </ModalForm>
  );
};

export default GroupTags;
