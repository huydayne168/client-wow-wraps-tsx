import React, { useState } from "react";
import styles from "./checkout-content.module.css";
import ShippingForm from "./ShippingForm";
import { Cart } from "../../models/cart";
import Order from "./Order";
import { useLocation } from "react-router-dom";
import { Voucher } from "../../models/voucher";
const CheckoutContent: React.FC<{}> = () => {
    const location = useLocation();
    const cart =
        location.state && location.state.cart ? location.state.cart : [];
    const [voucher, setVoucher] = useState<Voucher>();

    function getVoucher(_voucher: Voucher) {
        setVoucher(_voucher);
    }

    return (
        <div className={`${styles["checkout-content"]} content-container`}>
            <h2 className="content-heading">Billing details</h2>
            <div className={styles["main-content"]}>
                <ShippingForm cart={cart} voucher={voucher} />
                <Order getVoucher={getVoucher} cart={cart} />
            </div>
        </div>
    );
};

export default CheckoutContent;
