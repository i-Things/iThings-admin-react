import { Button, Checkbox, DatePicker, DatePickerProps, Space } from "antd";
import Tree, { DataNode, TreeProps } from "antd/lib/tree";
import moment, { Moment } from "moment";
import React, { useEffect, useState } from "react";
import styles from "./style.less";

interface ITreeSelector {
  data: DataNode[]; // tree 数据
  selectCallBack: (params: ISelectChooseData[]) => void; // 选择数据callback

  timepick?: boolean; // 是否使用时间选择器
  timepickCallBack?: (params: Moment[]) => void; // 时间选定值

  treeHeight?: number | null; // 树状选择器高度

  buttonOnclick?: () => void;

  initCallBack: () => void;
}

const TreeSelector: React.FC<ITreeSelector> = ({
  data,
  selectCallBack,
  timepick = false,
  timepickCallBack,
  treeHeight = null,
  buttonOnclick,
  initCallBack,
}) => {
  const [allSelector, setallSelector] = useState(true);
  const changeAllSelector = () => {
    setallSelector(!allSelector);
  };

  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    doInit();
  }, [data]);

  const doInit = async () => {
    if (data) {
      setCheckedKeys(data.map((e) => String(e.title)));
      selectCallBack(getAllChildKey());
      await initCallBack();
    }
  };

  useEffect(() => {
    if (allSelector) {
      setCheckedKeys(data.map((e) => String(e.title)));
      selectCallBack(getAllChildKey());
    } else {
      setCheckedKeys([]);
      selectCallBack([]);
    }
  }, [allSelector]);

  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);

  const onCheck: TreeProps["onCheck"] = (checkedKeys, info) => {
    setCheckedKeys([...checkedKeys, ...checkedKeys]);
    selectCallBack(getpath(checkedKeys));
  };

  const onSelect = (selectedKeysValue: React.Key[], info: any) => {
    setSelectedKeys(selectedKeysValue);
  };

  const judge = (node: DataNode, key: string): string => {
    if (node.children == null) {
      if (node.key == key) {
        return String(node.title);
      }
      return "";
    }
    return topPoint(node.children, key);
  };

  const topPoint = (node: DataNode[], key: string): string => {
    for (let index = 0; index < node.length; index++) {
      const result = judge(node[index], key);
      if (result !== "") {
        return node[index].children == null
          ? result
          : node[index].title + "->" + result;
      }
    }
    return "";
  };

  const getpath = (checkedKeys: React.Key[]) => {
    console.log("get_path =>", checkedKeys);
    const result: ISelectChooseData[] = [];
    checkedKeys.forEach((e) => {
      const temp = topPoint(data, e);
      result.push({ key: String(e), show: temp });
    });
    console.log("result => ", result);
    return result;
  };

  const isEndPoit = (node: DataNode): React.Key[] => {
    if (node.children == null) {
      return [String(node.title)];
    }
    return endPoint(node.children);
  };

  const endPoint = (node: DataNode[]): React.Key[] => {
    let result: React.Key[] = [];
    for (let index = 0; index < node.length; index++) {
      const temp = isEndPoit(node[index]);
      result = result.concat(temp);
    }
    return result;
  };

  const getAllChildKey = (): ISelectChooseData[] => {
    const result = endPoint(data);
    const selectValues = getpath(result);
    return selectValues;
  };

  const onTimeChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date);
    if (date != null) {
      const retDate = date as unknown as Moment[];
      timepickCallBack(retDate);
    }
  };

  return (
    <div>
      <div className={styles.topContain}>
        <Space size="small">
          <div className={styles.checkBoxContain}>
            <Checkbox checked={allSelector} onChange={changeAllSelector}>
              全选
            </Checkbox>
          </div>
          {/* TODO react 版本问题， 需要升级版本解决报错 */}
          {timepick && (
            <DatePicker.RangePicker
              onChange={onTimeChange}
              style={{ width: "100%" }}
              defaultValue={[moment().subtract(1, "week"), moment()]}
            />
          )}
          <Button type="primary" onClick={buttonOnclick}>
            查询
          </Button>
        </Space>
      </div>
      <div className={styles.treeContain}>
        <Tree
          checkable
          defaultExpandAll={true}
          onCheck={onCheck}
          checkedKeys={checkedKeys}
          onSelect={onSelect}
          selectedKeys={selectedKeys}
          treeData={data}
          height={treeHeight}
        />
      </div>
    </div>
  );
};

export default TreeSelector;
