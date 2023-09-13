import React from "react";
import styles from "./add-review.module.css";
import RateStar from "../rate-star/RateStar";
const AddReview: React.FC<{}> = () => {
    return (
        <div className={styles["add-review"]}>
            <h3 className={styles["heading"]}>Add a review</h3>
            <form action="#">
                <div className={styles["rate"]}>
                    <span>Your rating</span>
                    <RateStar />
                </div>
                <textarea
                    name="comment"
                    id="comment"
                    // cols={10}
                    rows={5}
                    placeholder="Tell everybody what you think about this food!"
                ></textarea>

                <button className={`button ${styles["add-button"]}`}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddReview;
