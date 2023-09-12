import React from "react";
import styles from "./related.module.css";
import { Food } from "../../models/food";
import img from "../../asset/asset/popular-food2.png";
const Related: React.FC<{ foods?: Food[] }> = ({ foods }) => {
    return (
        <div className={`content-container ${styles["related"]}`}>
            <h3 className={`${styles["heading"]}`}>Related Items</h3>
            <div className={styles["related-list"]}>
                <div className={styles["related-item"]}>
                    <img src={img} alt="" />
                    <div className={styles["desc"]}>
                        <div className={styles["name"]}>
                            Crispy chicken breasts
                        </div>
                        <p className={styles["desc-detail"]}>
                            Fresh toasted sourdough bread with olive oil and
                            pomegranate.
                        </p>
                        <div className={styles["bottom"]}>
                            <button className={`order-button`}>
                                Order Now
                            </button>
                            <div className={styles.price}>$5</div>
                        </div>
                    </div>
                </div>

                <div className={styles["related-item"]}>
                    <img src={img} alt="" />
                    <div className={styles["desc"]}>
                        <div className={styles["name"]}>
                            Crispy chicken breasts
                        </div>
                        <p className={styles["desc-detail"]}>
                            Fresh toasted sourdough bread with olive oil and
                            pomegranate.
                        </p>
                        <div className={styles["bottom"]}>
                            <button className={`order-button`}>
                                Order Now
                            </button>
                            <div className={styles.price}>$5</div>
                        </div>
                    </div>
                </div>

                <div className={styles["related-item"]}>
                    <img src={img} alt="" />
                    <div className={styles["desc"]}>
                        <div className={styles["name"]}>
                            Crispy chicken breasts
                        </div>
                        <p className={styles["desc-detail"]}>
                            Fresh toasted sourdough bread with olive oil and
                            pomegranate.
                        </p>
                        <div className={styles["bottom"]}>
                            <button className={`order-button`}>
                                Order Now
                            </button>
                            <div className={styles.price}>$5</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Related;
