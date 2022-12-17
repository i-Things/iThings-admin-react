import ProDescriptions from '@ant-design/pro-descriptions';
import React, { useEffect, useRef, useState } from 'react';
import DevicePositionModal from './devicePositionModal';

import type { DeviceInfo } from '@/pages/deviceMangers/device/detail/pages/deviceInfo/data';
import type { ProColumns } from '@ant-design/pro-table';

import styles from '@/pages/home/pages/deviceMap/index.less';
import { postThingsDeviceInfoUpdate } from '@/services/iThingsapi/shebeiguanli';
import { message, Tag } from 'antd';

interface InfoProps {
  deviceInfo: DeviceInfo;
  refresh: () => void;
}

const DevicePositionPage: React.FC<InfoProps> = ({ deviceInfo, refresh }) => {
  const markerRef = useRef(null);
  const geocoderRef = useRef(null);
  const pointRef = useRef(null);

  const [devicePos, setDevicePos] = useState({
    deviceAddress: '',
    point: {
      lng: '',
      lat: '',
    },
  });
  console.log(devicePos);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const getmap = (deviceInfo) => {
    setDevicePos((pre) => ({
      ...pre,
      point: {
        lng: deviceInfo?.longitude,
        lat: deviceInfo?.latitude,
      },
    }));
    const map = new BMap.Map('map');
    const lng = deviceInfo?.longitude || deviceInfo?.point?.lng;
    const lat = deviceInfo?.latitude || deviceInfo?.point?.lat;
    if (lng && lat) {
      pointRef.current = new BMap.Point(lng, lat);
    } else {
      pointRef.current = new BMap.Point(116.404, 39.915);
    }
    map.centerAndZoom(pointRef.current, 19);
    map.enableScrollWheelZoom(true);
    // 开启鼠标滚轮缩放
    map.addControl(new BMap.NavigationControl());

    markerRef.current = new BMap.Marker(pointRef.current, {
      enableDragging: true,
    });
    map.addOverlay(markerRef.current);
    map.panTo(pointRef.current);

    geocoderRef.current = new BMap.Geocoder();
  };

  const devicePosHandle = (GeocoderResult) => {
    const pos = {
      deviceAddress: GeocoderResult.address,
      geoCoord: GeocoderResult.point,
    };
    const body = {
      devicePosition: pos ?? {},
      logLevel: deviceInfo.logLevel ?? 1,
      productID: deviceInfo.productID ?? '',
      deviceName: deviceInfo.deviceName ?? '',
    };
    postThingsDeviceInfoUpdate(body)
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

  const getLocationHandle = (params) => {
    const lng = params?.point?.lng || params?.point?.[0];
    const lat = params?.point?.lat || params?.point?.[1];
    const point = new BMap.Point(lng, lat);
    geocoderRef.current?.getLocation(point, (GeocoderResult) => {
      if (!GeocoderResult) message.error('地址解析失败');
      setDevicePos({
        deviceAddress: GeocoderResult.address,
        point: GeocoderResult.point,
      });
      getmap(GeocoderResult);
      devicePosHandle(GeocoderResult);
    });
  };

  const getPointHandle = (params) => {
    geocoderRef.current?.getPoint(params?.deviceAddress, (GeocoderResult) => {
      if (!GeocoderResult) message.error('地址解析失败');
      setDevicePos({
        deviceAddress: GeocoderResult.address,
        point: GeocoderResult.point,
      });
      getmap({ point: GeocoderResult, deviceAddress: params?.deviceAddress });
      devicePosHandle({ point: GeocoderResult, deviceAddress: params?.deviceAddress });
    });
  };
  const getDevicePositionVal = (value) => {
    setDevicePos({
      deviceAddress: value?.value,
      point: {
        lng: value?.point?.[0],
        lat: value?.point?.[1],
      },
    });

    // 判定值得情况
    const { deviceAddress, point } = value || {};

    if ((deviceAddress && point) || point) {
      getLocationHandle(value);
    } else {
      getPointHandle(value);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const useColumns = (deviceInfo: DeviceInfo) => {
    return [
      {
        title: '设备位置',
        key: 'deviceAddress',
        dataIndex: 'deviceAddress',
        copyable: true,
      },
      {
        title: '设备经纬度',
        key: 'longitude',
        dataIndex: 'longitude',
        copyable: true,
        render: () => {
          return (
            <>
              {deviceInfo?.longitude ? (
                <Tag>{`${deviceInfo?.longitude},${deviceInfo?.latitude}`}</Tag>
              ) : (
                '-'
              )}
            </>
          );
        },
      },

      {
        title: '操作',
        valueType: 'option',
        render: () => [<DevicePositionModal getDevicePositionVal={getDevicePositionVal} />],
      },
    ] as ProColumns<DeviceInfo>[];
  };

  const columns = useColumns(deviceInfo);

  useEffect(() => {
    getmap(deviceInfo);
    markerRef.current?.addEventListener('mouseup', getLocationHandle, true);
    return () => {
      markerRef.current?.removeEventListener('mouseup', getLocationHandle, true);
    };
  }, []);

  return (
    <div id="edit-map">
      <ProDescriptions
        title="设备定位"
        dataSource={deviceInfo}
        colon={false}
        columns={columns}
        column={3}
      />
      <div id="map" style={{ height: '50vh', width: '100%' }} className={styles.map}>
        地图展示区域，新增后显示
      </div>
    </div>
  );
};
export default DevicePositionPage;
