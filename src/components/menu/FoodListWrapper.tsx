import React, { useCallback, useEffect, useState } from "react";
import styles from "./food-list-wrapper.module.css";
import RateStar from "../rate-star/RateStar";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Food } from "../../models/food";
import http from "../../utils/http";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { log } from "console";
import BarLoader from "react-spinners/BarLoader";
const FoodListWrapper: React.FC<{ food?: Food }> = ({ food }) => {
    const navigate = useNavigate();
    const [isLastPage, setIsLastPage] = useState<boolean>(false);
    const [search, setSearch] = useSearchParams();
    const [products, setProducts] = useState<Food[] | null>();
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        search.set("page", currentPage.toString());
        setSearch(search, {
            replace: true,
        });
    }, [currentPage]);

    useEffect(() => {
        const getProducts = setTimeout(async () => {
            setIsLoading(true);
            try {
                const res = await http.get("/api/product/get-products", {
                    params: search || null,
                });
                console.log(res.data);
                if (res.data.isLastPage) {
                    setIsLastPage(true);
                    setProducts(res.data.products);
                } else {
                    setProducts(res.data);
                    setIsLastPage(false);
                }
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        }, 500);

        return () => clearTimeout(getProducts);
    }, [search]);

    // function to go to Detail page:
    const gotoDetailPage = useCallback(() => {}, [navigate]);

    // return TSX:
    return (
        <div className={styles["food-list-wrapper"]}>
            {isLoading ? (
                <BarLoader />
            ) : (
                <ul>
                    <>
                        {products && products[0] ? (
                            products.map((product) => {
                                return (
                                    <li
                                        key={product._id}
                                        className={styles["food-list__item"]}
                                        onClick={() => {
                                            gotoDetailPage();
                                        }}
                                    >
                                        <div className={styles["food-image"]}>
                                            <img src={product.image} alt="" />
                                        </div>
                                        <div className={styles.desc}>
                                            <div
                                                className={
                                                    styles["food-desc-top"]
                                                }
                                            >
                                                <div
                                                    className={
                                                        styles["desc-name"]
                                                    }
                                                >
                                                    {product.name}
                                                </div>
                                                <div
                                                    className={
                                                        styles["desc-price"]
                                                    }
                                                >
                                                    ${product.price}
                                                </div>
                                            </div>
                                            <div
                                                className={styles["desc-text"]}
                                            >
                                                {product.shortDescription}
                                            </div>
                                            <div
                                                className={
                                                    styles["food-desc--bottom"]
                                                }
                                            >
                                                <RateStar
                                                    ratePoint={Number(
                                                        product.rate
                                                    )}
                                                />
                                                <div className={`order-button`}>
                                                    Order Now
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })
                        ) : (
                            <li className={styles["no-result"]}>
                                No Products Here
                            </li>
                        )}
                    </>
                </ul>
            )}

            <ul className={styles["pagination"]}>
                {currentPage !== 1 ? (
                    <li
                        onClick={() => {
                            setCurrentPage((pre) => pre - 1);
                        }}
                        className={styles["left"]}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </li>
                ) : (
                    <div className={styles["left"]}></div>
                )}
                <li className={styles["page-number"]}>{search.get("page")}</li>
                {!isLastPage ? (
                    <li
                        onClick={() => {
                            setCurrentPage((pre) => pre + 1);
                        }}
                        className={styles["right"]}
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </li>
                ) : (
                    <div className={styles["right"]}></div>
                )}
            </ul>
        </div>
    );
};

export default FoodListWrapper;
