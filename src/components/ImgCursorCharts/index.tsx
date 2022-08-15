import React, { useEffect, useRef, useState } from "react";
import bg1 from "./assets/bg_ruler_01.png";
import bg2 from "./assets/bg_ruler_02.png";
import styles from "./style.less";
import "./style.css";

const ImageCursorCharts: React.FC<IImgCursorChartsProps> = ({
  type,
  value,
  marginHeight,
  marginWidth,
}) => {
  const [isInit, setIsInit] = useState(false);
  const containerRef = useRef(styles.imgCursorContain);
  const [width, setwidth] = useState<number>(0);
  const [height, setheight] = useState<number>(0);

  let color = "";

  // console.log("type => ", type, "value => ", value);

  useEffect(() => {
    setwidth(containerRef.current.clientWidth);
    setheight(containerRef.current.clientHeight);

    setIsInit(true);
  }, []);

  let leftStart = 0;
  let realPx = 0;

  useEffect(() => {
    switch (type) {
      case "bg1":
        if (value >= 5.0) {
          color = "#419efe";
        } else if (value >= 4.15) {
          color = "#4cc281";
        } else if (value >= 3.5) {
          color = "#ffaa00";
        } else {
          color = "#dd1b5a";
        }
        realPx = (width - 2 * marginWidth) / 732;
        leftStart = 80 * realPx + marginWidth;
        if (value >= 7.5) {
          leftStart = leftStart;
        } else if (value <= 2.6) {
          leftStart = marginWidth + realPx * 720;
        } else if (value > 7.0) {
          const add = (7.5 - value) / (7.5 - 7.0);
          leftStart = 80 * realPx + marginWidth + add * 71 * realPx;
        } else if (value > 5.9) {
          const add = (7.0 - value) / (7.0 - 5.9);
          leftStart =
            80 * realPx + marginWidth + 71 * realPx + add * 71 * realPx;
        } else if (value > 5.0) {
          const add = (5.9 - value) / (5.9 - 5.0);
          leftStart =
            80 * realPx + marginWidth + 71 * realPx * 2 + add * 71 * realPx;
        } else if (value > 4.4) {
          const add = (5.0 - value) / (5.0 - 4.4);
          leftStart =
            80 * realPx + marginWidth + 71 * realPx * 3 + add * 71 * realPx;
        } else if (value > 3.9) {
          const add = (4.4 - value) / (4.4 - 3.9);
          leftStart =
            80 * realPx + marginWidth + 71 * realPx * 4 + add * 71 * realPx;
        } else if (value > 3.5) {
          const add = (3.9 - value) / (3.9 - 3.5);
          leftStart =
            80 * realPx + marginWidth + 71 * realPx * 5 + add * 71 * realPx;
        } else if (value > 3.2) {
          const add = (3.5 - value) / (3.5 - 3.2);
          leftStart =
            80 * realPx + marginWidth + 71 * realPx * 6 + add * 71 * realPx;
        } else if (value > 2.9) {
          const add = (3.2 - value) / (3.2 - 2.9);
          leftStart =
            80 * realPx + marginWidth + 71 * realPx * 7 + add * 71 * realPx;
        } else if (value > 2.6) {
          const add = (2.9 - value) / (2.9 - 2.6);
          leftStart =
            80 * realPx + marginWidth + 71 * realPx * 8 + add * 71 * realPx;
        }
        // console.log("type => ", type, "left => ", leftStart);

        break;
      case "bg2":
        if (value < -10 || value > 10) {
          color = "#e0316a";
        } else if (value < -5 || value > 5) {
          color = "#ffb729";
        } else {
          color = "#379aff";
        }
        realPx = (width - 2 * marginWidth) / 670;
        leftStart = 9 * realPx + marginWidth;
        if (value <= -15) {
          leftStart = leftStart;
        } else if (value <= -10) {
          const add = Math.abs(-15 - value) / 5;
          leftStart = 9 * realPx + marginWidth + add * 106 * realPx;
        } else if (value <= -5) {
          const add = Math.abs(-10 - value) / 5;
          leftStart =
            9 * realPx + 106 * realPx * 1 + marginWidth + add * 106 * realPx;
        } else if (value <= 0) {
          const add = Math.abs(-5 - value) / 5;
          leftStart =
            9 * realPx + 106 * realPx * 2 + marginWidth + add * 106 * realPx;
        } else if (value <= 5) {
          const add = Math.abs(value) / 5;
          leftStart =
            9 * realPx + 106 * realPx * 3 + marginWidth + add * 106 * realPx;
        } else if (value <= 10) {
          const add = Math.abs(value - 5) / 5;
          leftStart =
            9 * realPx + 106 * realPx * 4 + marginWidth + add * 106 * realPx;
        } else if (value <= 15) {
          const add = Math.abs(value - 10) / 5;
          leftStart =
            9 * realPx + 106 * realPx * 5 + marginWidth + add * 106 * realPx;
        } else {
          leftStart = 9 * realPx + 106 * realPx * 6 + marginWidth;
        }
        // console.log("type => ", type, "left => ", leftStart);

        break;

      default:
        break;
    }
  }, [value]);

  switch (type) {
    case "bg1":
      if (value >= 5.0) {
        color = "#419efe";
      } else if (value >= 4.15) {
        color = "#4cc281";
      } else if (value >= 3.5) {
        color = "#ffaa00";
      } else {
        color = "#dd1b5a";
      }
      realPx = (width - 2 * marginWidth) / 732;
      leftStart = 80 * realPx + marginWidth;
      if (value >= 7.5) {
        leftStart = leftStart;
      } else if (value <= 2.6) {
        leftStart = marginWidth + realPx * 720;
      } else if (value > 7.0) {
        const add = (7.5 - value) / (7.5 - 7.0);
        leftStart = 80 * realPx + marginWidth + add * 71 * realPx;
      } else if (value > 5.9) {
        const add = (7.0 - value) / (7.0 - 5.9);
        leftStart = 80 * realPx + marginWidth + 71 * realPx + add * 71 * realPx;
      } else if (value > 5.0) {
        const add = (5.9 - value) / (5.9 - 5.0);
        leftStart =
          80 * realPx + marginWidth + 71 * realPx * 2 + add * 71 * realPx;
      } else if (value > 4.4) {
        const add = (5.0 - value) / (5.0 - 4.4);
        leftStart =
          80 * realPx + marginWidth + 71 * realPx * 3 + add * 71 * realPx;
      } else if (value > 3.9) {
        const add = (4.4 - value) / (4.4 - 3.9);
        leftStart =
          80 * realPx + marginWidth + 71 * realPx * 4 + add * 71 * realPx;
      } else if (value > 3.5) {
        const add = (3.9 - value) / (3.9 - 3.5);
        leftStart =
          80 * realPx + marginWidth + 71 * realPx * 5 + add * 71 * realPx;
      } else if (value > 3.2) {
        const add = (3.5 - value) / (3.5 - 3.2);
        leftStart =
          80 * realPx + marginWidth + 71 * realPx * 6 + add * 71 * realPx;
      } else if (value > 2.9) {
        const add = (3.2 - value) / (3.2 - 2.9);
        leftStart =
          80 * realPx + marginWidth + 71 * realPx * 7 + add * 71 * realPx;
      } else if (value > 2.6) {
        const add = (2.9 - value) / (2.9 - 2.6);
        leftStart =
          80 * realPx + marginWidth + 71 * realPx * 8 + add * 71 * realPx;
      }
      // console.log("type => ", type, "left => ", leftStart);

      break;
    case "bg2":
      if (value < -10 || value > 10) {
        color = "#e0316a";
      } else if (value < -5 || value > 5) {
        color = "#ffb729";
      } else {
        color = "#379aff";
      }
      realPx = (width - 2 * marginWidth) / 670;
      leftStart = 9 * realPx + marginWidth;
      if (value <= -15) {
        leftStart = leftStart;
      } else if (value <= -10) {
        const add = Math.abs(-15 - value) / 5;
        leftStart = 9 * realPx + marginWidth + add * 106 * realPx;
      } else if (value <= -5) {
        const add = Math.abs(-10 - value) / 5;
        leftStart =
          9 * realPx + 106 * realPx * 1 + marginWidth + add * 106 * realPx;
      } else if (value <= 0) {
        const add = Math.abs(-5 - value) / 5;
        leftStart =
          9 * realPx + 106 * realPx * 2 + marginWidth + add * 106 * realPx;
      } else if (value <= 5) {
        const add = Math.abs(value) / 5;
        leftStart =
          9 * realPx + 106 * realPx * 3 + marginWidth + add * 106 * realPx;
      } else if (value <= 10) {
        const add = Math.abs(value - 5) / 5;
        leftStart =
          9 * realPx + 106 * realPx * 4 + marginWidth + add * 106 * realPx;
      } else if (value <= 15) {
        const add = Math.abs(value - 10) / 5;
        leftStart =
          9 * realPx + 106 * realPx * 5 + marginWidth + add * 106 * realPx;
      } else {
        leftStart = 9 * realPx + 106 * realPx * 6 + marginWidth;
      }
      // console.log("type => ", type, "left => ", leftStart);

      break;

    default:
      break;
  }
  // console.log("left =>", leftStart, "type => ", type);
  return (
    <>
      <div className={styles.imgCursorContain} ref={containerRef}>
        {isInit && (
          <div className={styles.imgContain}>
            {type == "bg1" && (
              <div>
                <div
                  style={{
                    position: "absolute",
                    left: leftStart - (height * 0.07) / 2 + "px",
                    top: height * 0.2,
                  }}
                >
                  <span
                    className="icon-icon"
                    style={{ fontSize: height * 0.07, color: color }}
                  ></span>
                </div>

                <img src={bg1} width={width - marginWidth * 2 + "px"}></img>
              </div>
            )}
            {type == "bg2" && (
              <div>
                <div
                  style={{
                    position: "absolute",
                    left: leftStart - (height * 0.07) / 2,
                    top: height * 0.2,
                  }}
                >
                  <span
                    className="icon-icon"
                    style={{ fontSize: height * 0.07, color: color }}
                  ></span>
                </div>

                <img src={bg2} width={width - marginWidth * 2 + "px"}></img>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default React.memo(ImageCursorCharts);
