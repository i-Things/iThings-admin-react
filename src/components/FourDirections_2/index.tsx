import { Col, Row } from "antd";
import React from "react";
import styles from "./style.less";
import cost_01 from "./assets/icon_cost_01.png";
import cost_02 from "./assets/icon_cost_02.png";
import cost_03 from "./assets/icon_cost_03.png";
import cost_04 from "./assets/icon_cost_04.png";

export interface showMessage {
  value: string;
  hit: string;
}

interface IFourDirections_2 {
  data: showMessage[];
}

const FourDirections_2: React.FC<IFourDirections_2> = ({ data }) => {
  return (
    <div className={styles.baseCard}>
      <Row gutter={[16, 32]}>
        <Col span={12}>
          <div className={`${styles.card1} ${styles.card}`}>
            <img src={cost_01} width={40} height={40}></img>
            <span className={styles.valueSpan}>{data[0].value}</span>
            <span className={styles.hitSpan}>{data[0].hit}</span>
          </div>
        </Col>
        <Col span={12}>
          <div className={`${styles.card2} ${styles.card}`}>
            <img src={cost_02} width={40} height={40}></img>
            <span className={styles.valueSpan}>{data[1].value}</span>
            <span className={styles.hitSpan}>{data[1].hit}</span>
          </div>
        </Col>
      </Row>
      <Row gutter={[16, 32]}>
        <Col span={12}>
          <div className={`${styles.card3} ${styles.card}`}>
            <img src={cost_03} width={40} height={40}></img>
            <span className={styles.valueSpan}>{data[2].value}</span>
            <span className={styles.hitSpan}>{data[2].hit}</span>
          </div>
        </Col>
        <Col span={12}>
          <div className={`${styles.card4} ${styles.card}`}>
            <img src={cost_04} width={40} height={40}></img>
            <span className={styles.valueSpan}>{data[3].value}</span>
            <span className={styles.hitSpan}>{data[3].hit}</span>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default React.memo(FourDirections_2);
