import React, { useEffect, useState, useCallback } from "react";
import styles from "./most-popular-food.module.css";
import img1 from "../../../asset/asset/popular-food1.png";
import RateStar from "../../rate-star/RateStar";
import http from "../../../utils/http";
import { Food } from "../../../models/food";
import { useNavigate } from "react-router-dom";
function MostPopularFood() {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Food[]>([]);
    const gotoDetailPage = useCallback(
        (product: Food) => {
            navigate("/detail-page", {
                state: {
                    product,
                },
            });
        },
        [navigate]
    );
    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await http.get("/api/product/get-products", {
                    params: {
                        sortRate: "true",
                        page: "1",
                    },
                });

                setProducts(res.data.slice(0, 3)); // just get top 3 products
            } catch (error) {
                console.log(error);
            }
        };
        getProducts();
    }, []);
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
                {products &&
                    products[0] &&
                    products.map((product) => {
                        return (
                            <li
                                key={product._id}
                                className={styles["food-item"]}
                                onClick={() => {
                                    gotoDetailPage(product);
                                }}
                            >
                                <div className={styles["food-image"]}>
                                    <img src={product.image} alt="" />
                                </div>

                                <div className={styles["food-desc"]}>
                                    <div className={styles["food-desc--top"]}>
                                        <h4 className={styles["food-heading"]}>
                                            {product.name}
                                        </h4>
                                        <div className={styles["food-price"]}>
                                            ${product.price}
                                        </div>
                                    </div>

                                    <div className={styles["food-desc--body"]}>
                                        {product.shortDescription}
                                    </div>

                                    <div
                                        className={styles["food-desc--bottom"]}
                                    >
                                        <div className={styles.button}>
                                            Order Now
                                        </div>
                                        <RateStar ratePoint={3} />
                                    </div>
                                </div>
                            </li>
                        );
                    })}
            </ul>

            {/* actions */}
            <div className={styles["action"]}>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        navigate("/menu");
                    }}
                >
                    Explore All Food
                </button>
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
