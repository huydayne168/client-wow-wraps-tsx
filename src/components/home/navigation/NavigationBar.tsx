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
import { curUserActions } from "../../../stores/store-toolkit";
const NavigationBar: React.FC<{}> = () => {
    const privateHttp = usePrivateHttp();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const currentUser = useAppSelector((state) => state.currentUser);
    const [currentUserInfo, setCurrentUserInfo] = useState<User | null>(null);
    // get screenWidth :
    const screenWidth = useSelector((state: any) => state.screenWidth);
    const gotoCartPage = useCallback(() => {
        navigate("/cart-page");
    }, [navigate]);

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

    return (
        <div className={`${styles["navigation-bar"]} content-container`}>
            <NavigationList currentUserInfo={currentUserInfo} />
            <Logo />

            {screenWidth ? (
                <>
                    {currentUserInfo?._id ? (
                        <div className={styles["right-side"]}>
                            <div className={styles["user-profile"]}>
                                {currentUserInfo.userName}
                            </div>
                            <div
                                className={styles["cart-nav"]}
                                onClick={gotoCartPage}
                            >
                                Your Cart
                                <FontAwesomeIcon icon={faCartShopping} />
                                <motion.span
                                    className={styles["cart-count"]}
                                ></motion.span>
                            </div>
                            <div
                                className={styles["logout"]}
                                onClick={logoutHandler}
                            >
                                Log out
                            </div>
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
            ) : (
                <TimeOpen />
            )}
        </div>
    );
};

export default NavigationBar;
