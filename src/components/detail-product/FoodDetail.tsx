import React, { useCallback, useState } from "react";
import styles from "./food-detail.module.css";
import { Food } from "../../models/food";
import RateStar from "../rate-star/RateStar";
import { useNavigate } from "react-router-dom";
const FoodDetail: React.FC<{ food: Food }> = ({ food }) => {
    const navigate = useNavigate();
    const [amount, setAmount] = useState(1);

    const plusAmount = useCallback(() => {
        setAmount((amount) => amount + 1);
    }, []);

    const minusAmount = useCallback(() => {
        if (amount > 1) {
            setAmount((amount) => amount - 1);
        }
    }, [amount]);

    // function to go to cart page and also pass the cart information:
    type GoToCartPage = () => (e: React.MouseEvent) => void;
    const gotoCartPage: GoToCartPage = useCallback(
        () => (e) => {
            e.preventDefault();
            navigate("/cart-page"); // add {state: ...} as a second parameter to send cart data
        },
        [navigate]
    );

    return (
        <div className={`${styles["food-detail"]} content-container`}>
            <div className={styles["food-img"]}>
                <img src={food.image} alt={food.name} />
            </div>
            <div className={styles["food-desc"]}>
                <h1 className={`content-heading ${styles.name}`}>
                    {food.name}
                </h1>
                <div className={styles["food-rate"]}>
                    <RateStar ratePoint={food.rate} />
                    <p className={styles["review-count"]}>
                        ({food.reviews.length} customers review)
                    </p>
                </div>
                <div className={`content-heading ${styles["food-price"]}`}>
                    ${food.price}
                </div>
                <div className={styles["food-text"]}>
                    {food.shortDescription}
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

                    <button className="button" onClick={gotoCartPage}>
                        Add to cart
                    </button>
                </form>

                <div className={styles["food-more-info"]}>
                    <div>
                        <span>ID:</span> {food._id}
                    </div>
                    <div>
                        <span>category:</span> {food.category}
                    </div>
                    <div>
                        <span>tags:</span>
                        {food.tags.map((tag) => `${tag},`)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodDetail;
