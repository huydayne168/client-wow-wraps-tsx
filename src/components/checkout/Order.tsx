import React, { useMemo } from "react";
import styles from "./order.module.css";
import { Cart } from "../../models/cart";
const Order: React.FC<{ cart: Cart }> = ({ cart }) => {
    const totalPrice = useMemo(() => {
        return cart.foods.reduce<number>((init, food) => {
            return init + food.amount * food.food.price;
        }, 0);
    }, [cart]);

    return (
        <div className={styles["order"]}>
            <h3 className={styles["heading"]}>Your order</h3>

            <table className={styles["order-list"]}>
                <tr>
                    <th>Food</th>
                    <th>Subtotal</th>
                </tr>
                {cart.foods.map((food) => {
                    return (
                        <tr>
                            <th>
                                {food.food.name} x {food.amount}
                            </th>
                            <th>${food.food.price * food.amount}</th>
                        </tr>
                    );
                })}

                <tr>
                    <th>Shipping</th>
                    <th>$6</th>
                </tr>

                <tr>
                    <th>Total</th>
                    <th>${totalPrice}</th>
                </tr>
            </table>
        </div>
    );
};

export default Order;
