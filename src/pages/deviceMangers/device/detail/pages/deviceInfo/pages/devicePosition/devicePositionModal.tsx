import { LAYOUT_TYPE_VERTICAL } from '@/utils/const';
import { SendOutlined } from '@ant-design/icons';
import { ProList } from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ModalForm, ProFormFieldSet, ProFormText } from '@ant-design/pro-form';
import { Button, message } from 'antd';
import { throttle } from 'lodash';

import type { DeviceInfo } from '@/pages/deviceMangers/device/detail/pages/deviceInfo/data';
import React, { useEffect, useRef, useState } from 'react';

export interface modalFormType {
  address: string;
  point: number[];
}

const DevicePositionModal: React.FC<{
  getDevicePositionVal: (value: modalFormType, tag: 'pos' | 'loc') => void;
  record: DeviceInfo;
  flag: 'pos' | 'loc';
  parseAddress?: string;
}> = ({ getDevicePositionVal, record, flag, parseAddress }) => {
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<modalFormType[]>([]);

  const [address, setAddress] = useState('');
  const [local, setLocal] = useState(null);

  const editFormRef = useRef<ProFormInstance>();

  const onOpen = () => setVisible(true);
  const onClose = () => setVisible(false);

  const initialValues = {
    address: parseAddress,
    point: [record.position?.longitude, record.position?.latitude],
  };
  const searchBtn = (addr: string | modalFormType) => {
    if (options.length) {
      getDevicePositionVal(Array.isArray(addr) ? addr[0] : addr, 'loc');
      onClose();
    } else message.warning('暂无搜索结果');
  };

  const searchDebBtn = async (nV) => {
    local.search(nV.target.value ?? '天安门');
    setAddress(nV.target.value);
  };

  const formSubmit = async (values: modalFormType) => {
    if (flag === 'pos') {
      getDevicePositionVal(values, 'pos');

      onClose();
    } else {
      if (isNaN(Number(values?.point?.[0])) && isNaN(Number(values?.point?.[1]))) {
        message.error('经纬度只能为数值且两项都要填');
        return false;
      }
      getDevicePositionVal(values, 'loc');
      onClose();
    }
    return true;
  };

  const loadOption = () => {
    const map = new window.BMap.Map('map');
    map.centerAndZoom(
      new window.BMap.Point(
        record?.position?.longitude || 116.403963,
        record?.position?.latitude || 39.915119,
      ),
      14,
    );
    const option = {
      onSearchComplete: function (results) {
        const data = [];
        for (let i = 0; i < results?.getCurrentNumPois(); i++) {
          data.push(results?.getPoi(i));
        }
        setOptions(
          data.map((item) => ({
            ...item,
            image: <SendOutlined />,
          })),
        );
      },
    };

    setLocal(new window.BMap.LocalSearch(map, option));
  };

  useEffect(() => {
    if (window.hasOwnProperty('BMap')) loadOption();
    local?.search(parseAddress);
    setAddress(parseAddress as string);
  }, [flag, record, parseAddress]);

  useEffect(() => {
    // setTimeout(() => {
    editFormRef.current?.setFieldsValue(initialValues);
    // }, 0);
  }, [flag, initialValues]);

  return (
    <ModalForm<modalFormType>
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
      <ProFormText
        name="address"
        placeholder=""
        label="设备位置"
        width={'lg'}
        fieldProps={
          flag === 'loc'
            ? {
                addonAfter: <a onClick={() => searchBtn(options)}>搜索</a>,
                onChange: throttle((nV) => searchDebBtn(nV), 1000),
                value: address,
              }
            : {}
        }
      />

      {flag === 'loc' && (
        <>
          <ProList<any>
            onRow={(rec: any) => {
              return {
                onClick: () => {
                  searchBtn(rec);
                },
              };
            }}
            rowKey="title"
            pagination={{
              defaultPageSize: 5,
              showSizeChanger: true,
            }}
            // headerTitle="基础列表"
            dataSource={options}
            metas={{
              title: {
                dataIndex: 'title',
              },
              avatar: {
                dataIndex: 'image',
              },
              description: {
                dataIndex: 'address',
              },
              actions: {
                render: (text, row) => [
                  <a href={row.detailUrl} target="_blank" key="link" rel="noreferrer">
                    详情
                  </a>,
                ],
              },
            }}
          />
          <ProFormFieldSet name="point" label="设备经纬度">
            <ProFormText name="longitude" placeholder="请输入设备经度" width="sm" />
            <ProFormText name="latitude" placeholder="请输入设备纬度" width="sm" />
          </ProFormFieldSet>
        </>
      )}
    </ModalForm>
  );
};

export default DevicePositionModal;
