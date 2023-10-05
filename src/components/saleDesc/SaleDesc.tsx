import React from "react";
import styles from "./sale-desc.module.css";
const SaleDesc: React.FC<{ sale: number }> = ({ sale }) => {
    return <div className={styles["sale-desc"]}>-{sale}%</div>;
};

export default SaleDesc;
