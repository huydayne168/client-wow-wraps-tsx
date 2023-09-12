import React from "react";
import styles from "./navigation-bar.module.css";
import NavigationList from "./NavigationList";
import Logo from "../../../asset/asset/Logo";
import TimeOpen from "./TimeOpen";
import { useSelector } from "react-redux";
const NavigationBar: React.FC<{}> = () => {
    // get screenWidth :
    const screenWidth = useSelector((state: any) => state.screenWidth);
    return (
        <div className={`${styles["navigation-bar"]} content-container`}>
            <NavigationList />
            <Logo />
            <div className={styles["right-side"]}>
                <TimeOpen />
                {screenWidth ? (
                    <div className={styles["cart-nav"]}>Your Cart</div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default NavigationBar;
