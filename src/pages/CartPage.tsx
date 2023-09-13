import React from "react";
import CartTable from "../components/cart/CartTable";

const CartPage: React.FC<{}> = () => {
    return (
        <div className="cart-page">
            <CartTable />
        </div>
    );
};

export default CartPage;
