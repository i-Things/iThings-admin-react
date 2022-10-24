import useGetTableList from '@/hooks/useGetTableList';
import { postSystemMenuIndex } from '@/services/iThingsapi/caidanguanli';
import { recursionTree, spanTree } from '@/utils/utils';
import { Button, Form, Input, Tree } from 'antd';
import type { DataNode } from 'antd/lib/tree';
import React, { useEffect, useState } from 'react';
import type { MenuListItem } from '../../menu/types';
import type { RoleListItem } from '../types';
const FormItem = Form.Item;

const MenuForm: React.FC<{
  drawerVisible: boolean;
  currentData: Partial<RoleListItem>;
  onSubmit: (values: { id: number; menuID: number[] }) => void;
}> = (props) => {
  const { drawerVisible, currentData, onSubmit } = props;
  const { queryPage } = useGetTableList();
  const [form] = Form.useForm();
  const [treeData, setTreeData] = useState<DataNode[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedKey, setSelectedKey] = useState<string[] | number[]>([]);
  type QueryProp = typeof postSystemMenuIndex;

  const handleFinish = () => {
    const body = {
      id: Number(currentData.id) || 0,
      menuID: selectedKey as number[],
    };
    onSubmit(body);
  };

  useEffect(() => {
    if (drawerVisible) {
      setSelectedKey([]);
      setCheckedKeys([]);
      queryPage<QueryProp, MenuListItem>(postSystemMenuIndex, {}).then((res) => {
        if (res.data.length === 0) return;
        const tree = spanTree(recursionTree(res.data), 1, 'parentID');
        setTreeData(tree);
        if (currentData?.roleMenuID) {
          const map = currentData?.roleMenuID.map((r) => r + '');
          setSelectedKey(map);
          setCheckedKeys(map);
        }
      });
    }
  }, [drawerVisible]);

  const onCheck = (checked: React.Key[]) => {
    setCheckedKeys(checked);
    setSelectedKey(checked.map((i) => Number(i)));
  };
  const renderContent = () => {
    return (
      <>
        <FormItem name="id" label="主键" hidden>
          <Input id="update-id" placeholder="请输入主键" />
        </FormItem>
        <Tree
          checkable
          autoExpandParent
          defaultExpandAll={true}
          onCheck={onCheck}
          checkedKeys={checkedKeys}
          treeData={treeData}
        />
      </>
    );
  };

  return (
    <Form form={form} onFinish={handleFinish}>
      <Form.Item wrapperCol={{ offset: 20, span: 10 }}>
        <Button type="primary" htmlType="submit">
          保存
        </Button>
      </Form.Item>
      {renderContent()}
    </Form>
  );
};

export default MenuForm;
