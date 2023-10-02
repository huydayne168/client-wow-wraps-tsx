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
                setCurrentUserInfo(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getCurrentUserInfo();
    }, []);

    // get current user cart:
    useEffect(() => {
        const getCart = async () => {
            const res = await privateHttp.get("/user/get-cart", {
                params: {
                    userId: currentUser._id,
                },
            });
            dispatch(cartActions.getCart(res.data));
        };
        getCart();
    }, []);

    // LOGOUT
    const logoutHandler = useCallback(async () => {
        try {
            const res = await privateHttp.post("/user/logout");
            console.log(res);
            setCurrentUserInfo(null);
            dispatch(curUserActions.logout());
        } catch (error) {
            console.log(error);
        }
    }, [dispatch, privateHttp]);

    const items: MenuProps["items"] = [
        {
            key: "yourProfile",
            label: <div className={styles["dropdown-items"]}>Your Profile</div>,
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
                            {/* <div
                                className={styles["logout"]}
                                onClick={logoutHandler}
                            >
                                Log out
                            </div> */}
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
