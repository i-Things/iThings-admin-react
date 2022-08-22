import { ActionType, ProTable } from "@ant-design/pro-table";
import { Button, Card, Col, message, Modal, Row } from "antd";
import React, { useRef, useState } from "react";

import {
  postV1SystemUserCaptcha,
  postV1SystemUserCoreCreate,
  postV1SystemUserCoreIndex,
  postV1SystemUserInfoCreate,
  postV1SystemUserInfoUpdate,
  postV1SystemUserInfo__openAPI__delete
} from "@/services/fmcsapi/yonghuguanli";
import { timestampToDateStr } from "@/utils/date";
import { apiParams, apiParamsGUID } from "@/utils/utils";
import {
  ExclamationCircleOutlined,
  FontColorsOutlined
} from "@ant-design/icons";
import {
  ModalForm,
  ProFormCaptcha,
  ProFormSelect,
  ProFormText,
  StepsForm
} from "@ant-design/pro-form";
import styles from "./style.less";

const columns: any = [
  {
    key: "userName",
    title: "用户名",
    dataIndex: "userName",
  },
  {
    key: "uid",
    title: "UID",
    dataIndex: "uid",
  },
  {
    key: "createdTime",
    title: "创建时间",
    dataIndex: "createdTime",
    render: (text: any) => (text == "-" ? text : timestampToDateStr(text)),
  },
];

const { confirm } = Modal;
const IndexPage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [createVisible, setCreateVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [captchaURL, setCaptchaURL] = useState<string>("");
  const [codeID, setCodeID] = useState<string>("");
  const [firstStepFormData, setFirstStepFormData] = useState<any>({});
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const editFormRef = useRef<any>();

  const openCreateModal = async () => {
    await fetchCaptcha();
    setCreateVisible(true);
  };

  const queryPage = async (params: any): Promise<any> => {
    console.log("2222", params);

    const body = {
      page: {
        size: params.pageSize,
        page: params.current,
      },
    };
    const res = await postV1SystemUserCoreIndex(apiParams(), body);

    if (res instanceof Response) {
      return {
        data: [],
        total: 0,
      };
    }

    return {
      data: res.data.list,
      total: res.data.total,
    };
  };

  const isPass = () => {
    if (selectedRowKeys.length === 0) {
      message.info("请选择一条数据");
      return false;
    }
    return true;
  };
  const openEditModal = () => {
    if (!isPass()) {
      return;
    }
    editFormRef?.current?.setFieldsValue(selectedRows[0]);
    setEditVisible(true);
  };

  const showDeleteConfirm = () => {
    if (!isPass()) {
      return;
    }
    confirm({
      title: "你确定要删除该用户信息吗？",
      icon: <ExclamationCircleOutlined />,
      content: `所选用户名: ${selectedRows[0].userName},删除后无法恢复`,
      onOk() {
        const params = apiParamsGUID();
        const body = {
          uid: selectedRowKeys[0],
        };
        postV1SystemUserInfo__openAPI__delete(params, body).then((res) => {
          if (res.code === 200) {
            message.success("删除成功");
            actionRef.current?.reload();
          }
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const fetchCaptcha = async () => {
    const prams = apiParamsGUID();
    const body = {
      type: "image",
      use: "login",
    };
    postV1SystemUserCaptcha(prams, body).then((res) => {
      setCodeID(res?.data?.codeID ?? "");
      setCaptchaURL(res?.data?.url ?? "");
    });
  };

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      setSelectedRowKeys(selectedRowKeys);
      setSelectedRows(selectedRows);
    },
    getCheckboxProps: (record: any) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <Card>
      <Row>
        <Col span={24}>
          <div className={styles.global_fontTitle}>
            <span>用户管理</span>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div className={styles.btnWrap}>
            <Button
              className={styles.btn}
              type="primary"
              onClick={openCreateModal}
            >
              新增
            </Button>
            <ModalForm<{
              userName: string;
              nickName: string;
              sex: number;
              token: string;
              uid: string;
            }>
              formRef={editFormRef}
              title="编辑用户信息"
              trigger={
                <Button
                  type="primary"
                  onClick={openEditModal}
                  className={styles.btn}
                >
                  编辑
                </Button>
              }
              visible={editVisible}
              autoFocusFirstInput
              modalProps={{
                onCancel: () => setEditVisible(false),
              }}
              submitTimeout={2000}
              onFinish={async (values) => {
                // 请求编辑用户基本信息的接口
                const params = apiParams();
                const body = values;
                body.token = firstStepFormData.accessToken;
                body.uid = selectedRowKeys[0];
                return postV1SystemUserInfoUpdate(params, body)
                  .then((res) => {
                    console.log("res", res);
                    setCreateVisible(false);
                    if (res.code === 200) {
                      message.success("提交成功");
                    }
                    return true;
                  })
                  .catch((error) => {
                    console.log(error, "error");
                  });
              }}
            >
              <ProFormText
                name="userName"
                width="md"
                label="用户名"
                placeholder="请输入用户名"
                rules={[
                  {
                    required: true,
                    message: "用户名是必填项！",
                  },
                ]}
              />
              <ProFormText
                name="nickName"
                width="md"
                label="昵称"
                placeholder="请输入昵称"
              />
              <ProFormSelect
                width="md"
                name="sex"
                label="性别"
                request={async () => [
                  { label: "男性", value: 1 },
                  { label: "女性", value: 2 },
                ]}
              />
            </ModalForm>
            <Button className={styles.btn} danger onClick={showDeleteConfirm}>
              删除
            </Button>
          </div>
        </Col>
      </Row>
      <ProTable<any>
        rowKey="uid"
        actionRef={actionRef}
        request={queryPage}
        rowSelection={{
          type: "radio",
          ...rowSelection,
        }}
        search={false}
        tableAlertRender={false}
        columns={columns}
        bordered
        size={"middle"}
      />

      <StepsForm
        onFinish={async (values) => {
          console.log(values);
          // 请求创建用户基本信息的接口
          const params = apiParams();
          const body = values as any;
          body.token = firstStepFormData.accessToken;
          body.uid = firstStepFormData.uid;
          return postV1SystemUserInfoCreate(params, body)
            .then((res) => {
              console.log("res", res);
              setCreateVisible(false);
              if (res.code === 200) {
                message.success("提交成功");
              }
              return true;
            })
            .catch((error) => {
              console.log(error, "error");
            });
        }}
        formProps={{
          validateMessages: {
            required: "此项为必填项",
          },
        }}
        stepsFormRender={(dom, submitter) => {
          return (
            <Modal
              title="创建用户"
              width={800}
              onCancel={() => setCreateVisible(false)}
              visible={createVisible}
              footer={submitter}
              destroyOnClose
            >
              {dom}
            </Modal>
          );
        }}
      >
        <StepsForm.StepForm
          name="base"
          title="创建用户核心信息"
          onFinish={async (values) => {
            console.log("base", values);
            // 调用创建用户核心数据的接口
            const params = apiParams();
            const body = values as any;
            body.reqType = "password";
            body.codeID = codeID;
            return postV1SystemUserCoreCreate(params, body)
              .then((res) => {
                console.log("res", res);
                setFirstStepFormData(res.data);
                return true;
              })
              .catch((error) => {
                console.log("error", error);
              });
          }}
        >
          <ProFormText
            name="identity"
            width="md"
            label="用户名"
            placeholder="请输入用户名"
            rules={[
              {
                required: true,
                message: "用户名是必填项！",
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            width="md"
            label="密码"
            placeholder="请输入密码"
            rules={[
              {
                required: true,
                message: "密码是必填项！",
              },
            ]}
          />
          <ProFormSelect
            width="md"
            name="role"
            label="用户角色"
            rules={[
              {
                required: true,
                message: "用户角色是必填项！",
              },
            ]}
            request={async () => [
              { label: "admin", value: 1 },
              { label: "供应商", value: 2 },
              { label: "user", value: 3 },
            ]}
          />
          <ProFormCaptcha
            countDown={1}
            label="验证码"
            rules={[
              {
                required: true,
                message: "验证码是必填项！",
              },
            ]}
            fieldProps={{
              size: "large",
              prefix: <FontColorsOutlined className={"prefixIcon"} />,
            }}
            captchaProps={{
              size: "large",
            }}
            placeholder={"请输入验证码"}
            captchaTextRender={() => {
              return (
                <img
                  style={{ width: 130, height: 30 }}
                  src={captchaURL}
                  alt=""
                />
              );
            }}
            name="code"
            onGetCaptcha={async () => {
              await fetchCaptcha();
              message.success("刷新验证码成功！");
            }}
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="checkbox" title="创建用户基本信息">
          <ProFormText
            name="userName"
            width="md"
            label="用户名"
            placeholder="请输入用户名"
            rules={[
              {
                required: true,
                message: "用户名是必填项！",
              },
            ]}
          />
          <ProFormText
            name="nickName"
            width="md"
            label="昵称"
            placeholder="请输入昵称"
          />
          <ProFormSelect
            width="md"
            name="sex"
            label="性别"
            request={async () => [
              { label: "男性", value: 1 },
              { label: "女性", value: 2 },
            ]}
          />
        </StepsForm.StepForm>
      </StepsForm>
    </Card>
  );
};

export default IndexPage;
