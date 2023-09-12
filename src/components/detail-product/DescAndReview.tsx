import React, { useCallback, useReducer } from "react";
import styles from "./desc-and-review.module.css";
import { Food } from "../../models/food";
import Description from "./Description";
import ReviewComp from "./ReviewComp";
const DescAndReview: React.FC<{ food: Food }> = ({ food }) => {
    const compInitState = "DESCRIPTION";
    const compReducer = useCallback(
        (state: string, action: { type: string }) => {
            switch (action.type) {
                case "DESCRIPTION":
                    return "DESCRIPTION";
                case "REVIEW":
                    return "REVIEW";
                default:
                    return state;
            }
        },
        []
    );

    const [compState, compStateDispatch] = useReducer(
        compReducer,
        compInitState
    );
    return (
        <div className={`${styles["desc-and-review"]} content-container`}>
            <div className={styles["nav-bar"]}>
                <ul>
                    <li
                        className={`${
                            compState === "DESCRIPTION"
                                ? styles["active-link"]
                                : ""
                        }`}
                        onClick={() => {
                            compStateDispatch({ type: "DESCRIPTION" });
                        }}
                    >
                        Description
                    </li>
                    <li
                        className={`${
                            compState === "REVIEW" ? styles["active-link"] : ""
                        }`}
                        onClick={() => {
                            compStateDispatch({ type: "REVIEW" });
                        }}
                    >
                        Review({food.reviews.length})
                    </li>
                </ul>
            </div>
            <div className={styles.body}>
                {compState === "DESCRIPTION" ? (
                    <Description content={food.longDescription} />
                ) : (
                    <ReviewComp reviews={food.reviews} />
                )}
            </div>
        </div>
    );
};

export default DescAndReview;
