import React from "react";
import styles from "./most-popular-food.module.css";
import img1 from "../../../asset/asset/popular-food1.png";
import RateStar from "../../rate-star/RateStar";
function MostPopularFood() {
    return (
        <div className={`${styles["most-popular"]} content-container`}>
            <h3 className={`${styles["heading"]} content-heading`}>
                Most popular food
            </h3>
            <p className={`${styles["desc"]} content-desc`}>
                A list of most popular Bangladeshi food including mains, drinks,
                and deserts you must try while in Bangladesh, for an authentic
                experience. Check now!
            </p>

            <ul className={styles["food-wrapper"]}>
                <li className={styles["food-item"]}>
                    <div className={styles["food-image"]}>
                        <img src={img1} alt="" />
                    </div>

                    <div className={styles["food-desc"]}>
                        <div className={styles["food-desc--top"]}>
                            <h4 className={styles["food-heading"]}>
                                Schezwan Noodles
                            </h4>
                            <div className={styles["food-price"]}>$4</div>
                        </div>

                        <div className={styles["food-desc--body"]}>
                            Fresh toasted sourdough bread with olive oil and
                            pomegranate.
                        </div>

                        <div className={styles["food-desc--bottom"]}>
                            <div className={styles.button}>Order Now</div>
                            <RateStar ratePoint={3} />
                        </div>
                    </div>
                </li>

                <li className={styles["food-item"]}>
                    <div className={styles["food-image"]}>
                        <img src={img1} alt="" />
                    </div>

                    <div className={styles["food-desc"]}>
                        <div className={styles["food-desc--top"]}>
                            <h4 className={styles["food-heading"]}>
                                Schezwan Noodles
                            </h4>
                            <div className={styles["food-price"]}>$4</div>
                        </div>

                        <div className={styles["food-desc--body"]}>
                            Fresh toasted sourdough bread with olive oil and
                            pomegranate.
                        </div>

                        <div className={styles["food-desc--bottom"]}>
                            <div className={styles.button}>Order Now</div>
                            <RateStar ratePoint={3} />
                        </div>
                    </div>
                </li>

                <li className={styles["food-item"]}>
                    <div className={styles["food-image"]}>
                        <img src={img1} alt="" />
                    </div>

                    <div className={styles["food-desc"]}>
                        <div className={styles["food-desc--top"]}>
                            <h4 className={styles["food-heading"]}>
                                Schezwan Noodles
                            </h4>
                            <div className={styles["food-price"]}>$4</div>
                        </div>

                        <div className={styles["food-desc--body"]}>
                            Fresh toasted sourdough bread with olive oil and
                            pomegranate.
                        </div>

                        <div className={styles["food-desc--bottom"]}>
                            <div className={styles.button}>Order Now</div>
                            <RateStar ratePoint={3} />
                        </div>
                    </div>
                </li>
            </ul>

            {/* actions */}
            <div className={styles["action"]}>
                <button>Explore All Food</button>
                {/* arrow */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="11"
                    viewBox="0 0 18 11"
                    fill="none"
                >
                    <path
                        d="M1 5.5H17M17 5.5C15.4848 5.26 12.4545 4.024 12.4545 1M17 5.5C15.4848 5.74 12.4545 6.976 12.4545 10"
                        stroke="#FB8F2C"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
        </div>
    );
}

export default MostPopularFood;
