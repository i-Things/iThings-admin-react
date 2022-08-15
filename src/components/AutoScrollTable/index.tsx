import { Table } from "antd";
import { useEffect, useRef } from "react";
import style from "./style.less";
type AutoScrollTableType = {
  tableConfig?: any;
  dataSource: any[];
  columns: any;
  rollTime?: number;
  rollNum?: number;
  rollTop?: number;
  isScroll?: boolean;
};
export default function AutoScrollTable(props: AutoScrollTableType) {
  const {
    tableConfig = {
      scroll: {
        y: 400,
        x: "100%",
        scrollToFirstRowOnChange: true,
      },
    },
    dataSource,
    rollTime = 100,
    rollNum = 10,
    rollTop = 1.5,
    isScroll = true,
  } = props;
  const timer1 = useRef<NodeJS.Timer | null>(null);
  const timer2 = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    if (dataSource) {
      InitialScroll(dataSource);
    }
    return () => {
      if (timer1.current) {
        clearInterval(timer1.current);
      }
      if (timer2.current) {
        clearInterval(timer2.current);
      }
    };
  }, [dataSource]); // 检测数组内变量 如果为空 则监控全局
  // 开启定时器
  const InitialScroll = (data: any[]) => {
    let v = document.getElementsByClassName("ant-table-body")[0];
    console.log("1222", v);

    if (data.length > Number(rollNum) && isScroll) {
      // 只有当大于10条数据的时候 才会看起滚动
      if (!timer1.current) {
        timer1.current = setInterval(() => {
          v.scrollTop += Number(rollTop);
          if (
            Math.ceil(v.scrollTop) >= Number(v.scrollHeight - v.clientHeight)
          ) {
            v.scrollTop = 0;
            // setTimeout(() => { v.scrollTop = 0 }, 1000)
          }
        }, Number(rollTime));
      }
    }
    if (document.getElementsByClassName("ant-table-body")[1]) {
      let v = document.getElementsByClassName("ant-table-body")[1];
      console.log("2", v);
      if (data.length > Number(rollNum) && isScroll) {
        // 只有当大于10条数据的时候 才会看起滚动
        if (!timer2.current) {
          timer2.current = setInterval(() => {
            v.scrollTop += Number(rollTop);
            if (
              Math.ceil(v.scrollTop) >= Number(v.scrollHeight - v.clientHeight)
            ) {
              v.scrollTop = 0;
              // setTimeout(() => { v.scrollTop = 0 }, 1000)
            }
          }, Number(rollTime));
        }
      }
    }
  };
  return (
    <div
      className={style.tableHead}
      onMouseOver={() => {
        if (timer1.current) {
          clearInterval(timer1.current);
        }
        timer1.current = null;

        if (timer2.current) {
          clearInterval(timer2.current);
        }
        timer2.current = null;
      }}
      onMouseOut={() => {
        InitialScroll(dataSource);
      }}
    >
      <Table
        pagination={false}
        {...tableConfig}
        {...props}
        rowClassName={(record, index) => {
          let className = "light-row";
          if (index % 2 === 1) className = "dark-row";
          return className;
        }}
      />
    </div>
  );
}
