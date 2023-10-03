import React, { useCallback, useState, useRef } from "react";
import styles from "./add-review.module.css";
import RateStar from "../rate-star/RateStar";
import http from "../../utils/http";
import { useTime } from "../../hooks/useTime";
import { useAppSelector } from "../../hooks/store-hooks";
import usePrivateHttp from "../../hooks/usePrivateHttp";
import { Alert } from "antd";
const AddReview: React.FC<{ productId: string; addReview: Function }> = ({
    productId,
    addReview,
}) => {
    const [ratePoint, setRatePoint] = useState<number | null>(null);
    const commentRef = useRef<HTMLTextAreaElement>(null);
    const time = useTime();
    const currentUser = useAppSelector((state) => state.currentUser);
    const privateHttp = usePrivateHttp();
    const [errMess, setErrMess] = useState(false);
    // Add review handler:
    const addReviewHandler = useCallback(async () => {
        const comment = commentRef.current?.value;
        setErrMess(false);
        try {
            const res = await privateHttp.post("/api/product/add-review", {
                productId,
                comment,
                date: time.date,
                ratePoint,
                user: currentUser._id,
            });
            addReview({
                productId,
                comment,
                date: time.date,
                ratePoint,
                user: currentUser._id,
            });
            console.log(res);
        } catch (error) {
            console.log(error, "this is err");
            if (error instanceof Error) {
                setErrMess(true);
            }
        }
    }, [currentUser._id, privateHttp, productId, ratePoint, time.date]);

    // get rate point function:
    function getPoint(point: number) {
        setRatePoint(point);
    }

    return (
        <div className={styles["add-review"]}>
            <h3 className={styles["heading"]}>Add a review</h3>
            <form action="#">
                <div className={styles["rate"]}>
                    <span>Your rating</span>
                    <RateStar submitPoint={getPoint} />
                </div>
                <textarea
                    name="comment"
                    id="comment"
                    rows={1}
                    placeholder="Tell everybody what you think about this food!"
                    ref={commentRef}
                ></textarea>

                {errMess && (
                    <Alert
                        message="Please enter all input!"
                        type="error"
                        style={{ color: "red" }}
                    />
                )}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        addReviewHandler();
                    }}
                    className={`button ${styles["add-button"]}`}
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddReview;
