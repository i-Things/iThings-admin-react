import { postApiV1ThingsProductInfoIndex } from '@/services/iThingsapi/chanpinguanli';
import { postApiV1ThingsDeviceInfoIndex } from '@/services/iThingsapi/shebeiguanli';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import { EffectScatterChart, ScatterChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import React, { useMemo } from 'react';
import { history } from 'umi';

import type { DeviceStatic } from '@/pages/home/data';
import type { DEVICE_INFO } from '@/utils/const';
import type { EffectScatterSeriesOption, ScatterSeriesOption } from 'echarts/charts';
import type { TitleComponentOption, TooltipComponentOption } from 'echarts/components';

import 'echarts/extension/bmap/bmap';

import { timestampToDateStr } from '@/utils/date';
import { useRequest } from 'ahooks';
import { message } from 'antd';
import styles from './index.less';

echarts.use([
  TitleComponent,
  TooltipComponent,
  ScatterChart,
  EffectScatterChart,
  CanvasRenderer,
  UniversalTransition,
]);

type EChartsOption = echarts.ComposeOption<
  TitleComponentOption | TooltipComponentOption | ScatterSeriesOption | EffectScatterSeriesOption
>;

interface DeviceMapProps {
  data?: DeviceStatic;
}

interface DeviceListProps extends DEVICE_INFO {
  position: {
    longitude: number;
    latitude: number;
  };
  address: string;
  productName: string;
  value?: number[];
}

const DeviceMap: React.FC<DeviceMapProps> = () => {
  const body = {
    page: {
      size: 99999,
      page: 1,
    },
  };

  const { data: deviceList = [] } = useRequest(
    async () => {
      const res = await postApiV1ThingsDeviceInfoIndex(body);
      return res.data.list;
    },
    {
      onError: (error) => {
        message.error('获取设备列表错误:' + error.message);
      },
    },
  );

  const { data: productList = [] } = useRequest(
    async () => {
      const res = await postApiV1ThingsProductInfoIndex(body);
      return res.data.list;
    },
    {
      onError: (error) => {
        message.error('获取产品列表错误:' + error.message);
      },
    },
  );

  const data = useMemo(() => {
    const res = deviceList?.map((device) => {
      let productName: string = '';
      let isOnline = device.isOnline;
      if (device.isOnline === 2 && device.firstLogin === '0') isOnline = 3;
      productList?.map((product) => {
        if (device.productID === product.productID) {
          productName = product.productName as string;
        }
      });
      return {
        ...device,
        productName,
        isOnline,
      };
    }) as DeviceListProps[];
    return res;
  }, [deviceList, productList]);

  const convertData = function (list: DeviceListProps[], status: number) {
    const res: Omit<DeviceListProps, 'position'>[] = [];
    for (let i = 0; i < list?.length; i++) {
      const geoCoord = [list[i].position.longitude, list[i].position.latitude];
      if (geoCoord && list[i].isOnline === status) {
        res.push({
          deviceName: list[i].deviceName,
          value: geoCoord,
          createdTime: list[i].createdTime,
          isOnline: list[i].isOnline,
          productID: list[i].productID,
          productName: list[i].productName,
          address: list[i].address,
          firstLogin: list[i].firstLogin,
          lastLogin: list[i].lastLogin,
          version: list[i].version,
        });
      }
    }
    return res;
  };

  const option: EChartsOption = {
    title: {
      text: '设备分布（在线数 ' + data.filter((x) => x.isOnline == 1).length + '）',
      subtext: 'ithings-smart open source living iot platform',
      // sublink: 'https://iot.wumei.live',
      target: 'blank',
      textStyle: {
        color: '#333',
        textBorderColor: '#fff',
        textBorderWidth: 10,
      },
      top: 10,
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: function (params) {
        let htmlStr = '<div style="padding:5px;line-height:28px;">';
        htmlStr +=
          "设备名称： <span style='color:#409EFF'>" + params.data.deviceName + '</span><br />';
        htmlStr += '设备创建时间： ' + timestampToDateStr(params.data.createdTime) + '<br />';
        htmlStr += '设备状态： ';
        if (params.data.firstLogin === '0') {
          htmlStr += "<span style='color:#E6A23C'>未激活</span>" + '<br />';
        } else if (params.data.isOnline == 1) {
          htmlStr += "<span style='color:#67C23A'>在线</span>" + '<br />';
        } else if (params.data.isOnline == 2) {
          htmlStr += "<span style='color:#909399'>离线</span>" + '<br />';
        }
        htmlStr += '产品ID： ' + params.data.productID + '<br />';
        htmlStr += '产品名称： ' + params.data.productName + '<br />';
        htmlStr += '设备位置： ' + params.data.address + '<br />';
        htmlStr += '激活时间： ' + timestampToDateStr(params.data.firstLogin) + '<br />';
        htmlStr += '最后上线时间： ' + timestampToDateStr(params.data.lastLogin) + '<br />';
        htmlStr += '固件版本： ' + params.data.version + '<br />';
        htmlStr += '</div>';
        return htmlStr;
      },
    },
    bmap: {
      center: [105, 38],
      zoom: 5,
      roam: true,
      mapStyle: {
        styleJson: [
          {
            featureType: 'water',
            elementType: 'all',
            stylers: {
              color: '#a0cfff',
            },
          },
          {
            featureType: 'land',
            elementType: 'all',
            stylers: {
              color: '#fafafa', // #fffff8 淡黄色
            },
          },
          {
            featureType: 'railway',
            elementType: 'all',
            stylers: {
              visibility: 'off',
            },
          },
          {
            featureType: 'highway',
            elementType: 'all',
            stylers: {
              color: '#fdfdfd',
            },
          },
          {
            featureType: 'highway',
            elementType: 'labels',
            stylers: {
              visibility: 'off',
            },
          },
          {
            featureType: 'arterial',
            elementType: 'geometry',
            stylers: {
              color: '#fefefe',
            },
          },
          {
            featureType: 'arterial',
            elementType: 'geometry.fill',
            stylers: {
              color: '#fefefe',
            },
          },
          {
            featureType: 'poi',
            elementType: 'all',
            stylers: {
              visibility: 'off',
            },
          },
          {
            featureType: 'green',
            elementType: 'all',
            stylers: {
              visibility: 'off',
            },
          },
          {
            featureType: 'subway',
            elementType: 'all',
            stylers: {
              visibility: 'off',
            },
          },
          {
            featureType: 'manmade',
            elementType: 'all',
            stylers: {
              color: '#d1d1d1',
            },
          },
          {
            featureType: 'local',
            elementType: 'all',
            stylers: {
              color: '#d1d1d1',
            },
          },
          {
            featureType: 'arterial',
            elementType: 'labels',
            stylers: {
              visibility: 'off',
            },
          },
          {
            featureType: 'boundary',
            elementType: 'all',
            stylers: {
              color: '#999999',
            },
          },
          {
            featureType: 'building',
            elementType: 'all',
            stylers: {
              color: '#d1d1d1',
            },
          },
          {
            featureType: 'label',
            elementType: 'labels.text.fill',
            stylers: {
              color: '#999999',
            },
          },
        ],
      },
    },
    series: [
      {
        type: 'scatter',
        coordinateSystem: 'bmap',
        data: convertData(data, 3),
        symbolSize: 15,
        itemStyle: {
          color: '#E6A23C',
        },
      },
      {
        type: 'scatter',
        coordinateSystem: 'bmap',
        data: convertData(data, 2),
        symbolSize: 15,
        itemStyle: {
          color: '#909399',
        },
      },
      {
        type: 'effectScatter',
        coordinateSystem: 'bmap',
        data: convertData(data, 1),
        symbolSize: 15,
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke',
          scale: 5,
        },
        label: {
          formatter: '{b}',
          position: 'right',
          show: false,
        },
        itemStyle: {
          color: '#67C23A',
          shadowBlur: 100,
          shadowColor: '#333',
        },
        zlevel: 1,
      },
    ],
  };

  const getOption = () => option;

  const clickHandle = (params) => {
    if (params.data.productID) {
      history.push(
        '/deviceMangers/device/detail/' +
          params.data.productID +
          '/' +
          params.data.deviceName +
          '/1',
      );
    }
  };

  return (
    <div id="map">
      <ReactEChartsCore
        echarts={echarts}
        option={getOption()}
        lazyUpdate={true}
        className={styles.map}
        style={{
          height: '70vh',
        }}
        onEvents={{ click: clickHandle }}
      />
    </div>
  );
};
export default DeviceMap;
