import React, { useCallback } from "react";
import styles from "./navigation-bar.module.css";
import NavigationList from "./NavigationList";
import Logo from "../../../asset/asset/Logo";
import TimeOpen from "./TimeOpen";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
const NavigationBar: React.FC<{}> = () => {
    const navigate = useNavigate();

    const gotoCartPage = useCallback(() => {
        navigate("/cart-page");
    }, [navigate]);

    // get screenWidth :
    const screenWidth = useSelector((state: any) => state.screenWidth);
    return (
        <div className={`${styles["navigation-bar"]} content-container`}>
            <NavigationList />
            <Logo />
            <div className={styles["right-side"]}>
                <TimeOpen />
                {screenWidth ? (
                    <div className={styles["cart-nav"]} onClick={gotoCartPage}>
                        Your Cart
                        <FontAwesomeIcon icon={faCartShopping} />
                        <motion.span
                            className={styles["cart-count"]}
                        ></motion.span>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default NavigationBar;
