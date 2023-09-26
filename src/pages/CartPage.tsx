import React from "react";
import CartTable from "../components/cart/CartTable";
import useScrollToTop from "../hooks/useScrollToTop";

const CartPage: React.FC<{}> = () => {
    useScrollToTop();
    return (
        <div className="cart-page">
            <CartTable />
        </div>
    );
};

export default CartPage;
