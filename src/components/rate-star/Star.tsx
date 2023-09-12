import React, { useCallback } from "react";
import styles from "./star.module.css";
const Star: React.FC<{ point: number; changePoint?: any; color: string }> = ({
    point,
    changePoint,
    color,
}) => {
    const changeRatePoint = useCallback(
        (e: any) => {
            //check if we pass changePoint function as a prop to do the rate action:
            if (changePoint) {
                changePoint(e.target.value);
            } else {
                return;
            }
        },
        [changePoint]
    );

    return (
        <label className={styles["star"]}>
            <input
                type="radio"
                name="rating"
                id={point.toString() + "star"}
                value={point}
                className={styles["stars_radio-input"]}
                onClick={changeRatePoint}
            />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="20"
                viewBox="0 0 22 20"
                fill="none"
            >
                <path
                    d="M10.0489 0.927053C10.3483 0.00574231 11.6517 0.00573993 11.9511 0.927051L13.6942 6.29179C13.828 6.70382 14.212 6.98278 14.6452 6.98278H20.2861C21.2548 6.98278 21.6576 8.22239 20.8738 8.7918L16.3103 12.1074C15.9598 12.362 15.8132 12.8134 15.947 13.2254L17.6902 18.5902C17.9895 19.5115 16.935 20.2776 16.1513 19.7082L11.5878 16.3926C11.2373 16.138 10.7627 16.138 10.4122 16.3926L5.84869 19.7082C5.06498 20.2776 4.0105 19.5115 4.30985 18.5902L6.05296 13.2254C6.18683 12.8134 6.04018 12.362 5.68969 12.1074L1.12616 8.7918C0.342451 8.22239 0.745225 6.98278 1.71395 6.98278H7.35477C7.788 6.98278 8.17196 6.70382 8.30583 6.2918L10.0489 0.927053Z"
                    fill={color}
                />
            </svg>
        </label>
    );
};

export default Star;
