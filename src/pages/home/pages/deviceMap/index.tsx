import ReactEChartsCore from 'echarts-for-react/lib/core';
import { EffectScatterChart, ScatterChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { useHistory } from 'umi';

import type { DeviceStatic } from '@/pages/home/data';
import type { DeviceListProps } from '@/pages/home/pages/deviceMap/types';
import type { EffectScatterSeriesOption, ScatterSeriesOption } from 'echarts/charts';
import type { TitleComponentOption, TooltipComponentOption } from 'echarts/components';

import 'echarts/extension/bmap/bmap';
import type { TopLevelFormatterParams } from 'echarts/types/dist/shared';

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

// mock

const deviceList: DeviceListProps[] = [
  {
    deviceName: '体温检测设备(admin)',
    createdTime: '1671024142477',
    isOnline: 1,
    productID: '1',
    productName: '体温检测仪(管理员)',
    longitude: 103.411381,
    latitude: 27.387742,
    deviceAddress: '中国',
    firstLogin: '1671024142477',
    lastLogin: '1671024142477',
    version: 'V1',
  },
  {
    deviceName: '体温检测设备(T2)',
    createdTime: '1671024142477',
    isOnline: 2,
    productID: '1',
    productName: '体温检测仪(管理员)',
    longitude: 109.416191,
    latitude: 38,
    deviceAddress: '中国',
    firstLogin: '1671024142477',
    lastLogin: '1671024142477',
    version: 'V2',
  },
  {
    deviceName: '体温检测仪(U2)',
    createdTime: '1671024142477',
    isOnline: 3,
    productID: '1',
    productName: '体温检测仪(管理员)',
    longitude: 113.520027,
    latitude: 34.907662,
    deviceAddress: '中国',
    firstLogin: '1671024142477',
    lastLogin: '1671024142477',
    version: 'V1',
  },
];

const DeviceMap: React.FC<DeviceMapProps> = () => {
  const history = useHistory();

  const convertData = function (data: DeviceListProps[], status: number) {
    const res: Omit<DeviceListProps, 'longitude' | 'latitude'>[] = [];
    for (let i = 0; i < data.length; i++) {
      const geoCoord = [data[i].longitude, data[i].latitude];
      if (geoCoord && (data[i].isOnline === status || data[i].firstLogin === '0')) {
        res.push({
          deviceName: data[i].deviceName,
          value: geoCoord,
          createdTime: data[i].createdTime,
          isOnline: data[i].isOnline,
          productID: data[i].productID,
          productName: data[i].productName,
          deviceAddress: data[i].deviceAddress,
          firstLogin: data[i].firstLogin,
          lastLogin: data[i].lastLogin,
          version: data[i].version,
        });
      }
    }
    return res;
  };

  const option: EChartsOption = {
    title: {
      text: '设备分布（在线数 ' + deviceList.filter((x) => x.isOnline == 1).length + '）',
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
      formatter: function (params: TopLevelFormatterParams) {
        let htmlStr = '<div style="padding:5px;line-height:28px;">';
        htmlStr +=
          "设备名称： <span style='color:#409EFF'>" + params.data.deviceName + '</span><br />';
        htmlStr += '设备创建时间： ' + params.data.createdTime + '<br />';
        htmlStr += '设备状态： ';
        if (params.data.isOnline === 3) {
          htmlStr += "<span style='color:#E6A23C'>未激活</span>" + '<br />';
        } else if (params.data.isOnline == 1) {
          htmlStr += "<span style='color:#67C23A'>在线</span>" + '<br />';
        } else if (params.data.isOnline == 2) {
          htmlStr += "<span style='color:#909399'>离线</span>" + '<br />';
        }
        htmlStr += '产品ID： ' + params.data.productID + '<br />';
        htmlStr += '产品名称： ' + params.data.productName + '<br />';
        htmlStr += '设备位置： ' + params.data.deviceAddress + '<br />';
        htmlStr += '激活时间： ' + params.data.firstLogin + '<br />';
        htmlStr += '最后上线时间： ' + params.data.lastLogin + '<br />';
        htmlStr += '固件版本： Version ' + params.data.version + '<br />';
        htmlStr += '</div>';
        return htmlStr;
      },
    },
    bmap: {
      center: [133, 38],
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
        data: convertData(deviceList, 3),
        symbolSize: 15,
        itemStyle: {
          color: '#E6A23C',
        },
      },
      {
        type: 'scatter',
        coordinateSystem: 'bmap',
        data: convertData(deviceList, 2),
        symbolSize: 15,
        itemStyle: {
          color: '#909399',
        },
      },
      {
        type: 'effectScatter',
        coordinateSystem: 'bmap',
        data: convertData(deviceList, 1),
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
        style={{ height: '60vh', border: '1px solid #ccc', marginTop: '20px', borderRadius: '6px' }}
        onEvents={{ click: clickHandle }}
      />
    </div>
  );
};
export default DeviceMap;
