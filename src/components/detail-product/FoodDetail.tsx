import React, { useCallback, useState } from "react";
import styles from "./food-detail.module.css";
import { Food } from "../../models/food";
import RateStar from "../rate-star/RateStar";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";
import usePrivateHttp from "../../hooks/usePrivateHttp";
import toast from "react-hot-toast";
import { cartActions } from "../../stores/store-toolkit";
const FoodDetail: React.FC<{ product: Food }> = ({ product }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [amount, setAmount] = useState(1);
    const currentUser = useAppSelector((state) => state.currentUser);
    const privateHttp = usePrivateHttp();
    const plusAmount = useCallback(() => {
        setAmount((amount) => amount + 1);
    }, []);

    const minusAmount = useCallback(() => {
        if (amount > 1) {
            setAmount((amount) => amount - 1);
        }
    }, [amount]);

    // function to add item to cart
    const addToCartHandler = useCallback(async () => {
        try {
            const res = await privateHttp.post("/user/add-to-cart", {
                userId: currentUser._id,
                product: product._id,
                quantity: amount,
            });
            console.log(res);
            toast.success("Added Success!");
            dispatch(cartActions.addCartItem(product));
        } catch (error) {
            console.log(error);
        }
    }, [amount, product._id, currentUser._id]);

    return (
        <div className={`${styles["food-detail"]} content-container`}>
            <div className={styles["food-img"]}>
                <img src={product.image} alt={product.name} />
            </div>
            <div className={styles["food-desc"]}>
                <h1 className={`content-heading ${styles.name}`}>
                    {product.name}
                </h1>
                <div className={styles["food-rate"]}>
                    <RateStar ratePoint={product.rate} />
                    <p className={styles["review-count"]}>
                        ({product.reviews.length} customers review)
                    </p>
                </div>
                <div className={`content-heading ${styles["food-price"]}`}>
                    ${product.price}
                </div>
                <div className={styles["food-text"]}>
                    {product.shortDescription}
                </div>
                <form className={styles["food-actions"]}>
                    <table className={styles["change-amount"]}>
                        <thead>
                            <tr>
                                <td onClick={minusAmount}>-</td>
                                <td>
                                    <input
                                        type="number"
                                        name="amount"
                                        id="amount"
                                        value={amount}
                                        onChange={(e) => {
                                            setAmount(Number(e.target.value));
                                        }}
                                    />
                                </td>
                                <td onClick={plusAmount}>+</td>
                            </tr>
                        </thead>
                    </table>

                    <button
                        className="button"
                        onClick={(e) => {
                            e.preventDefault();
                            addToCartHandler();
                        }}
                    >
                        Add to cart
                    </button>
                </form>

                <div className={styles["food-more-info"]}>
                    <div>
                        <span>ID:</span> {product._id}
                    </div>
                    <div>
                        <span>category:</span> {product.category.name}
                    </div>
                    <div>
                        <span>tags:</span>
                        {product.tags.map((tag) => tag.name).join(", ")}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodDetail;
