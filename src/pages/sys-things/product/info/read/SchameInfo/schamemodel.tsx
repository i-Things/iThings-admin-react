import React, { useState } from "react";
import {
  message,
  Modal,
  Button,
  InputNumber,
  Table,
  Form,
  Input,
  Select,
  Row,
  Col,
} from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

import {
  ProForm,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormFieldSet,
} from "@ant-design/pro-form";
import {
  EditableProTable,
  ProCard,
  ProFormField,
} from "@ant-design/pro-components";

type DataSourceType = {
  id: React.Key;
  title?: string;
  decs?: string;
  state?: string;
  created_at?: string;
  children?: DataSourceType[];
};

const defaultData: DataSourceType[] = new Array(1).fill(1).map((_, index) => {
  return {
    id: (Date.now() + index).toString(),
    title: `活动名称${index}`,
    decs: "这个活动真好玩",
    state: "bool",
    created_at: "2020-05-26T09:42:56Z",
  };
});

export const structTable = (props) => {
  const value = props.value;

  return (
    <Form>
      <ProFormFieldSet name="list" label="" type="group">
        <ProFormText
          width="130px"
          name="name1"
          fieldProps={{
            addonBefore: "0",
          }}
          placeholder="关"
        />
        <ProFormText
          width="130px"
          name="name1"
          fieldProps={{
            addonBefore: "1",
          }}
          placeholder="开"
        />
      </ProFormFieldSet>
    </Form>
  );
};
const Editable = () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    defaultData.map((item) => item.id)
  );
  const [dataSource, setDataSource] = useState<DataSourceType[]>(
    () => defaultData
  );

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: "参数名称",
      dataIndex: "title",
      width: "20%",
    },
    {
      title: "参数标识",
      dataIndex: "decs",
      width: "20%",
    },
    {
      title: "数据类型",
      key: "state",
      dataIndex: "state",
      valueType: "select",
      width: "15%",
      valueEnum: {
        bool: {
          value: "bool",
          text: "布尔型",
        },
        int: {
          value: "int",
          text: "整数型",
        },
        string: {
          value: "string",
          text: "字符串",
        },
        float: {
          value: "float",
          text: "浮点型",
        },
        enum: {
          value: "enum",
          text: "枚举",
        },

        timestamp: {
          value: "timestamp",
          text: "时间型",
        },
        struct: {
          value: "struct",
          text: "结构体",
        },
        array: {
          value: "array",
          text: "数组",
        },
      },
    },
    {
      title: "数据定义",
      dataIndex: "dataDefine",
      width: 250,
      renderFormItem: () => <structTable></structTable>,
    },
    {
      title: "操作",
      valueType: "option",
      width: 250,
      render: () => {
        return null;
      },
    },
  ];

  return (
    <>
      <EditableProTable<DataSourceType>
        columns={columns}
        rowKey="id"
        scroll={{
          x: 960,
        }}
        value={dataSource}
        onChange={setDataSource}
        recordCreatorProps={{
          newRecordType: "dataSource",
          record: () => ({
            id: Date.now(),
          }),
        }}
        editable={{
          type: "multiple",
          editableKeys,
          actionRender: (row, config, defaultDoms) => {
            return [defaultDoms.delete];
          },
          onValuesChange: (record, recordList) => {
            setDataSource(recordList);
          },
          onChange: setEditableRowKeys,
        }}
      />
    </>
  );
};

export type SchameFormProps = {
  onCancel: () => void;
  onSubmit: (values: any) => void;
  modalVisible: boolean;
  values: any;
  type: string;
};

interface EnumData {
  key: string;
  enumKey: string;
  enumValue: string;
}
const columns: ColumnsType<EnumData> = [
  {
    title: "枚举键值",
    dataIndex: "enumKey",
    key: "enumKey",
    render(text, field) {
      return (
        <Form.Item>
          <Input placeholder="请输入姓名" allowClear />
        </Form.Item>
      );
    },
  },
  {
    title: "枚举项描述",
    dataIndex: "enumValue",
    key: "enumValue",
    render(text, field) {
      return (
        <Form.Item>
          <Input placeholder="请输入姓名" allowClear />
        </Form.Item>
      );
    },
  },
  {
    title: "",
    key: "action",
    dataIndex: "action",
    render: (_, record) => <a>删除</a>,
  },
];

const data: EnumData[] = [
  {
    key: "1",
    enumKey: "",
    enumValue: "",
  },
];

interface structDataType {
  key: string;
  paramName: string;
  paramTag: string;
  dataType: string;
}
const structColumns: ColumnsType<structDataType> = [
  {
    title: "参数名称",
    dataIndex: "paramName",
    key: "paramName",
    render(text, field) {
      return (
        <Form.Item>
          <Input placeholder="" allowClear />
        </Form.Item>
      );
    },
  },
  {
    title: "参数标识",
    dataIndex: "paramTag",
    key: "paramTag",
    render(text, field) {
      return (
        <Form.Item>
          <Input placeholder="" allowClear />
        </Form.Item>
      );
    },
  },
  {
    title: "数据类型",
    dataIndex: "dataType",
    key: "dataType",
    render(text, field) {
      return (
        <Form.Item>
          <Select
            defaultValue={"bool"}
            name={[field.name, "dataType"]}
            fieldKey={[field.fieldKey, "dataType"]}
            fieldProps={{
              value: field.dataType,
              onChange: (e) => setDataType(e.target.value),
            }}
            options={[
              {
                value: "bool",
                label: "布尔型",
              },
              {
                value: "int",
                label: "整数型",
              },
              {
                value: "string",
                label: "字符串",
              },
              {
                value: "float",
                label: "浮点型",
              },
              {
                value: "enum",
                label: "枚举",
              },

              {
                value: "timestamp",
                label: "时间型",
              },
              {
                value: "struct",
                label: "结构体",
              },
              {
                value: "array",
                label: "数组",
              },
            ]}
          ></Select>
        </Form.Item>
      );
    },
  },
  {
    title: "数据定义",
    dataIndex: "dataDefine",
    key: "dataDefine",
    render(text, field) {
      return (
        <Form>
          {field.dataType == "bool" && (
            <ProFormFieldSet name="list" label="" type="group">
              <ProFormText
                width="130px"
                name="name1"
                fieldProps={{
                  addonBefore: "0",
                }}
                placeholder="关"
              />
              <ProFormText
                width="130px"
                name="name1"
                fieldProps={{
                  addonBefore: "1",
                }}
                placeholder="开"
              />
            </ProFormFieldSet>
          )}
        </Form>
      );
    },
  },
  {
    title: "",
    key: "action",
    dataIndex: "action",
    render: (_, record) => <a>删除</a>,
  },
];
const getColumns = (add, remove) => {
  return [
    {
      title: "参数名称",
      dataIndex: "paramName",
      key: "paramName",
      render(text, field) {
        return (
          <Form.Item>
            <Input placeholder="" allowClear />
          </Form.Item>
        );
      },
    },
    {
      title: "参数标识",
      dataIndex: "paramTag",
      key: "paramTag",
      render(text, field) {
        return (
          <Form.Item>
            <Input placeholder="" allowClear />
          </Form.Item>
        );
      },
    },
    {
      title: "数据类型",
      dataIndex: "dataType",
      key: "dataType",
      render(text, field) {
        return (
          <Form.Item
            defaultValue={"bool"}
            name={[field.name, "dataType"]}
            fieldKey={[field.fieldKey, "dataType"]}
          >
            <Select
              fieldProps={{
                value: field.dataType,
                onChange: (e) => setDataType(e.target.value),
              }}
              options={[
                {
                  value: "bool",
                  label: "布尔型",
                },
                {
                  value: "int",
                  label: "整数型",
                },
                {
                  value: "string",
                  label: "字符串",
                },
                {
                  value: "float",
                  label: "浮点型",
                },
                {
                  value: "enum",
                  label: "枚举",
                },

                {
                  value: "timestamp",
                  label: "时间型",
                },
                {
                  value: "struct",
                  label: "结构体",
                },
                {
                  value: "array",
                  label: "数组",
                },
              ]}
            ></Select>
          </Form.Item>
        );
      },
    },
    {
      title: "数据定义",
      dataIndex: "dataDefine",
      key: "dataDefine",
      render(text, field) {
        return (
          <Form>
            {field.dataType == "bool" && (
              <ProFormFieldSet name="list" label="" type="group">
                <ProFormText
                  width="130px"
                  name="name1"
                  fieldProps={{
                    addonBefore: "0",
                  }}
                  placeholder="关"
                />
                <ProFormText
                  width="130px"
                  name="name1"
                  fieldProps={{
                    addonBefore: "1",
                  }}
                  placeholder="开"
                />
              </ProFormFieldSet>
            )}
          </Form>
        );
      },
    },
    {
      title: "",
      key: "action",
      dataIndex: "action",
      render: (_, record) => (
        <a
          onClick={() => {
            console.log(record);
          }}
        >
          删除
        </a>
      ),
    },
  ];
};

const structData: structDataType[] = [
  {
    key: "1",
    paramName: "",
    paramTag: "",
    dataType: "bool",
  },
];

const SchameModel: React.FC<SchameFormProps> = (props) => {
  const [formLayoutType, setFormLayoutType] = useState<string>("功能");
  const [dataType, setDataType] = useState<string>("bool");
  const [elementType, setElementType] = useState<string>("int");
  const [eventType, setEventType] = useState<string>("alarm");
  const [form] = Form.useForm();

  return (
    <>
      {props.modalVisible && (
        <Modal
          title="新增自定义功能"
          centered
          visible={props.modalVisible}
          onOk={() => props.onSubmit({})}
          onCancel={() => props.onCancel()}
          width={1200}
          footer={[]}
        >
          <ProForm
            initialValues={props.values}
            onFinish={async (values) => {
              // if
              // let r = await createProduct(values);
              // if (r?.code == 200) {
              props.onSubmit(values);
              //}
            }}
            layout="horizontal"
            labelCol={{ span: 2 }}
          >
            <ProFormRadio.Group
              style={{
                margin: 16,
              }}
              label="功能类型"
              radioType="button"
              fieldProps={{
                value: formLayoutType,
                onChange: (e) => setFormLayoutType(e.target.value),
              }}
              options={["功能", "属性", "类型"]}
            />

            <ProFormText
              width="md"
              label="功能名称"
              name="name"
              rules={[
                {
                  required: true,
                  message: "请输入功能名称",
                },
              ]}
              placeholder="功能名称"
            />

            <ProFormText
              width="md"
              label="标识符"
              name="name1"
              rules={[
                {
                  required: true,
                  message: "请输入标识符",
                },
              ]}
              placeholder="标识符"
            />

            {formLayoutType == "功能" && (
              <div>
                <ProFormRadio.Group
                  style={{
                    margin: 16,
                  }}
                  label="数据类型"
                  radioType="button"
                  fieldProps={{
                    value: dataType,
                    onChange: (e) => setDataType(e.target.value),
                  }}
                  options={[
                    {
                      value: "bool",
                      label: "布尔型",
                    },
                    {
                      value: "int",
                      label: "整数型",
                    },
                    {
                      value: "string",
                      label: "字符串",
                    },
                    {
                      value: "float",
                      label: "浮点型",
                    },
                    {
                      value: "enum",
                      label: "枚举",
                    },

                    {
                      value: "timestamp",
                      label: "时间型",
                    },
                    {
                      value: "struct",
                      label: "结构体",
                    },
                    {
                      value: "array",
                      label: "数组",
                    },
                  ]}
                />
                <ProFormRadio.Group
                  options={[
                    {
                      value: 1,
                      label: "只读",
                    },
                    {
                      value: 2,
                      label: "只写",
                    },
                  ]}
                  radioType="button"
                  label="读写类型"
                  name="dataProto"
                />
                {dataType == "array" && (
                  <ProFormRadio.Group
                    style={{
                      margin: 16,
                    }}
                    label="元素类型"
                    radioType="button"
                    fieldProps={{
                      value: elementType,
                      onChange: (e) => setElementType(e.target.value),
                    }}
                    options={[
                      {
                        value: "int",
                        label: "整数型",
                      },
                      {
                        value: "string",
                        label: "字符串",
                      },
                      {
                        value: "float",
                        label: "浮点型",
                      },
                      {
                        value: "struct",
                        label: "结构体",
                      },
                    ]}
                  />
                )}
                {dataType == "bool" && (
                  <ProFormFieldSet name="list" label="数据定义" type="group">
                    <ProFormText
                      width="sm"
                      name="name1"
                      fieldProps={{
                        addonBefore: "0",
                      }}
                      placeholder="关"
                    />
                    <ProFormText
                      width="sm"
                      name="name1"
                      fieldProps={{
                        addonBefore: "1",
                      }}
                      placeholder="开"
                    />
                  </ProFormFieldSet>
                )}
                {(dataType == "int" ||
                  dataType == "float" ||
                  (dataType == "array" &&
                    (elementType == "int" || elementType == "float"))) && (
                  <ProFormFieldSet name="list" label="数据范围" type="group">
                    <Button icon={<MinusOutlined />} />
                    <ProFormText width="sm" name="name1" placeholder="关" />
                    <Button icon={<PlusOutlined />} />

                    <span> &nbsp; - &nbsp;</span>

                    <Button icon={<MinusOutlined />} />
                    <ProFormText width="sm" name="name1" placeholder="关" />
                    <Button icon={<PlusOutlined />} />
                  </ProFormFieldSet>
                )}
                {(dataType == "int" ||
                  dataType == "float" ||
                  (dataType == "array" &&
                    (elementType == "int" || elementType == "float"))) && (
                  <ProFormFieldSet name="list" label="初始值" type="group">
                    <Button icon={<MinusOutlined />} />
                    <ProFormText width="sm" name="name1" placeholder="关" />
                    <Button icon={<PlusOutlined />} />
                  </ProFormFieldSet>
                )}
                {(dataType == "int" ||
                  dataType == "float" ||
                  (dataType == "array" &&
                    (elementType == "int" || elementType == "float"))) && (
                  <ProFormFieldSet name="list" label="步长" type="group">
                    <Button icon={<MinusOutlined />} />
                    <ProFormText width="sm" name="name1" placeholder="关" />
                    <Button icon={<PlusOutlined />} />
                  </ProFormFieldSet>
                )}
                {(dataType == "int" ||
                  dataType == "float" ||
                  (dataType == "array" &&
                    (elementType == "int" || elementType == "float"))) && (
                  <ProFormText width="md" label="单位" name="nam1e" />
                )}
                {(dataType == "string" ||
                  (dataType == "array" && elementType == "string")) && (
                  <ProFormFieldSet name="list" label="数据定义" type="group">
                    <InputNumber
                      addonBefore="-"
                      controls={false}
                      addonAfter="+"
                      defaultValue={2048}
                      max={2048}
                    />
                  </ProFormFieldSet>
                )}
                {dataType == "timestamp" && (
                  <ProFormFieldSet name="list" label="数据定义" type="group">
                    <label>INT类型的UTC时间戳（秒）</label>
                  </ProFormFieldSet>
                )}
                {dataType == "enum" && (
                  <Form.Item name="list" label="数据定义" type="group">
                    <Row>
                      <Col span={24}>
                        <Table
                          width={100}
                          columns={columns}
                          dataSource={data}
                          pagination={false}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <Form>
                          <a>+添加枚举项</a>
                        </Form>
                      </Col>
                    </Row>
                  </Form.Item>
                )}
                {(dataType == "struct" ||
                  (dataType == "array" && elementType == "struct")) && (
                  <Form.Item name="list" label="数据定义" type="group">
                    <Row>
                      <Col span={24}>
                        <Table
                          columns={structColumns}
                          dataSource={structData}
                          pagination={false}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <Form>
                          <a>添加参数</a>
                        </Form>
                      </Col>
                    </Row>
                  </Form.Item>
                )}{" "}
              </div>
            )}
            {formLayoutType == "属性" && (
              <div>
                <ProFormRadio.Group
                  style={{
                    margin: 16,
                  }}
                  label="事件类型"
                  radioType="button"
                  fieldProps={{
                    value: eventType,
                    onChange: (e) => setEventType(e.target.value),
                  }}
                  options={[
                    {
                      value: "alarm",
                      label: "告警",
                    },
                    {
                      value: "fault",
                      label: "故障",
                    },
                    {
                      value: "info",
                      label: "信息",
                    },
                  ]}
                />
                <Form.Item name="list" label="事件参数" type="group">
                  <Row>
                    <Col span={24}>
                      <Table
                        columns={structColumns}
                        dataSource={structData}
                        pagination={false}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Form>
                        <a>添加参数</a>
                      </Form>
                    </Col>
                  </Row>
                </Form.Item>
              </div>
            )}

            {formLayoutType == "类型" && (
              <div>
                <Form.Item name="list" label="调用参数" type="group">
                  <Row>
                    <Col span={24}>
                      <Table
                        columns={structColumns}
                        dataSource={structData}
                        pagination={false}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Form>
                        <a>添加参数</a>
                      </Form>
                    </Col>
                  </Row>
                </Form.Item>
                <Form.Item name="list" label="返回参数" type="group">
                  <Row>
                    <Col span={24}>
                      {/* <Table
                        columns={structColumns}
                        dataSource={structData}
                        pagination={false}
                      /> */}
                      <Editable></Editable>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Form>
                        <a>添加参数</a>
                      </Form>
                    </Col>
                  </Row>
                </Form.Item>
              </div>
            )}

            <ProFormTextArea
              width="md"
              label="描述"
              name="desc"
              placeholder="选填"
            />
          </ProForm>
        </Modal>
      )}
    </>
  );
};

export default SchameModel;
