import { apiParamsGUID } from '@/utils/utils';
import { message } from 'antd';
import { useState } from 'react';
import { OperationTypeEnum } from './type';

const useCRUD = () => {
  const [handlerText, setHandlerText] = useState('');
  const handlerAction = {
    [OperationTypeEnum.ADD]: (handler: any) => {
      handler.actionRef.current?.reload();
      setHandlerText('添加');
      handler.visible(false);
      handler.setStepFormValues({});
    },
    [OperationTypeEnum.UPDATE]: (handler: any) => {
      handler.current?.reload();
      setHandlerText('更新');
      handler.visible(false);
      handler.setStepFormValues({});
    },
    [OperationTypeEnum.REMOVEONE]: (handler: any) => {
      handler.actionRef?.reloadAndRest?.();
      setHandlerText('删除');
    },
    [OperationTypeEnum.REMOVE]: (handler: any) => {
      handler.actionRef?.reloadAndRest?.();
      handler.setSelectedRows([]);
      setHandlerText('删除');
    },
  };
  const addHandler = async <T,>(
    addApi: any,
    operationType: OperationTypeEnum,
    body: T,
    handler: {
      visible?: any;
      setStepFormValues?: any;
      actionRef: any;
      setSelectedRows?: any;
    },
  ) => {
    const hide = message.loading(`正在${handlerText}`);
    let res;
    try {
      const param = apiParamsGUID();
      res = await addApi(param, body);
      if (res.code === 200) {
        hide();
        message.success(`${handlerText}成功`);
        handlerAction[operationType](handler);
        return true;
      }
    } catch (error) {
      hide();
      message.error(`${handlerText}失败请重试！`);
      return false;
    }
    return res;
  };
  return {
    addHandler,
  };
};
export default useCRUD;
