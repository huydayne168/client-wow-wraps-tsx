import React from "react";
import styles from "./checkout-content.module.css";
import ShippingForm from "./ShippingForm";
import { Cart } from "../../models/cart";
import Order from "./Order";
const CheckoutContent: React.FC<{ cart: Cart }> = ({ cart }) => {
    return (
        <div className={`${styles["checkout-content"]} content-container`}>
            <h2 className="content-heading">Billing details</h2>
            <div className={styles["main-content"]}>
                <ShippingForm />
                <Order cart={cart} />
            </div>
        </div>
    );
};

export default CheckoutContent;
