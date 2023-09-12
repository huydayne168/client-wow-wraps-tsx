import React from "react";
import styles from "./review.module.css";
import { Review } from "../../models/review";
import RateStar from "../rate-star/RateStar";
const ReviewComp: React.FC<{ reviews: Review[] }> = ({ reviews }) => {
    return (
        <div className={styles["review"]}>
            {reviews.map((review) => {
                return (
                    <div key={review._id} className={styles["review-item"]}>
                        <div className={styles["avatar"]}>
                            <img src={review.user.avatar} alt="avatar" />
                        </div>
                        <div className={styles["desc"]}>
                            <div className={styles.top}>
                                <div className={styles.username}>
                                    {review.user.userName}
                                </div>
                                <span>-</span>
                                <div className={styles.date}>{review.date}</div>
                            </div>
                            <div className={styles.body}>
                                {review.reviewContent}
                            </div>
                            <RateStar ratePoint={review.rate} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ReviewComp;
