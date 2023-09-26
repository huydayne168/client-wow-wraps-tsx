import React, { useEffect, useState } from "react";
import styles from "./shipping-form.module.css";
import http from "../../utils/http";
import { useAppSelector } from "../../hooks/store-hooks";
import { User } from "../../models/user";
const ShippingForm: React.FC<{}> = () => {
    const userId = useAppSelector((state) => state.currentUser)._id;
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const res = await http.get("/user/get-user", {
                    params: {
                        _id: userId,
                    },
                });
                console.log(res.data);

                setCurrentUser(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getCurrentUser();
    }, []);
    return (
        <form action="#" className={`${styles["shipping-form"]} `}>
            <div className={styles["control"]}>
                <label htmlFor="name">Receiver Name*</label>
                <input
                    type="text"
                    name="receiverName"
                    id="receiverName"
                    defaultValue={currentUser ? currentUser.userName : ""}
                />
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
                <input
                    type="number"
                    name="number"
                    id="number"
                    defaultValue={currentUser ? currentUser.phoneNumber : ""}
                />
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
