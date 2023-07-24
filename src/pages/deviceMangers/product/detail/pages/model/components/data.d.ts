

/**
 * 参数定义
 *
 * SchemaDefine
 */
export interface SchemaDefineElement {
    /**
     * 数组
     */
    arrayInfo: null | SchemaDefineElement;
    /**
     * 枚举及bool类型，bool enum
     */
    mapping: null | string;
    /**
     * 数值最大值，int string float
     */
    max: null | string;
    /**
     * 数值最小值，int  float
     */
    min: null | string;
    /**
     * 结构体，struct
     */
    specs: SchemaDefineElement[] | null;
    /**
     * 初始值，int float
     */
    start: null | string;
    /**
     * 步长，float
     */
    step: null | string;
    /**
     * 参数类型，bool int string struct float timestamp array enum
     */
    type: string;
    /**
     * 单位，int float
     */
    unit: null | string;
}
/**
 * SchemaSpec
 */
export interface SchemaSpec {
    /**
     * 参数定义
     */
    dataType: SchemaDefine;
    /**
     * 参数标识符
     */
    identifier: string;
    /**
     * 参数名称
     */
    name: string;
}


/**
 * 行为参数
 */
export interface SchemaAction {
    /**
     * 调用参数
     */
    input: SchemaParam[];
    /**
     * 返回参数
     */
    output: SchemaParam[];
}

/**
 * 属性参数
 */
export interface SchemaProperty {
    /**
     * 参数定义
     */
    define: SchemaDefine;
    /**
     * 读写类型，r(只读) rw(可读可写)
     */
    mode: string;
}

/**
 * 事件参数
 */
export interface SchemaEvent {
    /**
     * 事件参数
     */
    params: SchemaParam[];
    /**
     * 事件类型，信息:info  告警alert  故障:fault
     */
    type: string;
}

/**
 * SchemaParam
 */
export interface SchemaParam {
    /**
     * 参数定义
     */
    define: SchemaDefine;
    /**
     * 参数标识符
     */
    identifier: string;
    /**
     * 参数名称
     */
    name: string;
}

/**
 * 参数定义(很多都会复用的参数定义)
 *
 * SchemaDefine
 */
export interface SchemaDefine {
    /**
     * 数组
     */
    arrayInfo: null | SchemaDefine;
    /**
     * 枚举及bool类型，bool enum
     */
    mapping: null | string;
    /**
     * 数值最大值，int string float
     */
    max: null | string;
    /**
     * 数值最小值，int  float
     */
    min: null | string;
    /**
     * 结构体，struct
     */
    specs: SchemaDefine[] | null;
    /**
     * 初始值，int float
     */
    start: null | string;
    /**
     * 步长，float
     */
    step: null | string;
    /**
     * 参数类型，bool int string struct float timestamp array enum
     */
    type: string;
    /**
     * 单位，int float
     */
    unit: null | string;
}
