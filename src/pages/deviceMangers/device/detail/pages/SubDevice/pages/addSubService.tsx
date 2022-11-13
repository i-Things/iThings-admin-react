import { postThingsProductInfoIndex } from '@/services/iThingsapi/chanpinguanli';
import { postThingsDeviceInfoIndex } from '@/services/iThingsapi/shebeiguanli';
import { postThingsDeviceGatewayMultiCreate } from '@/services/iThingsapi/wangguanzishebeiguanli';
import { DefaultPage, ResponseCode } from '@/utils/base';
import { useRequest } from 'ahooks';
import { Checkbox, Col, Divider, message, Modal, Pagination, Row, Select, Spin } from 'antd';
import type { CheckboxChangeEvent } from 'antd/lib/checkbox';
import type { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { useState } from 'react';
import type { ModalProps, SelectOption } from './data';

const AddSubServiceModal: React.FC<ModalProps> = (props) => {
  const { visible, onCancel, gateWayProductID, gateWaydeviceName, refresh } = props;

  const [produceListOption, setProductListOption] = useState<SelectOption[]>();
  const [pageNum, setPageNum] = useState(1);
  const [productID, setProductID] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [checkDevice, setCheckDevice] = useState<CheckboxValueType[]>([]);
  const [allChecked, setAllChecked] = useState(false);

  /** 获取网关产品列表 */
  useRequest(postThingsProductInfoIndex, {
    defaultParams: [
      {
        page: {
          size: 9999999,
          page: 1,
        },
        deviceType: 2,
      },
    ],
    onSuccess: (result) => {
      setProductID(result.data.list?.[0].productID || '');
      setProductListOption(() =>
        result.data?.list?.map((item) => ({
          label: item.productName || '',
          value: item.productID || '',
        })),
      );
    },
    onError: (error) => {
      message.error('获取产品错误:' + error.message);
    },
  });

  /** 获取设备列表 */
  const { data: deviceInfo = { list: [], total: 0 }, loading } = useRequest(
    async () => {
      const res = await postThingsDeviceInfoIndex({
        page: {
          size: DefaultPage.size,
          page: pageNum,
        },
        productID,
      });
      return res.data;
    },
    {
      ready: !!productID,
      refreshDeps: [pageNum, productID],
      onError: (error) => {
        message.error('获取设备列表错误:' + error.message);
      },
    },
  );

  /** 切换产品选择 */
  const handleSelectProduct = (val: string) => {
    setProductID(val);
    setCheckDevice([]);
    setAllChecked(false);
  };

  /** 添加设备 */
  const handleOk = () => {
    if (checkDevice.length === 0) {
      message.warning('请选择设备');
      return;
    }
    const params = {
      gateWayProductID,
      gateWaydeviceName,
      list: checkDevice.map((item) => ({ productID, deviceName: String(item) })),
    };
    setSubmitLoading(true);
    postThingsDeviceGatewayMultiCreate(params)
      .then((res) => {
        if (res.code === ResponseCode.SUCCESS) {
          message.success('添加成功');
          refresh();
          onCancel();
        }
      })
      .catch((error) => {
        message.error('添加失败:' + error.message);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  /** 选择子设备 */
  const handleCheckDevice = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setCheckDevice((oldVal) => [...oldVal, e.target.value]);
    } else {
      setCheckDevice((oldVal) => oldVal.filter((item) => item !== e.target.value));
    }
  };

  /** 全选当前页设备 */
  const handleCheckAll = (e: CheckboxChangeEvent) => {
    const checkValue = deviceInfo?.list?.map((item) => item.deviceName || '') || [];
    setAllChecked(e.target.checked);
    if (e.target.checked) {
      setCheckDevice((oldVal) => Array.from(new Set([...oldVal, ...checkValue])));
    } else {
      setCheckDevice((oldValue) => {
        for (let i = 0; i < checkValue.length; i++) {
          for (let j = 0; j < oldValue.length; j++) {
            if (checkValue[i] === oldValue[j]) {
              oldValue.splice(j, 1);
              break;
            }
          }
        }
        return [...oldValue];
      });
    }
  };

  return (
    <Modal
      title="添加子设备"
      visible={visible}
      width={800}
      onCancel={onCancel}
      onOk={handleOk}
      confirmLoading={submitLoading}
    >
      <Row align="middle" gutter={16}>
        <Col>产品</Col>
        <Col>
          <Select
            placeholder="请选择产品"
            options={produceListOption}
            style={{ width: '200px' }}
            onSelect={handleSelectProduct}
            value={productID}
          />
        </Col>
      </Row>
      <div style={{ marginTop: '20px' }}>
        <Row
          justify="space-between"
          style={{ backgroundColor: 'rgb(242, 242, 242)', padding: '4px' }}
        >
          <Col>已勾选{checkDevice.length}项</Col>
          <Col>
            <Checkbox checked={allChecked} onChange={handleCheckAll}>
              全选
            </Checkbox>
          </Col>
        </Row>
        <Divider style={{ marginTop: '4px' }} />
        <Spin spinning={loading}>
          {deviceInfo?.list && deviceInfo.list.length > 0 && (
            <Checkbox.Group value={checkDevice} style={{ width: '100%' }}>
              <Row gutter={[16, 16]}>
                {deviceInfo?.list?.map((item) => (
                  <Col key={item.deviceName} span={8}>
                    <Checkbox value={item.deviceName} onChange={handleCheckDevice}>
                      <span style={{ marginRight: '4px' }}>{item.deviceName}</span>
                      <a
                        href={`/deviceMangers/device/detail/${productID}/${item.deviceName}/1`}
                        rel="noreferrer"
                        target="_blank"
                      >
                        详情
                      </a>
                    </Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          )}
          {!loading && deviceInfo?.list && deviceInfo.list.length === 0 && (
            <div style={{ textAlign: 'center' }}>当前暂无数据，请选择其他产品</div>
          )}
        </Spin>
        <Divider />
        <Row justify="space-between">
          <Col>共{deviceInfo.total}条</Col>
          <Col>
            <Pagination
              current={pageNum}
              hideOnSinglePage
              onChange={(page) => {
                setAllChecked(false);
                setPageNum(page);
              }}
              total={deviceInfo.total}
            />
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default AddSubServiceModal;
