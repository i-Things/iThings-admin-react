import React, { useEffect, useRef, useState } from "react";
import styles from "./style.less";
import "./style.css";
import { ICursorChartsProps, ICursorShowData, ICursorShowText } from "./data";

const CursorCharts: React.FC<ICursorChartsProps> = ({
  list,
  data,
  hitText,
  hit,
}) => {
  const [isInit, setIsInit] = useState(false);
  let sumValue = 0;
  list.forEach((e) => {
    sumValue += Math.abs(e.value);
  });
  const containerRef = useRef(styles.cursorContain);
  const [width, setwidth] = useState<number>(0);
  const [height, setheight] = useState<number>(0);
  useEffect(() => {
    setwidth(containerRef.current.clientWidth);
    setheight(containerRef.current.clientHeight);
    setIsInit(true);
  }, []);
  const simpleValue = (width * 0.8) / sumValue;

  let dataLeft = 0;
  let color = list[0].corlor;
  const showList: ICursorShowData[] = [];
  const lineList: { left: number; top: string }[] = [];

  let floatLeft = width * 0.12;
  let tempSum = 0;
  list.forEach((e, idx) => {
    const temp: ICursorShowData = {
      left: floatLeft,
      width: simpleValue * Math.abs(e.value),
      top: height * 0.5,
      height: height * 0.1,
      corlor: e.corlor,
      text: e.text,
    };

    tempSum += e.value;

    showList.push(temp);

    floatLeft += simpleValue * Math.abs(e.value);
  });

  floatLeft = width * 0.12;
  let tempData = data;
  console.log(list);

  if (tempSum >= data) {
    for (let idx = 0; idx < list.length; idx++) {
      const e = list[idx];
      if (tempData > e.value && tempData < e.value + list[idx].value) {
        console.log("1", tempData, e.value);
        floatLeft = floatLeft + simpleValue * e.value;
        tempData -= e.value;
      } else if (tempData > e.value) {
        console.log("2", tempData, e.value);
        floatLeft += simpleValue * Math.abs(e.value);
        tempData -= e.value;
        color = e.corlor;
        dataLeft = floatLeft - simpleValue * tempData;
      } else {
        dataLeft = floatLeft + simpleValue * tempData;
        console.log("liet =>", e, idx, tempData, simpleValue, sumValue);
        color = e.corlor;
        break;
      }
    }
  } else if (data > tempSum) {
    dataLeft = width * 0.12 + data * simpleValue;
    color = list[0].corlor;
  }
  console.log(dataLeft, "data => ", data);
  console.log(color);

  const showText: Array<ICursorShowText[]> = [];
  const showTextWidth = (width * 0.8) / (hit[0].content.length - 1);
  let textTop = height * 0.6 + height * 0.05;
  if (hit != null) {
    let floatLeft = width * 0.12;
    hit.forEach((e, idx) => {
      // line
      if (idx == 0) {
        const lt = {
          left: floatLeft,
          top: height * 0.6,
        };
        lineList.push(lt);
      }

      const t: ICursorShowText[] = [];
      if (e.title) {
        const temp: ICursorShowText = {
          text: e.title,
          left: width * 0.02,
          top: textTop + idx * height * 0.05,
        };
        t.push(temp);
      }
      e.content.forEach((ce, idx2) => {
        // line
        if (idx == 0 && idx2 != 0) {
          const rt = {
            left: floatLeft + showTextWidth * idx2 - 1,
            top: height * 0.6,
          };
          lineList.push(rt);
        }

        const temp: ICursorShowText = {
          text: ce,
          left: String(floatLeft + showTextWidth * idx2 - 5) + "px",
          top: textTop + idx * height * 0.05,
        };
        t.push(temp);
      });
      textTop += height * 0.01;
      showText.push(t);
    });
  }
  if (dataLeft - width * 0.1 > width * 0.8) {
    dataLeft =
      showList[showList.length - 1].left + showList[showList.length - 1].width;
    color = list[list.length - 1].corlor;
  }
  if (dataLeft < width * 0.1) {
    dataLeft = width * 0.12;
    color = list[0].corlor;
  }

  console.log(list, data, dataLeft, showList);

  return (
    <>
      <div className={styles.cursorContain} ref={containerRef}>
        {isInit && (
          <div>
            <div
              style={{
                position: "absolute",
                top: height * 0.35,
                left: dataLeft - hitText.length * 6,
                width: "10",
                height: "10",
              }}
            >
              <span>{hitText}</span>
            </div>
            <div
              style={{
                position: "absolute",
                top: height * 0.42,
                left: dataLeft - (height * 0.07) / 2,
                width: height * 0.07,
                height: height * 0.07,
              }}
            >
              <span
                className="icon-icon"
                style={{ fontSize: height * 0.07, color: color }}
              ></span>
            </div>
            <div style={{ position: "relative" }}>
              {showList.map((e) => {
                // 油表范围块儿
                return (
                  <span
                    key={"block" + String(e.left)}
                    style={{
                      position: "absolute",
                      display: "block",
                      left: e.left,
                      top: e.top,
                      backgroundColor: e.corlor,
                      width: e.width,
                      height: e.height,
                      lineHeight: e.height + "px",
                      textAlign: "center",
                    }}
                  >
                    {e.text}
                  </span>
                );
              })}
            </div>
            {lineList.map((e, idx) => {
              return (
                <div
                  key={"line" + String(idx)}
                  style={{
                    position: "absolute",
                    width: "1px",
                    height: "5px",
                    top: e.top,
                    left: e.left,
                    background: "gray",
                  }}
                ></div>
              );
            })}
            {showText.map((e, idx) => {
              return (
                <div key={"hit" + String(idx)}>
                  {e.map((te, idx2) => {
                    return (
                      <div
                        key={"hit" + String(idx) + "/" + String(idx2)}
                        style={{
                          position: "absolute",
                          top: te.top,
                          left: te.left,
                        }}
                      >
                        {te.text}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default React.memo(CursorCharts);
