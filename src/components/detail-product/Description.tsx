import React from "react";
import styles from "./description.module.css";
const Description: React.FC<{ content: string }> = ({ content }) => {
    return (
        <div className={styles["description"]}>
            <p>{content}</p>
        </div>
    );
};

export default Description;
