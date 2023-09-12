import React from "react";
import { useTime } from "../../../hooks/useTime";
import styles from "./time-open.module.css";
const TimeOpen: React.FC<{}> = () => {
    // get real time from useTime hook:
    const time = useTime();

    // return jsx:
    return (
        <div
            className={styles["time-open"]}
        >{`${time.time} _ ${time.wish}`}</div>
    );
};

export default TimeOpen;
