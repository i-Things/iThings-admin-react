// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 获取场景信息 GET / */
export async function get(options?: { [key: string]: any }) {
  return request<{
    message: string;
    result: {
      id?: string;
      name?: string;
      triggerType?: string;
      trigger: {
        type?: string;
        device: {
          selector?: string;
          selectorValues?: { value?: string; name?: string }[];
          productId?: string;
          operation: {
            operator?: string;
            timer: {
              trigger?: string;
              when?: string[];
              mod?: string;
              period: { from?: string; to?: string; every?: number; unit?: string };
            };
            readProperties?: string[];
          };
        };
      };
      parallel?: boolean;
      branches?: {
        when?: {
          type?: string;
          termType?: string;
          options?: string[];
          terms?: {
            column?: string;
            value: { value?: string; source?: string };
            type?: string;
            termType?: string;
            options?: string[];
            terms?: string[];
          }[];
        }[];
        shakeLimit: { enabled?: boolean; time?: number; threshold?: number; alarmFirst?: boolean };
        then?: {
          parallel?: boolean;
          actions?: {
            executor?: string;
            device: {
              source?: string;
              selector?: string;
              selectorValues?: { value?: string; name?: string }[];
              productId?: string;
              message: { messageType?: string; properties?: string[] };
            };
            options: {
              name?: string;
              type?: string;
              properties?: string;
              propertiesValue?: string;
              selector?: string;
              productName?: string;
              relationName?: string;
              triggerName?: string;
              taglist?: string[];
              columns?: string[];
              otherColumns?: string[];
            };
          }[];
        }[];
      }[];
      creatorId?: string;
      createTime?: number;
      modifierId?: string;
      modifyTime?: number;
      startTime?: number;
      state: { text?: string; value?: string };
      options: {
        trigger: {
          name?: string;
          extraName?: string;
          onlyName?: boolean;
          type?: string;
          typeIcon?: string;
          productName?: string;
          selectorIcon?: string;
          time?: string;
          when?: string;
          extraTime?: string;
          action?: string;
          productPage?: number;
          productPageSize?: number;
          devicePage?: number;
          devicePageSize?: number;
        };
        when?: { terms?: { terms?: (string | { '0'?: string })[][]; termType?: string }[] }[];
      };
    };
    status: number;
    timestamp: number;
  }>('/', {
    method: 'GET',
    ...(options || {}),
  });
}
