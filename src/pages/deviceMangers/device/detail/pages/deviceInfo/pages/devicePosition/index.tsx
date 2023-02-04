import { postThingsDeviceInfoUpdate } from '@/services/iThingsapi/shebeiguanli';
import { loadBMap } from '@/utils/map';
import ProDescriptions from '@ant-design/pro-descriptions';
import { message, Tag } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import DevicePositionModal from './devicePositionModal';

import type { DeviceInfo } from '@/pages/deviceMangers/device/detail/pages/deviceInfo/data';
import type { modalFormType } from './devicePositionModal';

import styles from '@/pages/home/pages/deviceMap/index.less';

interface InfoProps {
  deviceInfo: DeviceInfo;
  refresh: () => void;
}

const DevicePositionPage: React.FC<InfoProps> = ({ deviceInfo, refresh }) => {
  const markerRef = useRef(null);
  const geocoderRef = useRef(null);
  const pointRef = useRef(null);
  const addressRef = useRef(null);
  const deviceInfoStateRef = useRef({});

  const [pos, setPos] = useState('');
  const [addre, setAddre] = useState('');

  const getmap = async (info) => {
    await loadBMap();
    const map = new BMap.Map('map');
    const lng = info?.position?.longitude || info?.point?.lng;
    const lat = info?.position?.latitude || info?.point?.lat;
    if (lng && lat) {
      pointRef.current = new BMap.Point(lng, lat);
    } else {
      pointRef.current = new BMap.Point(116.404, 39.915);
    }
    map.centerAndZoom(pointRef.current, 14);
    map.enableScrollWheelZoom(true);
    // 开启鼠标滚轮缩放
    map.addControl(new BMap.NavigationControl());

    markerRef.current = new BMap.Marker(pointRef.current, {
      enableDragging: true,
    });

    map.addOverlay(markerRef.current);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    markerRef.current?.addEventListener('mouseup', getLocationHandle);
    map.panTo(pointRef.current);

    geocoderRef.current = new BMap.Geocoder();
    geocoderRef.current?.getLocation(pointRef.current, (GeocoderResult) => {
      if (!GeocoderResult) message.error('地址解析失败');
      setAddre(GeocoderResult.address);
    });
  };

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
    console.log(params);
    const lng = params?.point?.lng || params?.point?.[0];
    const lat = params?.point?.lat || params?.point?.[1];
    const point = new BMap.Point(lng, lat);
    geocoderRef.current?.getLocation(point, (GeocoderResult) => {
      if (!GeocoderResult) message.error('地址解析失败');
      addressRef.current = GeocoderResult.address;
      setAddre(GeocoderResult.address);
      getmap(GeocoderResult);
      devicePosHandle({ ...GeocoderResult, address: pos }, 'loc');
    });
  };

  // const getPointHandle = (params) => {
  //   addressRef.current = params?.address;
  //   geocoderRef.current?.getPoint(params?.address, (GeocoderResult) => {
  //     if (!GeocoderResult) message.error('地址解析失败');
  //     getmap({ point: GeocoderResult, address: params?.address });
  //     devicePosHandle({ point: GeocoderResult, address: params?.address }, 'loc');
  //   });
  // };

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
      title: '设备位置',
      key: 'address',
      dataIndex: 'address',
      copyable: true,
      render: (_, record) => (
        <>
          {deviceInfo?.address?.length ? pos : '-'}
          <DevicePositionModal
            getDevicePositionVal={getDevicePositionVal}
            record={record}
            flag={'pos'}
            pos={pos}
          />
        </>
      ),
    },
    {
      title: '设备定位',
      key: 'position',
      dataIndex: 'position',
      copyable: true,
      render: (_, record) => (
        <>
          {deviceInfo?.position?.longitude ? (
            <>
              <span>
                经纬度：
                <Tag>
                  {`${deviceInfo?.position.longitude},${deviceInfo?.position.latitude}` ?? '-'}
                </Tag>
                位置：{addre ?? '-'}
              </span>
              <DevicePositionModal
                getDevicePositionVal={getDevicePositionVal}
                record={record}
                flag={'loc'}
                parseAddress={addre}
              />
            </>
          ) : (
            '-'
          )}
        </>
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

    return () => {
      markerRef.current?.removeEventListener('mouseup', getLocationHandle, true);
    };
  }, [deviceInfo]);

  useEffect(() => {
    setPos(deviceInfo?.address as string);
  }, [deviceInfo?.address]);

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
