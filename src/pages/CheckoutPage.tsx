import React from "react";
import CheckoutContent from "../components/checkout/CheckoutContent";
import { useLocation } from "react-router-dom";

const CheckoutPage: React.FC<{}> = () => {
    const location = useLocation();
    const cart = location.state;
    return (
        <div className="checkout-page">
            <CheckoutContent cart={cart} />
        </div>
    );
};

export default CheckoutPage;
