import { postApiV1ThingsDeviceInfoUpdate } from '@/services/iThingsapi/shebeiguanli';
import ProDescriptions from '@ant-design/pro-descriptions';
import { message, Tag } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import DevicePositionModal from './devicePositionModal';

import type { DeviceInfo } from '@/pages/deviceMangers/device/detail/pages/deviceInfo/data';
import type { modalFormType } from './devicePositionModal';

import styles from '@/pages/home/pages/deviceMap/index.less';
import { getLocal, setLocal } from '@/utils/utils';

interface InfoProps {
  deviceInfo: Partial<DeviceInfo>;
  refresh: () => void;
}

const DevicePositionPage: React.FC<InfoProps> = ({ deviceInfo, refresh }) => {
  const geocoderRef = useRef(null);
  const deviceInfoStateRef = useRef({});

  const [pos, setPos] = useState('');

  const devicePosHandle = (GeocoderResult, flag: 'pos' | 'loc') => {
    const body = {
      address: GeocoderResult.address ?? pos,
      position: {
        longitude: flag === 'pos' ? deviceInfo?.position?.longitude : GeocoderResult.point.lng,
        latitude: flag === 'pos' ? deviceInfo?.position?.latitude : GeocoderResult.point.lat,
      },
      productID: deviceInfoStateRef.current?.productID ?? '',
      deviceName: deviceInfoStateRef.current?.deviceName ?? '',
    };

    postApiV1ThingsDeviceInfoUpdate(body)
      .then((res) => {
        if (res.code === 200) {
          message.success('提交成功');
          refresh();
        }
        return true;
      })
      .catch(() => {
        message.success('提交失败');
      });
  };

  const getAddr = (point, flag) => {
    geocoderRef.current = new window.BMap.Geocoder();
    geocoderRef.current?.getLocation(point, (GeocoderResult) => {
      if (!GeocoderResult) message.error('地址解析失败');
      setLocal('addr', GeocoderResult.address);
      if (flag === 'loc') devicePosHandle({ ...GeocoderResult, address: pos }, 'loc');
    });
  };

  const getmap = (info) => {
    const map = new window.BMap.Map('map');
    const lng = info?.position?.longitude || info?.point?.lng;
    const lat = info?.position?.latitude || info?.point?.lat;
    let point;
    if (lng && lat) {
      point = new window.BMap.Point(lng, lat);
    } else {
      point = new window.BMap.Point(116.403963, 39.915119);
    }
    map.centerAndZoom(point, 14);
    map.enableScrollWheelZoom(true);
    // 开启鼠标滚轮缩放
    map.addControl(new window.BMap.NavigationControl());

    const marker = new window.BMap.Marker(point, {
      enableDragging: true,
    });

    map.addOverlay(marker);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    marker?.addEventListener('mouseup', getLocationHandle);
    map.panTo(point);

    getAddr(point, undefined);
  };

  const getLocationHandle = (params) => {
    const lng = params?.point?.lng || params?.point?.[0];
    const lat = params?.point?.lat || params?.point?.[1];
    const point = new window.BMap.Point(lng, lat);
    getAddr(point, 'loc');
  };

  const getDevicePositionVal = (value: modalFormType, tag: 'pos' | 'loc') => {
    if (tag === 'loc') {
      getLocationHandle(value);
    } else {
      setPos(value.address);
      devicePosHandle(value, 'pos');
    }
  };

  const columns = [
    {
      title: '位置详情',
      key: 'address',
      dataIndex: 'address',
      copyable: true,
      render: (_, record) => (
        <div style={{ marginTop: '-4px' }}>
          {deviceInfo?.address?.length ? pos : '-'}
          <DevicePositionModal
            getDevicePositionVal={getDevicePositionVal}
            record={record}
            flag={'pos'}
            parseAddress={pos}
          />
        </div>
      ),
    },
    {
      title: '设备定位',
      key: 'position',
      dataIndex: 'position',
      copyable: true,
      render: (_, record) => (
        <div style={{ marginTop: '-4px' }}>
          <span>
            经纬度：
            <Tag>
              {deviceInfo?.position?.longitude
                ? `${deviceInfo?.position.longitude},${deviceInfo?.position.latitude}`
                : '-'}
            </Tag>
            位置：{deviceInfo?.position?.longitude ? getLocal('addr') : '-'}
          </span>

          <DevicePositionModal
            getDevicePositionVal={getDevicePositionVal}
            record={record}
            flag={'loc'}
            parseAddress={getLocal('addr')}
          />
        </div>
      ),
    },

    // {
    //   title: '操作',
    //   valueType: 'option',
    //   render: (_, record) => [
    //     <DevicePositionModal getDevicePositionVal={getDevicePositionVal} record={record} />,
    //   ],
    // },
  ];

  useEffect(() => {
    if (deviceInfo) {
      deviceInfoStateRef.current = deviceInfo;
      getmap(deviceInfo);
    }
  }, [deviceInfo]);

  return (
    <div id="edit-map">
      <ProDescriptions
        title="设备定位"
        dataSource={deviceInfo}
        colon={false}
        columns={columns}
        column={3}
      />
      <div id="map" style={{ height: '70vh', width: '100%' }} className={styles.map}>
        地图展示区域，新增后显示
      </div>
    </div>
  );
};

export default DevicePositionPage;
