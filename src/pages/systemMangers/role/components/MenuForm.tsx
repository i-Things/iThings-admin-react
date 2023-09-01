import { postApiV1SystemMenuIndex } from '@/services/iThingsapi/caidanguanli';
import { recursionTree, spanTree } from '@/utils/utils';
import { useRequest } from 'ahooks';
import { Button, Form, Input, message, Spin, Tree } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';

import { postApiV1SystemRoleRoleMenuUpdate } from '@/services/iThingsapi/jiaoseguanli';
import type { DataNode, TreeProps } from 'antd/lib/tree';
import type { RoleListItem } from '../types';

const FormItem = Form.Item;

const MenuForm: React.FC<{
  drawerVisible: boolean;
  currentData: Partial<RoleListItem>;
  onSubmit: <T extends Function, K>(api: T, body: K) => void;
}> = ({ drawerVisible, currentData, onSubmit }) => {
  const [form] = Form.useForm();

  const [treeData, setTreeData] = useState<DataNode[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [halfCheckedKeys, setHalfCheckedKeys] = useState<React.Key[]>([]);

  type UpdateProp = typeof postApiV1SystemRoleRoleMenuUpdate;

  useRequest(postApiV1SystemMenuIndex, {
    defaultParams: [{}],
    refreshDeps: [drawerVisible],
    onSuccess: (res) => {
      const flatTree = res.data.list;
      let map: number[] = [];
      const arr: number[] = [];
      if (currentData?.roleMenuID) {
        map = currentData?.roleMenuID;
        setExpandedKeys(map.map((r) => r.toString()));
      }
      const menus = flatTree.filter((t) => map.includes(t.id as number));
      menus.forEach((item) => {
        // 防止直接选中父级造成全选
        if (!menus.some((same) => same.parentID === item.id)) {
          arr.push(item.id as number);
        }
      });

      const tree = spanTree(recursionTree(flatTree as any), 1, 'parentID');
      setTreeData(tree);
      setCheckedKeys(arr.map((r) => r.toString()));
    },
    onError: (error) => {
      message.error('获取角色信息错误:' + error.message);
    },
  });

  const handleExpand: TreeProps['onExpand'] = useCallback((expandedKey) => {
    setExpandedKeys(expandedKey);
  }, []);

  const onCheck: TreeProps['onCheck'] = useCallback((checked, info) => {
    const { halfCheckedKeys: half } = info;
    if (Array.isArray(checked) && 'halfCheckedKeys' in info) {
      setCheckedKeys(checked.concat());
      setHalfCheckedKeys(half as React.Key[]);
    }
  }, []);

  const handleSubmit = () => {
    form.validateFields().then(() => {
      const body = {
        id: Number(currentData.id) || 0,
        menuID: checkedKeys.concat(halfCheckedKeys).map((i) => Number(i)),
      };
      onSubmit<UpdateProp, { id: number; menuID: number[] }>(
        postApiV1SystemRoleRoleMenuUpdate,
        body,
      );
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
      <Spin spinning={!treeData?.length}>
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

export default React.memo(MenuForm);
