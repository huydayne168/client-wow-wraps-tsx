import React from "react";
import styles from "./stat.module.css";
function Stat() {
    return (
        <div className={styles["stat"]}>
            <ul className={`content-container ${styles["stat-list"]}`}>
                <li className={styles["stat-item"]}>
                    <div className={styles["stat-number"]}>06</div>
                    <p className={styles["stat-text"]}>Number Restaurant</p>
                </li>
                <li className={styles["stat-item"]}>
                    <div className={styles["stat-number"]}>68</div>
                    <p className={styles["stat-text"]}>New Food Menu Dishes</p>
                </li>
                <li className={styles["stat-item"]}>
                    <div className={styles["stat-number"]}>36</div>
                    <p className={styles["stat-text"]}>Years of experience</p>
                </li>
            </ul>
        </div>
    );
}

export default Stat;
