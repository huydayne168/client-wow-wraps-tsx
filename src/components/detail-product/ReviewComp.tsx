import React from "react";
import styles from "./review.module.css";
import { Review } from "../../models/review";
import RateStar from "../rate-star/RateStar";
import avatar from "../../asset/asset/c6e56503cfdd87da299f72dc416023d4.jpg";
import { useAppSelector } from "../../hooks/store-hooks";
const ReviewComp: React.FC<{ reviews: Review[] }> = ({ reviews }) => {
    const currentUser = useAppSelector((state) => state.currentUser);
    return (
        <div className={styles["review"]}>
            {reviews.map((review) => {
                return (
                    <div key={review._id} className={styles["review-item"]}>
                        <div className={styles["avatar"]}>
                            <img src={avatar} alt="avatar" />
                        </div>
                        <div className={styles["desc"]}>
                            <div className={styles.top}>
                                <div className={styles.username}>
                                    {review.user._id === currentUser._id
                                        ? "You"
                                        : review.user.userName}
                                </div>
                                <span>-</span>
                                <div className={styles.date}>{review.date}</div>
                            </div>
                            <div className={styles.body}>{review.comment}</div>
                            <RateStar ratePoint={review.ratePoint} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ReviewComp;
