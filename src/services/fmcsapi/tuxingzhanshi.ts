// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** 获取面积图数据 POST /api/v1/datav/charts/area */
export async function postV1DatavChartsArea(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postV1DatavChartsAreaParams & {
    // header
    /** 用户token */
    "fmcs-token": string;
    "fmcs-guid"?: string;
  },
  body: {
    model: string;
    clause?: Record<string, any>;
    ql?: string;
  },
  options?: { [key: string]: any }
) {
  return request<{
    code: number;
    msg: string;
    data: { Date?: string; scales?: number }[];
  }>("/api/v1/datav/charts/area", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 获取条形图数据（横向） POST /api/v1/datav/charts/bar */
export async function postV1DatavChartsBar(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postV1DatavChartsBarParams & {
    // header
    /** 用户token */
    "fmcs-token": string;
    "fmcs-guid"?: string;
  },
  body: {
    model: string;
    clause?: Record<string, any>;
    ql?: string;
  },
  options?: { [key: string]: any }
) {
  return request<{
    code: number;
    msg: string;
    data: { label?: string; type?: string; value?: number }[];
  }>("/api/v1/datav/charts/bar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 获取对称条形图数据 POST /api/v1/datav/charts/bidirectional-bar */
export async function postV1DatavChartsBidirectionalBar(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postV1DatavChartsBidirectionalBarParams & {
    // header
    /** 用户token */
    "fmcs-token": string;
    "fmcs-guid"?: string;
  },
  body: {
    /** 可以设置为域模型、数据模型或者已经定义了的代表某个查询条件的模板 */
    model: string;
    /** 通过json组合的查询条件，默认每个json属性之间为and组合条件 */
    clause?: Record<string, any>;
    /** sql或graphql等查询语句，直接提供给后台接口进行查询 */
    ql?: string;
  },
  options?: { [key: string]: any }
) {
  return request<{
    code: number;
    msg: string;
    data: { country?: string; tag1?: number; tag2?: number }[];
  }>("/api/v1/datav/charts/bidirectional-bar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 获取箱型图数据 POST /api/v1/datav/charts/box */
export async function postV1DatavChartsBox(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postV1DatavChartsBoxParams & {
    // header
    /** 用户token */
    "fmcs-token": string;
    "fmcs-guid"?: string;
  },
  body: {
    /** 可以设置为域模型、数据模型或者已经定义了的代表某个查询条件的模板 */
    model: string;
    /** 通过json组合的查询条件，默认每个json属性之间为and组合条件 */
    clause?: Record<string, any>;
    /** sql或graphql等查询语句，直接提供给后台接口进行查询 */
    ql?: string;
  },
  options?: { [key: string]: any }
) {
  return request<{
    code: number;
    msg: string;
    data: {
      x?: string;
      low?: number;
      q1?: number;
      median?: number;
      q3?: number;
      high?: number;
    }[];
  }>("/api/v1/datav/charts/box", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 获取子弹图数据 POST /api/v1/datav/charts/bullet */
export async function postV1DatavChartsBullet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postV1DatavChartsBulletParams & {
    // header
    /** 用户token */
    "fmcs-token": string;
    "fmcs-guid"?: string;
  },
  body: {
    model: string;
    clause?: Record<string, any>;
    ql?: string;
  },
  options?: { [key: string]: any }
) {
  return request<{
    code: number;
    msg: string;
    data: {
      title?: string;
      ranges?: number[];
      measures?: number[];
      target?: number;
    }[];
  }>("/api/v1/datav/charts/bullet", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 获取弦图数据 POST /api/v1/datav/charts/chord */
export async function postV1DatavChartsChord(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postV1DatavChartsChordParams & {
    // header
    /** 用户token */
    "fmcs-token": string;
    "fmcs-guid"?: string;
  },
  body: {
    /** 可以设置为域模型、数据模型或者已经定义了的代表某个查询条件的模板 */
    model: string;
    /** 通过json组合的查询条件，默认每个json属性之间为and组合条件 */
    clause?: Record<string, any>;
    /** sql或graphql等查询语句，直接提供给后台接口进行查询 */
    ql?: string;
  },
  options?: { [key: string]: any }
) {
  return request<{
    code: number;
    msg: string;
    data: { source?: string; target?: string; value?: number }[];
  }>("/api/v1/datav/charts/chord", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 获取填圆图数据 POST /api/v1/datav/charts/circle-packing */
export async function postV1DatavChartsCirclePacking(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postV1DatavChartsCirclePackingParams & {
    // header
    /** 用户token */
    "fmcs-token": string;
    "fmcs-guid"?: string;
  },
  body: {
    /** 可以设置为域模型、数据模型或者已经定义了的代表某个查询条件的模板 */
    model: string;
    /** 通过json组合的查询条件，默认每个json属性之间为and组合条件 */
    clause?: string;
    /** sql或graphql等查询语句，直接提供给后台接口进行查询 */
    ql?: Record<string, any>;
  },
  options?: { [key: string]: any }
) {
  return request<{ code: number; msg: string; data: Record<string, any> }>(
    "/api/v1/datav/charts/circle-packing",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      params: { ...params },
      data: body,
      ...(options || {}),
    }
  );
}

/** 获取柱状图数据（纵向） POST /api/v1/datav/charts/column */
export async function postV1DatavChartsColumn(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postV1DatavChartsColumnParams & {
    // header
    /** 用户token */
    "fmcs-token": string;
    "fmcs-guid"?: string;
  },
  body: {
    model: string;
    clause?: Record<string, any>;
    ql: string;
  },
  options?: { [key: string]: any }
) {
  return request<{
    code: number;
    msg: string;
    data: { year?: number; value?: number; type?: string }[];
  }>("/api/v1/datav/charts/column", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 获取双轴图数据 POST /api/v1/datav/charts/dual-axes */
export async function postV1DatavChartsDualAxes(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postV1DatavChartsDualAxesParams & {
    // header
    /** 用户token */
    "fmcs-token": string;
    "fmcs-guid"?: string;
  },
  body: {
    model: string;
    clause?: Record<string, any>;
    ql?: string;
  },
  options?: { [key: string]: any }
) {
  return request<{
    code: number;
    msg: string;
    data: { year?: string; value?: number; count?: number }[];
  }>("/api/v1/datav/charts/dual-axes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 获取漏斗图数据 POST /api/v1/datav/charts/funnel */
export async function postV1DatavChartsFunnel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postV1DatavChartsFunnelParams & {
    // header
    /** 用户token */
    "fmcs-token": string;
    "fmcs-guid"?: string;
  },
  body: {
    /** 可以设置为域模型、数据模型或者已经定义了的代表某个查询条件的模板 */
    model: string;
    /** 通过json组合的查询条件，默认每个json属性之间为and组合条件 */
    clause?: Record<string, any>;
    /** sql或graphql等查询语句，直接提供给后台接口进行查询 */
    ql?: string;
  },
  options?: { [key: string]: any }
) {
  return request<{
    code: number;
    msg: string;
    data: { stage?: string; number?: number; company?: string }[];
  }>("/api/v1/datav/charts/funnel", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 获取仪表盘数据 POST /api/v1/datav/charts/gauge */
export async function postV1DatavChartsGauge(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postV1DatavChartsGaugeParams & {
    // header
    /** 用户token */
    "fmcs-token": string;
    "fmcs-guid"?: string;
  },
  body: {
    model: string;
    clause?: Record<string, any>;
    ql?: string;
  },
  options?: { [key: string]: any }
) {
  return request<{ code: number; msg: string; data: { percent?: number } }>(
    "/api/v1/datav/charts/gauge",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      params: { ...params },
      data: body,
      ...(options || {}),
    }
  );
}

/** 获取热力图数据 包括：热力图、密度热力图 POST /api/v1/datav/charts/heatmap */
export async function postV1DatavChartsHeatmap(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postV1DatavChartsHeatmapParams & {
    // header
    /** 用户token */
    "fmcs-token": string;
    "fmcs-guid"?: string;
  },
  body: {
    /** 可以设置为域模型、数据模型或者已经定义了的代表某个查询条件的模板 */
    model: string;
    /** 通过json组合的查询条件，默认每个json属性之间为and组合条件 */
    clause?: Record<string, any>;
    /** sql或graphql等查询语句，直接提供给后台接口进行查询 */
    ql?: string;
  },
  options?: { [key: string]: any }
) {
  return request<{
    code: number;
    msg: string;
    data: { "Month of Year"?: number; District?: string; AQHI?: number }[];
  }>("/api/v1/datav/charts/heatmap", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 获取直方图数据 POST /api/v1/datav/charts/histogram */
export async function postV1DatavChartsHistogram(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postV1DatavChartsHistogramParams & {
    // header
    /** 用户token */
    "fmcs-token": string;
    "fmcs-guid"?: string;
  },
  body: {
    /** 可以设置为域模型、数据模型或者已经定义了的代表某个查询条件的模板 */
    model: string;
    /** 通过json组合的查询条件，默认每个json属性之间为and组合条件 */
    clause?: Record<string, any>;
    /** sql或graphql等查询语句，直接提供给后台接口进行查询 */
    ql?: string;
  },
  options?: { [key: string]: any }
) {
  return request<{
    code: number;
    msg: string;
    data: {
      name?: number;
      carat?: number;
      cut?: string;
      color?: string;
      clarity?: string;
      depth?: number;
      table?: number;
      price?: number;
      x?: number;
      y?: number;
      z?: number;
    }[];
  }>("/api/v1/datav/charts/histogram", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 获取折线图数据 包括：基础折线图、基础曲线图、配置折线数据点样式、带缩略轴的折线图、带标注点的折线图、条件样式折线图、自定义折线图marker与交互 POST /api/v1/datav/charts/line */
export async function postV1DatavChartsLine(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postV1DatavChartsLineParams & {
    // header
    /** 用户token */
    "fmcs-token": string;
    /**  时间戳的字符串，精确到毫秒，用于后端日志追踪 */
    "fmcs-guid"?: string;
  },
  body: {
    /** 需要查询的数据模型，也可以设置为系统支持的唯一标识符，让后端API可以用于识别查询条件。
- 当是模型名称的时候，直接使用域模型或者数据模型，可以通过'/'来进行包划分，后端需要对包路径进行处理
- 当时唯一标识符的时候，使用后端提供的查询 guid 来进行查询，后端可以给每种查询条件一套 guid */
    model: string;
    /** 可通过json对象的方式组合查询条件，默认都是 and 规则。 */
    clause?: Record<string, any>;
    /** 直接提供查询条件或查询语句，查询语句可以是标准的SQL，也可以是GraphQL，前端查询时可不填写此条件 */
    ql?: string;
  },
  options?: { [key: string]: any }
) {
  return request<{
    code: number;
    msg: string;
    data: {
      profile: { xField?: string; yField?: string; seriesField?: string };
      list?: {
        "{$yField}"?: number;
        "{$xField}"?: string;
        "{$seriesField}"?: string;
      }[];
    };
  }>("/api/v1/datav/charts/line", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 获取水波图数据 POST /api/v1/datav/charts/liquid */
export async function postV1DatavChartsLiquid(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postV1DatavChartsLiquidParams & {
    // header
    /** 用户token */
    "fmcs-token": string;
    "fmcs-guid"?: string;
  },
  body: {
    model: string;
    clause?: Record<string, any>;
    ql?: string;
  },
  options?: { [key: string]: any }
) {
  return request<{ code: number; msg: string; data: { percent?: number } }>(
    "/api/v1/datav/charts/liquid",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      params: { ...params },
      data: body,
      ...(options || {}),
    }
  );
}

/** 获取区域地图数据 POST /api/v1/datav/charts/map-area */
export async function postV1DatavChartsMapArea(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postV1DatavChartsMapAreaParams & {
    // header
    /** 用户token */
    "fmcs-token": string;
    "fmcs-guid": string;
  },
  body: {
    model: string;
    clause?: Record<string, any>;
    ql?: string;
  },
  options?: { [key: string]: any }
) {
  return request<{
    code: number;
    msg: string;
    data: {
      type?: string;
      propoerties: {
        adcode?: string;
        name?: string;
        center?: number[];
        centroid?: number[];
        childrenNum?: number;
        level?: string;
        parent: { adcode?: string };
        subFeatureIndex?: number;
        acroutes?: number[];
        adchar?: string;
      };
      geometry: { type?: string; coordinates?: number[][][] };
    }[];
  }>("/api/v1/datav/charts/map-area", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 获取行政区域地图数据 POST /api/v1/datav/charts/map-choropleth */
export async function postV1DatavChartsMapChoropleth(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postV1DatavChartsMapChoroplethParams & {
    // header
    /** 用户token */
    "fmcs-token": string;
    "fmcs-guid"?: string;
  },
  body: {
    model: string;
    clause?: Record<string, any>;
    ql?: string;
  },
  options?: { [key: string]: any }
) {
  return request<{
    code: number;
    msg: string;
    data: {
      name?: string;
      level?: string;
      adcode?: number;
      lng?: number;
      lat?: number;
      childrenNum?: number;
      parent?: number;
    }[];
  }>("/api/v1/datav/charts/map-choropleth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 获取地区散点图数据 POST /api/v1/datav/charts/map-dot */
export async function postV1DatavChartsMapDot(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postV1DatavChartsMapDotParams & {
    // header
    /** 用户token */
    "fmcs-token": string;
    "fmcs-guid"?: string;
  },
  body: {
    model: string;
    clause?: Record<string, any>;
    ql?: string;
  },
  options?: { [key: string]: any }
) {
  return request<{
    code: number;
    msg: string;
    data: { name?: string; style?: number; lnglat?: number[] }[][];
  }>("/api/v1/datav/charts/map-dot", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 获取地区点密度图数据 POST /api/v1/datav/charts/map-dot-density */
export async function postV1DatavChartsMapDotDensity(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postV1DatavChartsMapDotDensityParams & {
    // header
    /** 用户token */
    "fmcs-token": string;
    "fmcs-guid"?: string;
  },
  body: {
    model: string;
    clause?: Record<string, any>;
    ql?: string;
  },
  options?: { [key: string]: any }
) {
  return request<{
    code: number;
    msg: string;
    data: {
      type?: string;
      features?: {
        type?: string;
        properties: { consume?: string };
        geometry: { type?: string; coordinates?: string[][] };
      }[];
    };
  }>("/api/v1/datav/charts/map-dot-density", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 获取点热力图数据 POST /api/v1/datav/charts/map-heat */
export async function postV1DatavChartsMapHeat(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postV1DatavChartsMapHeatParams & {
    // header
    /** 用户token */
    "fmcs-token": string;
    "fmcs-guid"?: string;
  },
  body: {
    model: string;
    clause?: Record<string, any>;
    ql?: string;
  },
  options?: { [key: string]: any }
) {
  return request<{
    type: string;
    features: {
      type?: string;
      geometry: { type?: string; coordinates?: number[] };
      properties: {
        ranking?: number;
        prov?: string;
        city?: string;
        mom?: string;
        yoy?: string;
        index?: number;
        avg?: number;
        lnglat?: string;
      };
    }[];
  }>("/api/v1/datav/charts/map-heat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 获取多环图数据（定制） 支持饼图、环图 POST /api/v1/datav/charts/multi-ring */
export async function postV1DatavChartsMultiRing(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postV1DatavChartsMultiRingParams & {
    // header
    /** 用户token */
    "fmcs-token": string;
    "fmcs-guid"?: string;
  },
  body: {
    model: string;
    clause?: Record<string, any>;
    ql?: string;
  },
  options?: { [key: string]: any }
) {
  return request<{
    code: number;
    msg: string;
    data: { type?: string; value?: number; "{$category}"?: string, list?: any }[];
  }>("/api/v1/datav/charts/multi-ring", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 获取饼图数据 支持饼图、环图 POST /api/v1/datav/charts/pie */
export async function postV1DatavChartsPie(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postV1DatavChartsPieParams & {
    // header
    /** 用户token */
    "fmcs-token": string;
    "fmcs-guid"?: string;
  },
  body: {
    model: string;
    clause?: Record<string, any>;
    ql?: string;
  },
  options?: { [key: string]: any }
) {
  return request<{
    code: number;
    msg: string;
    data: { type?: string; value?: number }[];
  }>("/api/v1/datav/charts/pie", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 获取雷达图数据 POST /api/v1/datav/charts/radar */
export async function postV1DatavChartsRadar(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postV1DatavChartsRadarParams & {
    // header
    /** 用户token */
    "fmcs-token": string;
    "fmcs-guid"?: string;
  },
  body: {
    /** 可以设置为域模型、数据模型或者已经定义了的代表某个查询条件的模板 */
    model: string;
    /** 通过json组合的查询条件，默认每个json属性之间为and组合条件 */
    clause?: Record<string, any>;
    /** sql或graphql等查询语句，直接提供给后台接口进行查询 */
    ql?: string;
  },
  options?: { [key: string]: any }
) {
  return request<{
    code: number;
    msg: string;
    data: { item?: string; user?: string; score?: number }[];
  }>("/api/v1/datav/charts/radar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 获取玉珏图数据 POST /api/v1/datav/charts/radial-bar */
export async function postV1DatavChartsRadialBar(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postV1DatavChartsRadialBarParams & {
    // header
    /** 用户token */
    "fmcs-token": string;
    "fmcs-guid"?: string;
  },
  body: {
    /** 可以设置为域模型、数据模型或者已经定义了的代表某个查询条件的模板 */
    model: string;
    /** 通过json组合的查询条件，默认每个json属性之间为and组合条件 */
    clause?: Record<string, any>;
    /** sql或graphql等查询语句，直接提供给后台接口进行查询 */
    ql?: string;
  },
  options?: { [key: string]: any }
) {
  return request<{
    code: number;
    msg: string;
    data: { name?: string; star?: number }[];
  }>("/api/v1/datav/charts/radial-bar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 获取玫瑰图数据 POST /api/v1/datav/charts/rose */
export async function postV1DatavChartsRose(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postV1DatavChartsRoseParams & {
    // header
    /** 用户token */
    "fmcs-token": string;
    "fmcs-guid"?: string;
  },
  body: {
    /** 可以设置为域模型、数据模型或者已经定义了的代表某个查询条件的模板 */
    model: string;
    /** 通过json组合的查询条件，默认每个json属性之间为and组合条件 */
    clause?: Record<string, any>;
    /** sql或graphql等查询语句，直接提供给后台接口进行查询 */
    ql?: string;
  },
  options?: { [key: string]: any }
) {
  return request<{
    code: number;
    msg: string;
    data: { type?: string; value?: number; user?: string }[];
  }>("/api/v1/datav/charts/rose", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 获取桑基图数据 POST /api/v1/datav/charts/sankey */
export async function postV1DatavChartsSankey(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postV1DatavChartsSankeyParams & {
    // header
    /** 用户token */
    "fmcs-token": string;
    "fmcs-guid"?: string;
  },
  body: {
    /** 可以设置为域模型、数据模型或者已经定义了的代表某个查询条件的模板 */
    model: string;
    /** 通过json组合的查询条件，默认每个json属性之间为and组合条件 */
    clause?: Record<string, any>;
    /** sql或graphql等查询语句，直接提供给后台接口进行查询 */
    ql?: string;
  },
  options?: { [key: string]: any }
) {
  return request<{
    code: number;
    msg: string;
    data: { source?: string; target?: string; value?: number }[];
  }>("/api/v1/datav/charts/sankey", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 获取散点图数据 POST /api/v1/datav/charts/scatter */
export async function postV1DatavChartsScatter(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postV1DatavChartsScatterParams & {
    // header
    /** 用户token */
    "fmcs-token": string;
    "fmcs-guid"?: string;
  },
  body: {
    /** 可以设置为域模型、数据模型或者已经定义了的代表某个查询条件的模板 */
    model: string;
    /** 通过json组合的查询条件，默认每个json属性之间为and组合条件 */
    clause?: Record<string, any>;
    /** sql或graphql等查询语句，直接提供给后台接口进行查询 */
    ql?: string;
  },
  options?: { [key: string]: any }
) {
  return request<{
    code: number;
    msg: string;
    data: {
      value?: number;
      x?: number;
      city?: string;
      area?: string;
      y?: number;
    }[];
  }>("/api/v1/datav/charts/scatter", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 获取股票图数据 POST /api/v1/datav/charts/stock */
export async function postV1DatavChartsStock(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postV1DatavChartsStockParams & {
    // header
    /** 用户token */
    "fmcs-token": string;
    "fmcs-guid"?: string;
  },
  body: {},
  options?: { [key: string]: any }
) {
  return request<{
    code: number;
    msg: string;
    data: { list?: string[]; ""?: string };
  }>("/api/v1/datav/charts/stock", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 获取旭日图数据 POST /api/v1/datav/charts/sunburst */
export async function postV1DatavChartsSunburst(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postV1DatavChartsSunburstParams & {
    // header
    /** 用户token */
    "fmcs-token": string;
    "fmcs-guid"?: string;
  },
  body: {
    /** 可以设置为域模型、数据模型或者已经定义了的代表某个查询条件的模板 */
    model: string;
    /** 通过json组合的查询条件，默认每个json属性之间为and组合条件 */
    clause?: Record<string, any>;
    /** sql或graphql等查询语句，直接提供给后台接口进行查询 */
    ql?: string;
  },
  options?: { [key: string]: any }
) {
  return request<{ code: number; msg: string; data: Record<string, any> }>(
    "/api/v1/datav/charts/sunburst",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      params: { ...params },
      data: body,
      ...(options || {}),
    }
  );
}

/** 获取矩形树图数据 POST /api/v1/datav/charts/treemap */
export async function postV1DatavChartsTreemap(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postV1DatavChartsTreemapParams & {
    // header
    /** 用户token */
    "fmcs-token": string;
    "fmcs-guid"?: string;
  },
  body: {
    /** 可以设置为域模型、数据模型或者已经定义了的代表某个查询条件的模板 */
    model: string;
    /** 通过json组合的查询条件，默认每个json属性之间为and组合条件 */
    clause?: Record<string, any>;
    /** sql或graphql等查询语句，直接提供给后台接口进行查询 */
    ql?: string;
  },
  options?: { [key: string]: any }
) {
  return request<{
    code: number;
    msg: string;
    data: { name?: string; children?: { name?: string; value?: number }[] };
  }>("/api/v1/datav/charts/treemap", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 获取韦恩图数据 POST /api/v1/datav/charts/venn */
export async function postV1DatavChartsVenn(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postV1DatavChartsVennParams & {
    // header
    /** 用户token */
    "fmcs-token": string;
    "fmcs-guid"?: string;
  },
  body: {
    /** 可以设置为域模型、数据模型或者已经定义了的代表某个查询条件的模板 */
    model: string;
    /** 通过json组合的查询条件，默认每个json属性之间为and组合条件 */
    clause?: Record<string, any>;
    /** sql或graphql等查询语句，直接提供给后台接口进行查询 */
    ql?: string;
  },
  options?: { [key: string]: any }
) {
  return request<{ code: number; msg: string; data: Record<string, any> }>(
    "/api/v1/datav/charts/venn",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      params: { ...params },
      data: body,
      ...(options || {}),
    }
  );
}

/** 获取小提琴图数据 POST /api/v1/datav/charts/violin */
export async function postV1DatavChartsViolin(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postV1DatavChartsViolinParams & {
    // header
    /** 用户token */
    "fmcs-token": string;
    "fmcs-guid"?: string;
  },
  body: {
    /** 可以设置为域模型、数据模型或者已经定义了的代表某个查询条件的模板 */
    model: string;
    /** 通过json组合的查询条件，默认每个json属性之间为and组合条件 */
    clause?: Record<string, any>;
    /** sql或graphql等查询语句，直接提供给后台接口进行查询 */
    ql?: string;
  },
  options?: { [key: string]: any }
) {
  return request<{
    code: number;
    msg: string;
    data: { species?: string; x?: string; y?: number }[];
  }>("/api/v1/datav/charts/violin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 获取瀑布图数据 POST /api/v1/datav/charts/waterfall */
export async function postV1DatavChartsWaterfall(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postV1DatavChartsWaterfallParams & {
    // header
    /** 用户token */
    "fmcs-token": string;
    "fmcs-guid"?: string;
  },
  body: {
    /** 可以设置为域模型、数据模型或者已经定义了的代表某个查询条件的模板 */
    model: string;
    /** 通过json组合的查询条件，默认每个json属性之间为and组合条件 */
    clause?: Record<string, any>;
    /** sql或graphql等查询语句，直接提供给后台接口进行查询 */
    ql?: string;
  },
  options?: { [key: string]: any }
) {
  return request<{
    code: number;
    msg: string;
    data: { month?: string; value?: number }[];
  }>("/api/v1/datav/charts/waterfall", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}

/** 获取词云图数据 POST /api/v1/datav/charts/word-cloud */
export async function postV1DatavChartsWordCloud(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postV1DatavChartsWordCloudParams & {
    // header
    /** 用户token */
    "fmcs-token": string;
    "fmcs-guid"?: string;
  },
  body: {
    /** 可以设置为域模型、数据模型或者已经定义了的代表某个查询条件的模板 */
    model: string;
    /** 通过json组合的查询条件，默认每个json属性之间为and组合条件 */
    clause?: Record<string, any>;
    /** sql或graphql等查询语句，直接提供给后台接口进行查询 */
    ql?: string;
  },
  options?: { [key: string]: any }
) {
  return request<{
    code: number;
    msg: string;
    data: { value?: number; name?: string }[];
  }>("/api/v1/datav/charts/word-cloud", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    params: { ...params },
    data: body,
    ...(options || {}),
  });
}
