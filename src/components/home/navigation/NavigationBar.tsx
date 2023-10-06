import React, { useCallback, useEffect, useState } from "react";
import styles from "./navigation-bar.module.css";
import NavigationList from "./NavigationList";
import Logo from "../../../asset/asset/Logo";
import TimeOpen from "./TimeOpen";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import http from "../../../utils/http";
import { User } from "../../../models/user";
import { useAppDispatch, useAppSelector } from "../../../hooks/store-hooks";
import usePrivateHttp from "../../../hooks/usePrivateHttp";
import { cartActions, curUserActions } from "../../../stores/store-toolkit";
import type { MenuProps } from "antd";
import { Button, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { AxiosError } from "axios";
const NavigationBar: React.FC<{}> = () => {
    const privateHttp = usePrivateHttp();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const currentUser = useAppSelector((state) => state.currentUser);
    const [currentUserInfo, setCurrentUserInfo] = useState<User | null>(null);
    const cart = useAppSelector((state) => state.cart);

    // get screenWidth :
    const screenWidth = useSelector((state: any) => state.screenWidth);
    const gotoCartPage = useCallback(() => {
        navigate("/cart-page");
    }, [navigate]);

    // get current user:
    useEffect(() => {
        const getCurrentUserInfo = async () => {
            try {
                const res = await http.get("/user/get-user", {
                    params: {
                        _id: currentUser._id,
                    },
                });
                setCurrentUserInfo(res.data.foundUser);
            } catch (error) {
                console.log(error);
                if (error instanceof AxiosError) {
                    if (
                        error.response?.status === 401 ||
                        error.response?.status === 403
                    ) {
                        navigate("/login");
                        console.log("error");
                    } else if (error.request) {
                        console.log(error.request);
                        navigate("/login");
                    }
                    dispatch(curUserActions.logout());
                }
            }
        };
        if (currentUser._id) {
            getCurrentUserInfo();
        }
    }, [currentUser._id]);

    // get current user cart:
    useEffect(() => {
        const getCart = async () => {
            try {
                const res = await privateHttp.get("/user/get-cart", {
                    params: {
                        userId: currentUser._id,
                    },
                });
                console.log(res.data);

                dispatch(cartActions.getCart(res.data));
            } catch (error) {
                if (error instanceof AxiosError) {
                    if (
                        error.response?.status === 401 ||
                        error.response?.status === 403
                    ) {
                        navigate("/login");
                        console.log("error");
                    } else if (error.request) {
                        console.log(error.request);
                        navigate("/login");
                    }
                    dispatch(curUserActions.logout());
                }
            }
        };
        if (currentUser._id) {
            console.log("get cart");
            getCart();
        }
    }, [currentUserInfo?._id, currentUser._id]);
    console.log(cart);

    // LOGOUT
    const logoutHandler = useCallback(async () => {
        try {
            const res = await privateHttp.post("/user/logout");
            console.log(res);
            setCurrentUserInfo(null);
            dispatch(curUserActions.logout());
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }, [dispatch, privateHttp]);

    const items: MenuProps["items"] = [
        {
            key: "yourProfile",
            label: (
                <div
                    className={styles["dropdown-items"]}
                    onClick={() => {
                        navigate("/profile");
                    }}
                >
                    Your Profile
                </div>
            ),
        },
        {
            key: "logOut",
            label: (
                <div
                    className={styles["dropdown-items"]}
                    onClick={() => {
                        logoutHandler();
                    }}
                >
                    Log Out
                </div>
            ),
        },
    ];

    return (
        <div className={`${styles["navigation-bar"]} content-container`}>
            <NavigationList currentUserInfo={currentUserInfo} />
            <Logo />

            {screenWidth ? (
                <>
                    {currentUserInfo?._id ? (
                        <div className={styles["right-side"]}>
                            <div
                                className={styles["cart-nav"]}
                                onClick={gotoCartPage}
                            >
                                Your Cart
                                <FontAwesomeIcon icon={faCartShopping} />
                                <motion.span
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        duration: 0.3,
                                        ease: [0, 0.71, 0.2, 1.01],
                                        scale: {
                                            type: "spring",
                                            damping: 5,
                                            stiffness: 100,
                                            restDelta: 0.001,
                                        },
                                    }}
                                    className={styles["cart-count"]}
                                >
                                    {cart.products.length}
                                </motion.span>
                            </div>
                            <Dropdown menu={{ items }} placement="bottomRight">
                                <span className={styles["user-profile"]}>
                                    <Avatar
                                        size="large"
                                        icon={<UserOutlined />}
                                    />
                                    {currentUserInfo.userName}
                                </span>
                            </Dropdown>
                        </div>
                    ) : (
                        <div className={styles["right-side"]}>
                            <Link to={"/login"} className={styles["login"]}>
                                Log In
                            </Link>
                            <Link to={"/sign-up"} className={styles["signUp"]}>
                                Sign Up
                            </Link>
                        </div>
                    )}
                </>
            ) : null}
        </div>
    );
};

export default NavigationBar;
