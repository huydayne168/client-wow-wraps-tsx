import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./shipping-form.module.css";
import http from "../../utils/http";
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";
import { User } from "../../models/user";
import usePrivateHttp from "../../hooks/usePrivateHttp";
import { useTime } from "../../hooks/useTime";
import { FoodInCart } from "../../models/cart";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../../stores/store-toolkit";
import { Alert } from "antd";
import { Voucher } from "../../models/voucher";
const ShippingForm: React.FC<{
    cart: FoodInCart[];
    voucher: Voucher | undefined;
}> = ({ cart, voucher }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const privateHttp = usePrivateHttp();
    const time = useTime();
    const userId = useAppSelector((state) => state.currentUser)._id;
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [formData, setFormData] = useState({
        receiverName: currentUser?.userName || "",
        address: "",
        phoneNumber: currentUser?.phoneNumber || "",
        paymentMethod: "",
    });
    const [formError, setFormError] = useState(false);

    console.log(formData.paymentMethod);

    // set default receiver name and phone number of current user:
    useEffect(() => {
        setFormData((pre) => {
            return {
                ...pre,
                receiverName: currentUser?.userName || "",
                phoneNumber: currentUser?.phoneNumber || "",
            };
        });
    }, [currentUser]);

    // get current user info:
    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const res = await http.get("/user/get-user", {
                    params: {
                        _id: userId,
                    },
                });

                setCurrentUser(res.data.foundUser);
            } catch (error) {
                console.log(error);
            }
        };
        getCurrentUser();
    }, [userId]);

    // add check out handler
    const addCheckoutHandler = useCallback(async () => {
        if (Object.values(formData).some((value) => value === "")) {
            setFormError(true);
            return;
        } else {
            setFormError(false);
        }
        try {
            const res = await privateHttp.post("/api/checkout/add-checkout", {
                date: time.date,
                user: userId,
                receiverName: formData.receiverName,
                address: formData.address,
                phoneNumber: formData.phoneNumber,
                products: cart.map((item) => {
                    return {
                        product: item.product._id,
                        quantity: item.quantity,
                    };
                }),
                total: cart.reduce<number>((init, item) => {
                    return item.product.salePrice && item.product.salePrice > 0
                        ? init + item.quantity * item.product.salePrice
                        : init + item.quantity * item.product.price;
                }, 0),
                paymentMethod: formData.paymentMethod,
                status: "Waiting for paying",
                voucher,
            });
            toast.success("Success! Thank you for your order🥳", {
                position: "top-center",
            });
            dispatch(cartActions.clearAllCart());
            navigate("/profile");
            console.log(res);
        } catch (error) {
            console.log(error);
            toast.error("Failed! Can not order 😓", {
                position: "top-center",
            });
        }
    }, [
        time.date,
        userId,
        formData.receiverName,
        formData.address,
        formData.phoneNumber,
        cart,
        formData.paymentMethod,
    ]);

    return (
        <form action="#" className={`${styles["shipping-form"]} `}>
            {formError && (
                <Alert
                    message="Please fill all input"
                    type="error"
                    style={{ color: "red" }}
                />
            )}
            <div className={styles["control"]}>
                <label htmlFor="name">Receiver Name*</label>
                <input
                    type="text"
                    name="receiverName"
                    id="receiverName"
                    value={formData.receiverName}
                    onChange={(e) => {
                        setFormData((pre) => {
                            return { ...pre, receiverName: e.target.value };
                        });
                    }}
                />
            </div>

            <div className={styles["control"]}>
                <label htmlFor="address">Your Address*</label>
                <input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="House number and street name"
                    value={formData.address}
                    onChange={(e) => {
                        setFormData((pre) => {
                            return { ...pre, address: e.target.value };
                        });
                    }}
                />
            </div>

            <div className={styles["control"]}>
                <label htmlFor="phone">Phone Number*</label>
                <input
                    type="number"
                    name="number"
                    id="number"
                    value={formData.phoneNumber}
                    onChange={(e) => {
                        setFormData((pre) => {
                            return { ...pre, phoneNumber: e.target.value };
                        });
                    }}
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
                        defaultChecked={false}
                        onChange={(e) => {
                            if (e.target?.checked) {
                                setFormData((pre) => {
                                    return {
                                        ...pre,
                                        paymentMethod: "Bank Transfer",
                                    };
                                });
                            }
                        }}
                    />
                    <label htmlFor="bank-transfer">Bank Transfer</label>
                </div>
                <div className={`${styles["choose"]}`}>
                    <input
                        type="radio"
                        name="payment-method"
                        id="cash-on-delivery"
                        defaultChecked={false}
                        onChange={(e) => {
                            if (e.target?.checked) {
                                setFormData((pre) => {
                                    return {
                                        ...pre,
                                        paymentMethod: "By Cash",
                                    };
                                });
                            }
                        }}
                    />
                    <label htmlFor="cash-on-delivery">Cash on delivery</label>
                </div>

                <button
                    className="button"
                    onClick={(e) => {
                        e.preventDefault();
                        addCheckoutHandler();
                    }}
                    disabled={cart.length === 0 ? true : false}
                    style={{
                        opacity: `${cart.length === 0 ? ".6" : "1"}`,
                        cursor: `${
                            cart.length === 0 ? "not-allowed" : "pointer"
                        }`,
                    }}
                >
                    Place order
                </button>
            </div>
        </form>
    );
};

export default ShippingForm;
