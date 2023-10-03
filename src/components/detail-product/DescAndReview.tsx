import React, { useCallback, useReducer, useEffect, useState } from "react";
import styles from "./desc-and-review.module.css";
import { Food } from "../../models/food";
import Description from "./Description";
import ReviewComp from "./ReviewComp";
import AddReview from "./AddReview";
import http from "../../utils/http";
import { Review } from "../../models/review";

const DescAndReview: React.FC<{ product: Food }> = ({ product }) => {
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

    const [reviews, setReviews] = useState<Review[]>([]);

    function addAReview(review: Review) {
        setReviews((pre) => [review, ...pre]);
    }

    useEffect(() => {
        const getReviews = async () => {
            try {
                const res = await http.get("/api/product/get-reviews", {
                    params: {
                        productId: product._id,
                    },
                });
                console.log(res.data);

                setReviews(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getReviews();
    }, [product._id]);

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
                        Review({reviews.length})
                    </li>
                </ul>
            </div>
            <div className={styles.body}>
                {compState === "DESCRIPTION" ? (
                    <Description content={product.longDescription} />
                ) : (
                    <>
                        <ReviewComp reviews={reviews} />
                        <AddReview
                            addReview={addAReview}
                            productId={product._id}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default DescAndReview;
