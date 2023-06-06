import { postApiV1SystemCommonUploadFile } from '@/services/iThingsapi/tongyonggongneng';
import { ResponseCode } from '@/utils/base';
import { TOKENKEY } from '@/utils/const';
import { getToken } from '@/utils/utils';
import { ProFormUploadButton } from '@ant-design/pro-components';
import { useRequest } from 'ahooks';
import { message, Spin } from 'antd';
import { useEffect, useState } from 'react';

import type { UploadProps } from 'antd';

const UploadFile: React.FC<{
  accept: string;
  filePathPrefix: string;
  scene: string; //场景(业务定义 如产品图片 productImg)
  business: string; //业务(如产品管理 productManage)
  getUploadFileData: (path: string) => void;
  handleClick?: () => void;
  label?: React.ReactNode;
}> = ({ accept, filePathPrefix, scene, business, handleClick, label, getUploadFileData }) => {
  const [processLoading, setProcessLoading] = useState(false);

  const { data, run } = useRequest((params) => postApiV1SystemCommonUploadFile(params), {
    manual: true,
    onSuccess: (res) => {
      setProcessLoading(false);
      if (res?.code === ResponseCode.SUCCESS) {
        message.success('上传成功');
      } else message.error('上传失败');
    },
    onError: () => {
      setProcessLoading(false);
      message.success('上传错误');
    },
  });
  const customRequest: UploadProps['customRequest'] = async (info) => {
    setProcessLoading(true);
    run({
      business: business,
      scene: scene,
      filePath: `${filePathPrefix}/${info?.file?.name}`,
      file: info.file,
    });
  };

  useEffect(() => {
    if (data?.code === ResponseCode.SUCCESS) getUploadFileData(data?.data?.filePath as string);
  }, [data]);

  return (
    <Spin spinning={processLoading}>
      <ProFormUploadButton
        width="md"
        label={label}
        accept={accept}
        fieldProps={{
          headers: {
            [TOKENKEY]: getToken(),
          },
          customRequest,
          showUploadList: false,
          progress: {
            strokeColor: {
              '0%': '#108ee9',
              '100%': '#87d068',
            },
            strokeWidth: 3,
            format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
          },
        }}
        buttonProps={{
          onClick: handleClick,
        }}
      />
    </Spin>
  );
};

export default UploadFile;
