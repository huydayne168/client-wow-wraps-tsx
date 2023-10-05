import React, { useCallback, useMemo, useState } from "react";
import styles from "./order.module.css";
import { Cart, FoodInCart } from "../../models/cart";
import { Alert } from "antd";
import { AxiosError } from "axios";
import http from "../../utils/http";
import { Voucher } from "../../models/voucher";
import toast from "react-hot-toast";
const Order: React.FC<{ cart: FoodInCart[]; getVoucher: Function }> = ({
    cart,
    getVoucher,
}) => {
    const [errVoucher, setErrVoucher] = useState(false);
    const [code, setCode] = useState("");
    const [voucher, setVoucher] = useState<Voucher>();
    const totalPrice = useMemo(() => {
        return cart.reduce<number>((init, item) => {
            if (item.product.salePrice && item.product.salePrice > 0) {
                return init + item.quantity * item.product.salePrice;
            } else {
                return init + item.quantity * item.product.price;
            }
        }, 0);
    }, [cart]);

    const applyVoucher = useCallback(async () => {
        setErrVoucher(false);
        console.log(code);

        try {
            const res = await http.get("/api/voucher/get-vouchers", {
                params: {
                    codeQuery: code,
                    sortActive: true,
                },
            });
            console.log(res.data.vouchers);

            setVoucher(res.data.vouchers[0]);
            getVoucher(res.data.vouchers[0]);
            if (res.data.vouchers[0]) {
                toast.success("Applied voucher!");
            } else {
                setErrVoucher(true);
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 409) {
                    setErrVoucher(true);
                }
            }
        }
    }, [code]);

    const removeVoucher = useCallback(() => {
        setErrVoucher(false);
        setVoucher(undefined);
        setCode("");
    }, []);

    return (
        <div className={styles["order"]}>
            <h3 className={styles["heading"]}>Your order</h3>
            {cart.length > 0 ? null : (
                <Alert
                    message="There are no items to add checkout!!!"
                    description="Please get some items into your cart!"
                    type="error"
                    style={{ color: "red" }}
                />
            )}

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
                                <th>
                                    {voucher ? (
                                        <div
                                            className={styles["discount-price"]}
                                        >
                                            <span>
                                                $
                                                {item.product.salePrice &&
                                                item.product.salePrice > 0
                                                    ? item.product.salePrice *
                                                      item.quantity
                                                    : item.product.price *
                                                      item.quantity}
                                            </span>
                                            <span>
                                                $
                                                {item.product.salePrice &&
                                                item.product.salePrice > 0
                                                    ? (
                                                          (item.product
                                                              .salePrice *
                                                              item.quantity *
                                                              (100 -
                                                                  voucher.discountPercent)) /
                                                          100
                                                      ).toFixed(2)
                                                    : (
                                                          (item.product.price *
                                                              item.quantity *
                                                              (100 -
                                                                  voucher.discountPercent)) /
                                                          100
                                                      ).toFixed(2)}
                                            </span>
                                        </div>
                                    ) : item.product.salePrice &&
                                      item.product.salePrice > 0 ? (
                                        item.product.salePrice * item.quantity
                                    ) : (
                                        item.product.price * item.quantity
                                    )}
                                </th>
                            </tr>
                        </tbody>
                    );
                })}

                <tbody className={styles["total"]}>
                    <tr>
                        <th>Total</th>
                        <th>
                            $
                            {voucher
                                ? (
                                      (totalPrice *
                                          (100 - voucher.discountPercent)) /
                                      100
                                  ).toFixed(2)
                                : totalPrice}
                        </th>
                    </tr>
                </tbody>
            </table>

            <div className={styles["apply-coupon"]}>
                <input
                    type="text"
                    name="coupon"
                    id="coupon"
                    placeholder="Enter a coupon"
                    value={code}
                    onChange={(e) => {
                        setCode(e.target.value);
                    }}
                />
                {voucher ? (
                    <button className={`button`} onClick={removeVoucher}>
                        Remove Coupon
                    </button>
                ) : (
                    <button className={`button`} onClick={applyVoucher}>
                        Apply Coupon
                    </button>
                )}
            </div>
            {errVoucher && (
                <Alert
                    type="error"
                    message="This voucher is not exist!!!"
                    style={{ color: "red", marginTop: "1.2rem" }}
                />
            )}
        </div>
    );
};

export default Order;
