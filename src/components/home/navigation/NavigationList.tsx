import React, { useCallback, useEffect, useState } from "react";
import styles from "./navigation-list.module.css";
import { useNavigate } from "react-router-dom";
import NavBarIcon from "../../../asset/asset/NavBarIcon";
import TimeOpen from "./TimeOpen";
import { useAppSelector } from "../../../hooks/store-hooks";
import { User } from "../../../models/user";
const NavigationList: React.FC<{ currentUserInfo: User | null }> = ({
    currentUserInfo,
}) => {
    const navigate = useNavigate();
    const [navIsOpen, setNavIsOpen] = useState(false);
    const screenWidth = useAppSelector((state: any) => state.screenWidth);

    const gotoHomePage = useCallback(() => {
        navigate("/");
    }, [navigate]);

    const gotoMenuPage = useCallback(() => {
        navigate("/menu");
    }, [navigate]);

    const gotoYourCart = useCallback(() => {
        navigate("/your-cart");
    }, [navigate]);

    const openNav = useCallback(() => {
        setNavIsOpen(!navIsOpen);
    }, [navIsOpen]);

    function NavList() {
        return (
            <ul>
                <li onClick={gotoHomePage} className={styles["nav-item"]}>
                    Home
                </li>
                <li onClick={gotoMenuPage} className={styles["nav-item"]}>
                    Menu
                </li>
                {screenWidth && <TimeOpen />}
                {screenWidth && currentUserInfo ? (
                    ""
                ) : (
                    <li onClick={gotoYourCart} className={styles["nav-item"]}>
                        Your Cart
                    </li>
                )}
            </ul>
        );
    }

    return (
        <div className={`${styles["navigation-list"]}`}>
            {screenWidth ? (
                <NavList />
            ) : (
                <div onClick={openNav} style={{ display: "flex", gap: "2rem" }}>
                    <NavBarIcon />
                    {currentUserInfo ? (
                        <div
                            onClick={gotoYourCart}
                            className={styles["profile"]}
                        >
                            {currentUserInfo?.userName}
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            )}
            {navIsOpen && !screenWidth ? <NavList /> : ""}
        </div>
    );
};

export default NavigationList;
