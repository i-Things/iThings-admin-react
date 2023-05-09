import { useRequest } from 'ahooks';
import { Button, Form, Input, message, Spin, Tree } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';

import { postApiV1SystemApiIndex } from '@/services/iThingsapi/jiekouguanli';
import {
  postApiV1SystemAuthApiIndex,
  postApiV1SystemAuthApiMultiUpdate,
} from '@/services/iThingsapi/quanxianguanli';
import { METHOD_VALUE } from '@/utils/const';

import type { DataNode, TreeProps } from 'antd/lib/tree';
import type { ApiListType } from '../../api';

const FormItem = Form.Item;

export type UpdateListType = {
  list: { route: string; method: number; onlyId?: string }[];
};

const ApiForm: React.FC<{
  drawerVisible: boolean;
  roleID: string;
  onSubmit: <T extends Function, K>(api: T, body: K) => void;
}> = ({ drawerVisible, roleID, onSubmit }) => {
  const [form] = Form.useForm();

  const [treeData, setTreeData] = useState<DataNode[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [checkedNodes, setCheckedNodes] = useState<ApiListType[]>();

  type UpdateProp = typeof postApiV1SystemAuthApiMultiUpdate;

  // 创建api树方法
  const buildApiTree = (apis: ApiListType[]) => {
    const apiObj = {};
    if (apis) {
      apis.forEach((item) => {
        item.onlyId =
          'p:' +
          item.route +
          'm:' +
          (!METHOD_VALUE[item.method]?.text ? 'POST' : METHOD_VALUE[item.method]?.text);
        item.key = item.onlyId;
        if (Object.prototype.hasOwnProperty.call(apiObj, item.group)) {
          apiObj[item.group].push(item);
        } else {
          Object.assign(apiObj, { [item.group]: [item] });
        }
      });
    }
    const apiTree = [];
    const expend = [];
    for (const key in apiObj) {
      expend.push(key);
      const treeNode = {
        key,
        title: key + '组',
        children: apiObj[key],
      };
      apiTree.push(treeNode);
    }
    setExpandedKeys(expend);
    return apiTree;
  };

  useRequest(postApiV1SystemAuthApiIndex, {
    defaultParams: [{ roleID: Number(roleID) }],
    refreshDeps: [drawerVisible],
    onSuccess: (res) => {
      const keyList = res?.data?.list;
      const checked: React.Key[] = [];
      if (keyList?.length) {
        keyList.forEach((item) => {
          checked.push(
            'p:' + item.route + 'm:' + METHOD_VALUE[item?.method as number]?.text || 'POST',
          );
        });
        setCheckedKeys(checked);
      }
    },
    onError: (error) => {
      message.error('获取角色权限信息错误:' + error.message);
    },
  });

  useRequest(postApiV1SystemApiIndex, {
    defaultParams: [{}],
    refreshDeps: [drawerVisible],
    onSuccess: (res) => {
      const flatTree = buildApiTree(
        (res?.data?.list as ApiListType[])?.map((list) => ({
          ...list,
          key: list?.id,
          title: list?.name,
        })),
      );
      setTreeData(flatTree);
    },
    onError: (error) => {
      message.error('获取角色信息错误:' + error.message);
    },
  });

  const handleExpand: TreeProps['onExpand'] = useCallback((expandedKey) => {
    setExpandedKeys(expandedKey);
  }, []);

  const onCheck: TreeProps['onCheck'] = useCallback((checked, info) => {
    const { checkedNodes: nodes } = info;
    setCheckedKeys(checked);
    setCheckedNodes(nodes.filter((node: ApiListType) => node.route));
  }, []);

  const handleSubmit = () => {
    form.validateFields().then(() => {
      const casbinInfos: UpdateListType['list'] = [];
      if (checkedNodes?.length) {
        checkedNodes.forEach((item) => {
          const casbinInfo = {
            route: item?.path || item?.route,
            method: item?.method,
          };
          casbinInfos.push(casbinInfo);
        });
      }
      const body = { list: casbinInfos };
      onSubmit<UpdateProp, UpdateListType>(postApiV1SystemAuthApiMultiUpdate, body);
    });
  };

  useEffect(() => {
    if (drawerVisible) {
      setCheckedKeys([]);
    }
  }, [drawerVisible]);

  const renderContent = () => {
    return (
      <>
        <FormItem name="id" label="主键" hidden>
          <Input id="update-id" placeholder="请输入主键" />
        </FormItem>
        <Tree
          checkable
          expandedKeys={expandedKeys}
          onCheck={onCheck}
          checkedKeys={checkedKeys}
          onExpand={handleExpand}
          treeData={treeData}
        />
      </>
    );
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Spin spinning={!checkedKeys.length}>
        <Form.Item wrapperCol={{ offset: 20, span: 10 }}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
        {renderContent()}
      </Spin>
    </Form>
  );
};

export default React.memo(ApiForm);
