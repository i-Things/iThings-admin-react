import ProForm from "@ant-design/pro-form";
import React from "react";
import styles from "./style.less";

const IndexPage: React.FC = () => {
  return (
    <div className={styles.mainContain}>
      <div className={styles.global_fontTitle}>
        <span>新增设备</span>
      </div>
      <div>
        <ProForm />
      </div>
    </div>
  );
};

export default IndexPage;
