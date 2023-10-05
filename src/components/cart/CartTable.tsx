import React, { useCallback, useEffect, useState } from "react";
import styles from "./cart-table.module.css";
import { Cart, FoodInCart } from "../../models/cart";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import usePrivateHttp from "../../hooks/usePrivateHttp";
import { useAppDispatch, useAppSelector } from "../../hooks/store-hooks";
import { Food } from "../../models/food";
import { MoonLoader } from "react-spinners";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { cartActions } from "../../stores/store-toolkit";
const CartTable: React.FC<{}> = ({}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const privateHttp = usePrivateHttp();
    const currentUser = useAppSelector((state) => state.currentUser);
    const [cart, setCart] = useState<FoodInCart[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    console.log(cart);

    // get cart
    useEffect(() => {
        const getCart = async () => {
            setIsLoading(true);
            const res = await privateHttp.get("/user/get-cart", {
                params: {
                    userId: currentUser._id,
                },
            });
            setIsLoading(false);

            setCart(res.data);
        };
        getCart();
    }, []);
    console.log(currentUser);

    const plusAmount = useCallback((_id: string) => {
        setIsUpdated(true);
        setCart((pre) => {
            const newCart = pre.map((item) => {
                if (item._id === _id) {
                    item.quantity += 1;
                }
                return item;
            });
            return newCart;
        });
    }, []);

    const minusAmount = useCallback((_id: string) => {
        setIsUpdated(true);
        setCart((pre) => {
            const newCart = pre.map((item) => {
                if (item._id === _id && item.quantity > 1) {
                    item.quantity -= 1;
                }
                return item;
            });
            return newCart;
        });
    }, []);

    // UPDATE CART HERE:
    const updateCartHandler = useCallback(async () => {
        try {
            const res = await privateHttp.patch("/user/update-cart", {
                cart: cart.map((item) => {
                    return { ...item, product: item.product._id };
                }),
                userId: currentUser._id,
            });
            setIsUpdated(false);
            toast.success("Update success!");
        } catch (error) {
            console.log(error);
            toast.error("Can not update!");
        }
    }, [cart, currentUser._id]);

    // DELETE CART HERE:
    const deleteCartHandler = useCallback(
        async (cartId: string) => {
            try {
                const res = await privateHttp.delete("/user/delete-cart", {
                    params: {
                        cartId,
                        userId: currentUser._id,
                    },
                });
                setCart((pre) => {
                    return pre.filter((item) => item._id !== cartId);
                });

                toast.success("Deleted!");
                dispatch(cartActions.deleteCartItem(cartId));
                console.log(res);
            } catch (error) {
                console.log(error);
                toast.error("Can not delete!");
            }
        },
        [cart, currentUser._id]
    );

    // function to see the food detail:
    const gotoDetailPage = useCallback((product: Food) => {
        navigate("/detail-page", {
            state: {
                product,
            },
        });
    }, []);

    // proceed to checkout page:
    const gotoCheckoutPage = useCallback(() => {
        navigate("/checkout-page", {
            state: {
                cart,
            },
        });
    }, [cart]);

    return (
        <div className={`${styles["cart-table"]} content-container`}>
            <h2 className="content-heading">Your Cart</h2>

            <ul className={styles["responsive-table"]}>
                <li className={styles["table-header"]}>
                    <div className={`${styles["col"]} ${styles["col-1"]}`}>
                        Food
                    </div>
                    <div className={`${styles["col"]} ${styles["col-2"]}`}>
                        Price
                    </div>
                    <div className={`${styles["col"]} ${styles["col-3"]}`}>
                        Quantity
                    </div>
                    <div className={`${styles["col"]} ${styles["col-4"]}`}>
                        Sub Total
                    </div>
                    <div className={`${styles["col"]} ${styles["col-5"]}`}>
                        Delete
                    </div>
                </li>
                {isLoading && <MoonLoader color="#fb8f2c" />}
                {cart && cart[0] && !isLoading ? (
                    cart.map((item) => {
                        return (
                            <li
                                key={item.product._id}
                                className={styles["table-row"]}
                            >
                                <div
                                    className={`${styles["col"]} ${styles["col-1"]}`}
                                    onClick={() => {
                                        gotoDetailPage(item.product);
                                    }}
                                >
                                    <span
                                        onClick={() => {
                                            gotoDetailPage(item.product);
                                        }}
                                    >
                                        {item.product.name}
                                    </span>
                                </div>
                                <div
                                    className={`${styles["col"]} ${styles["col-2"]}`}
                                >
                                    {item.product.salePrice ? (
                                        <span
                                            className={styles["food-old-price"]}
                                        >
                                            ${item.product.salePrice}
                                        </span>
                                    ) : (
                                        <span>${item.product.price}</span>
                                    )}
                                </div>
                                <div
                                    className={`${styles["col"]} ${styles["col-3"]}`}
                                >
                                    <table className={styles["change-amount"]}>
                                        <thead>
                                            <tr>
                                                <td
                                                    onClick={() => {
                                                        minusAmount(item._id);
                                                    }}
                                                >
                                                    -
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        name="amount"
                                                        id="amount"
                                                        value={item.quantity}
                                                        disabled
                                                    />
                                                </td>
                                                <td
                                                    onClick={() => {
                                                        plusAmount(item._id);
                                                    }}
                                                >
                                                    +
                                                </td>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                                <div
                                    className={`${styles["col"]} ${styles["col-4"]}`}
                                >
                                    $
                                    {item.product.salePrice
                                        ? Number(item.product.salePrice) *
                                          item.quantity
                                        : Number(item.product.price) *
                                          item.quantity}
                                </div>
                                <div
                                    className={`${styles["col"]} ${styles["col-5"]}`}
                                    onClick={() => {
                                        deleteCartHandler(item._id);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </div>
                            </li>
                        );
                    })
                ) : (
                    <p
                        style={{
                            color: "#666",
                            textAlign: "center",
                            margin: "3.2rem 0",
                        }}
                    >
                        You have not added anything to your cart yet!
                    </p>
                )}
            </ul>

            <form className={styles["actions-form"]}>
                <div className={styles["coupon"]}>
                    {isUpdated && (
                        <motion.button
                            transition={{ duration: 0.2 }}
                            initial={{ opacity: 0, scale: 0.4 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="button"
                            onClick={(e) => {
                                e.preventDefault();
                                updateCartHandler();
                            }}
                        >
                            Update Your Cart
                        </motion.button>
                    )}
                </div>
                {cart.length > 0 && (
                    <motion.div
                        transition={{ duration: 0.2 }}
                        initial={{ opacity: 0, scale: 0.4 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`${styles["goto-checkout"]} button`}
                        onClick={gotoCheckoutPage}
                    >
                        Proceed to Checkout
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="56"
                            height="26"
                            viewBox="0 0 56 26"
                            fill="none"
                        >
                            <path
                                d="M1 13H55M55 13C50.9091 12.36 42.7273 9.064 42.7273 1M55 13C50.9091 13.64 42.7273 16.936 42.7273 25"
                                stroke="white"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </motion.div>
                )}
            </form>
        </div>
    );
};

export default CartTable;
