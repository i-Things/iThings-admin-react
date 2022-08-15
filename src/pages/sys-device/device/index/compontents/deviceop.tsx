import React from "react";
import { message, Modal } from "antd";
import {
  ProForm,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormList,
  ProFormGroup,
} from "@ant-design/pro-form";

export type DeviceFormProps = {
  onCancel: () => void;
  onSubmit: (values: any) => void;
  modalVisible: boolean;
  values: Partial<API.shebeixinxihexinziduan>;
  type: string;
};

const DeviceOp: React.FC<DeviceFormProps> = (props) => {
  let title = props.type == "add" ? "添加" : "编辑";
  let isHidden = props.type == "add" ? false : true;

  return (
    <>
      {props.modalVisible && (
        <Modal
          title={`${title}设备`}
          centered
          visible={props.modalVisible}
          onCancel={() => props.onCancel()}
          width={800}
          footer={[]}
        >
          <ProForm
            initialValues={props.values}
            onFinish={async (values) => {
              props.onSubmit(values);
            }}
          >
            <ProFormText
              width="md"
              label="产品ID"
              name="productID"
              hidden={isHidden}
              rules={[
                {
                  required: true,
                  message: "请输入产品ID",
                },
              ]}
              placeholder="产品ID"
            />
            <ProFormText
              width="md"
              label="设备名称"
              name="deviceName"
              disabled={isHidden}
              rules={[
                {
                  required: true,
                  message: "请输入设备名称",
                },
              ]}
              placeholder="设备名称"
            />
            <ProFormText
              width="md"
              label="固件版本"
              name="version"
              rules={[
                {
                  required: true,
                  message: "请输入固件版本",
                },
              ]}
              placeholder="固件版本"
            />
            <ProFormSelect
              width="md"
              name="logLevel"
              label="日志等级"
              options={[
                { label: "关闭", value: 0 },
                { label: "关闭", value: 1 },
                { label: "错误", value: 2 },
                { label: "告警", value: 3 },
                { label: "信息", value: 4 },
                { label: "调试", value: 5 },
              ]}
              placeholder="请选择日志等级"
              rules={[{ required: true, message: "请选择日志等级" }]}
            />

            <ProFormList
              name="tags"
              label="标签"
              deleteIconProps={{
                tooltipText: "删除标签",
              }}
              creatorButtonProps={{
                creatorButtonText: "增加标签",
              }}
            >
              <ProFormGroup key="group">
                <ProFormText name="key" label="key" />
                <ProFormText name="value" label="value" />
              </ProFormGroup>
            </ProFormList>
          </ProForm>
        </Modal>
      )}
    </>
  );
};

export default DeviceOp;
