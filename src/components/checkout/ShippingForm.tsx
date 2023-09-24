import React from "react";
import styles from "./shipping-form.module.css";
const ShippingForm: React.FC<{}> = () => {
    return (
        <form action="#" className={`${styles["shipping-form"]} `}>
            <div className={styles["control"]}>
                <label htmlFor="name">Receiver Name*</label>
                <input type="text" name="receiverName" id="receiverName" />
            </div>

            <div className={styles["control"]}>
                <label htmlFor="address">Your Address*</label>
                <input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="House number and street name"
                />
            </div>

            <div className={styles["control"]}>
                <label htmlFor="phone">Phone Number*</label>
                <input type="number" name="number" id="number" />
            </div>

            <div className={styles["payment-method"]}>
                <h3 className={styles["heading"]}>
                    Choose your payment method
                </h3>
                <div className={`${styles["choose"]}`}>
                    <input
                        type="radio"
                        name="payment-method"
                        id="bank-transfer"
                    />
                    <label htmlFor="bank-transfer">Bank Transfer</label>
                </div>
                <div className={`${styles["choose"]}`}>
                    <input
                        type="radio"
                        name="payment-method"
                        id="cash-on-delivery"
                    />
                    <label htmlFor="cash-on-delivery">Cash on delivery</label>
                </div>

                <button className="button">Place order</button>
            </div>
        </form>
    );
};

export default ShippingForm;
