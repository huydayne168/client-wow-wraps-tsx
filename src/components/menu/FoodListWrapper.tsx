import React, { useCallback } from "react";
import styles from "./food-list-wrapper.module.css";
import img from "../../asset/asset/popular-food1.png";
import RateStar from "../rate-star/RateStar";
import { useNavigate } from "react-router-dom";
import { Food } from "../../models/food";
const FoodListWrapper: React.FC<{ food?: Food }> = ({ food }) => {
    const navigate = useNavigate();
    // function to go to Detail page:

    const gotoDetailPage = useCallback(() => {
        navigate("/detail-page");
    }, [navigate]);

    // return TSX:
    return (
        <div className={styles["food-list-wrapper"]}>
            <ul>
                <li
                    className={styles["food-list__item"]}
                    onClick={() => {
                        gotoDetailPage();
                    }}
                >
                    <div className={styles["food-image"]}>
                        <img src={img} alt="" />
                    </div>
                    <div className={styles.desc}>
                        <div className={styles["desc-name"]}>
                            Schezwan Noodles
                        </div>
                        <div className={styles["desc-price"]}>$4</div>
                        <div className={styles["desc-text"]}>
                            Fresh toasted sourdough bread with olive oil and
                            pomegranate.
                        </div>
                        <div className={styles["food-desc--bottom"]}>
                            <RateStar ratePoint={3} />
                            <div className={`order-button`}>Order Now</div>
                        </div>
                    </div>
                </li>

                <li className={styles["food-list__item"]}>
                    <div className={styles["food-image"]}>
                        <img src={img} alt="" />
                    </div>
                    <div className={styles.desc}>
                        <div className={styles["desc-name"]}>
                            Schezwan Noodles
                        </div>
                        <div className={styles["desc-price"]}>$4</div>
                        <div className={styles["desc-text"]}>
                            Fresh toasted sourdough bread with olive oil and
                            pomegranate.
                        </div>
                        <div className={styles["food-desc--bottom"]}>
                            <RateStar ratePoint={3} />
                            <div className={`order-button`}>Order Now</div>
                        </div>
                    </div>
                </li>

                <li className={styles["food-list__item"]}>
                    <div className={styles["food-image"]}>
                        <img src={img} alt="" />
                    </div>
                    <div className={styles.desc}>
                        <div className={styles["desc-name"]}>
                            Schezwan Noodles
                        </div>
                        <div className={styles["desc-price"]}>$4</div>
                        <div className={styles["desc-text"]}>
                            Fresh toasted sourdough bread with olive oil and
                            pomegranate.
                        </div>
                        <div className={styles["food-desc--bottom"]}>
                            <RateStar ratePoint={3} />
                            <div className={`order-button`}>Order Now</div>
                        </div>
                    </div>
                </li>

                <li className={styles["food-list__item"]}>
                    <div className={styles["food-image"]}>
                        <img src={img} alt="" />
                    </div>
                    <div className={styles.desc}>
                        <div className={styles["desc-name"]}>
                            Schezwan Noodles
                        </div>
                        <div className={styles["desc-price"]}>$4</div>
                        <div className={styles["desc-text"]}>
                            Fresh toasted sourdough bread with olive oil and
                            pomegranate.
                        </div>
                        <div className={styles["food-desc--bottom"]}>
                            <RateStar ratePoint={3} />
                            <div className={`order-button`}>Order Now</div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default FoodListWrapper;
