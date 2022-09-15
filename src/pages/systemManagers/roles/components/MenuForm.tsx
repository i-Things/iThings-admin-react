import useGetTableList from '@/hooks/useGetTableList';
import { postSystemMenuIndex } from '@/services/iThingsapi/caidanguanli';
import { Button, Form, Input, Tree } from 'antd';
import type { DataNode } from 'antd/lib/tree';
import React, { useEffect, useState } from 'react';
import type { MenuOption } from '../../menus/types';
import type { RoleListItem, TreeListItem } from '../types.d';

const FormItem = Form.Item;

const MenuForm: React.FC<{
  drawerVisible: boolean;
  currentData: Partial<RoleListItem>;
  onSubmit: (values: { id: number; menuID: number[] }) => void;
}> = (props) => {
  const { queryPage } = useGetTableList();
  const [form] = Form.useForm();
  const [treeData, setTreeData] = useState<DataNode[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedKey, setSelectedKey] = useState<string[] | number[]>([]);
  const { drawerVisible, currentData, onSubmit } = props;
  type QueryProp = typeof postSystemMenuIndex;

  const handleFinish = () => {
    console.log(selectedKey);

    const body = {
      id: Number(currentData.id) || 0,
      menuID: selectedKey as number[],
    };
    onSubmit(body);
  };
  const recursion = (pre: MenuOption[]) => {
    pre.map((item) => {
      if (item.children) recursion(item?.children);
      else {
        item.key = item?.id + '';
        item.label = item?.name + '';
        item.title = item?.name + '';
      }
    });
    return pre;
  };
  useEffect(() => {
    if (drawerVisible) {
      setSelectedKey([]);
      setCheckedKeys([]);
      queryPage<QueryProp, TreeListItem>(postSystemMenuIndex, {}).then((res) => {
        if (res.data.length === 0) return;
        const treeList = res.data.map((item: TreeListItem) => {
          return {
            ...item,
            key: item?.id + '',
            label: item?.name,
            title: item?.name,
          };
        });
        const tr: DataNode[] = recursion(treeList);
        setTreeData(tr);
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
