import React from "react";
import styles from "./open-time.module.css";
function OpenTime() {
    return (
        <div className={`${styles["open-time"]} content-container`}>
            <div className={styles["find-us"]}>
                <div className={styles["find-us__heading"]}>Find us here</div>
                <ul className={styles["find-us__desc"]}>
                    <li>Avenue Marina 34568 NY (U.S) </li>
                    <li>+0123 456 7890</li>
                    <li>hellouihut@gmail.com</li>
                </ul>
            </div>

            <div className={styles["open-time__schedule"]}>
                <div className={styles["schedule-heading"]}>Opening Times</div>
                <ul className={styles["schedule-time"]}>
                    <li>
                        <span>Noon</span>
                        <span>10a.m to 14p.m</span>
                    </li>

                    <li>
                        <span>Evening</span>
                        <span>17p.m to 22p.m</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default OpenTime;
