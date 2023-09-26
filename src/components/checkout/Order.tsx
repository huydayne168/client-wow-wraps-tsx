import React, { useMemo } from "react";
import styles from "./order.module.css";
import { Cart, FoodInCart } from "../../models/cart";
const Order: React.FC<{ cart: FoodInCart[] }> = ({ cart }) => {
    const totalPrice = useMemo(() => {
        return cart.reduce<number>((init, item) => {
            return init + item.quantity * item.product.price;
        }, 0);
    }, [cart]);

    return (
        <div className={styles["order"]}>
            <h3 className={styles["heading"]}>Your order</h3>

            <table className={styles["order-list"]}>
                <tbody>
                    <tr>
                        <th>Food</th>
                        <th>Subtotal</th>
                    </tr>
                </tbody>
                {cart.map((item) => {
                    return (
                        <tbody key={item.product._id}>
                            <tr>
                                <th>
                                    {item.product.name} x {item.quantity}
                                </th>
                                <th>${item.product.price * item.quantity}</th>
                            </tr>
                        </tbody>
                    );
                })}

                <tbody className={styles["total"]}>
                    <tr>
                        <th>Total</th>
                        <th>${totalPrice}</th>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Order;
