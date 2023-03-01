import { getLocal } from '@/utils/utils';

export async function loadBMap() {
  return new Promise(function (resolve, reject) {
    const data = JSON.parse(getLocal('mapData') as string);
    if (typeof window.BMap !== 'undefined') {
      resolve(window.BMap);
      return true;
    }
    window.onBMapCallback = function () {
      resolve(window.BMap);
    };
    // 使用https协议需要添加一下meta标签
    const protocolStr = document.location.protocol;
    if (protocolStr == 'https:') {
      const meta = document.createElement('meta');
      meta.httpEquiv = 'Content-Security-Policy';
      meta.content = 'upgrade-insecure-requests';
      meta.onerror = reject;
      document.head.appendChild(meta);
    }
    // 引入百度地图
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src =
      'http://api.map.baidu.com/api?v=2.0&ak=' +
      data.map.accessKey +
      '&__ec_v__=20190126&callback=onBMapCallback';
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
