import { Col, Row } from "antd";
import React, { useEffect, useRef, useState } from "react";
import png1 from "../../assets/icons/icon_data_01.png";
import png2 from "../../assets/icons/icon_data_02.png";
import png3 from "../../assets/icons/icon_data_03.png";
import png4 from "../../assets/icons/icon_data_04.png";
import { IMessageBox } from "./data";
import styles from "./style.less";

const FourDirections: React.FC<IMessageBox> = ({ data }) => {
  const containerRef = useRef(styles.baseBox);
  const [width, setwidth] = useState<number>(0);
  const [height, setheight] = useState<number>(0);
  useEffect(() => {
    setwidth(containerRef.current.clientWidth);
    setheight(containerRef.current.clientHeight);
  }, []);
  return (
    <>
      <div
        className={styles.baseBox}
        ref={containerRef}
        style={{ height: "100%", width: "100%" }}
      >
        <Row>
          <Col span={12}>
            <div
              style={{
                padding: "10px",
                margin: "10px",
                width: width / 2 - width / 10,
                height: height / 2 - height / 10,
                backgroundColor: "rgb(228,247,254)",
                position: "relative",
                borderRadius: "10px",
              }}
            >
              <div className={styles.message}>
                <div className={styles.image}>
                  <img src={png1} />
                </div>
                <div className={styles.fontMsg}>
                  <span className={styles.title}>{data[0].title}</span>
                  <span className={styles.content}>{data[0].message}</span>
                </div>
              </div>
            </div>
          </Col>
          <Col span={12}>
            <div
              style={{
                padding: "10px",
                margin: "10px",
                width: width / 2 - width / 10,
                height: height / 2 - height / 10,
                backgroundColor: "rgb(236,240,252)",
                position: "relative",
                borderRadius: "10px",
              }}
            >
              <div className={styles.message}>
                <div className={styles.image}>
                  <img src={png2} />
                </div>
                <div className={styles.fontMsg}>
                  <span className={styles.title}>{data[1].title}</span>
                  <span className={styles.content}>{data[1].message}</span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <div
              style={{
                padding: "10px",
                margin: "10px",
                width: width / 2 - width / 10,
                height: height / 2 - height / 10,
                backgroundColor: "rgb(254,242,230)",
                position: "relative",
                borderRadius: "10px",
              }}
            >
              <div className={styles.message}>
                <div className={styles.image}>
                  <img src={png3} />
                </div>
                <div className={styles.fontMsg}>
                  <span className={styles.title}>{data[2].title}</span>
                  <span className={styles.content}>{data[2].message}</span>
                </div>
              </div>
            </div>
          </Col>
          <Col span={12}>
            <div
              style={{
                padding: "10px",
                margin: "10px",
                width: width / 2 - width / 10,
                height: height / 2 - height / 10,
                backgroundColor: "rgb(254,233,232)",
                position: "relative",
                borderRadius: "10px",
              }}
            >
              <div className={styles.message}>
                <div className={styles.image}>
                  <img src={png4} />
                </div>
                <div className={styles.fontMsg}>
                  <span className={styles.title}>{data[3].title}</span>
                  <span className={styles.content}>{data[3].message}</span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default React.memo(FourDirections);
