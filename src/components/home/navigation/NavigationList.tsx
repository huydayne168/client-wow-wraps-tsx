import React, { useCallback, useState } from "react";
import styles from "./navigation-list.module.css";
import { useNavigate } from "react-router-dom";
import NavBarIcon from "../../../asset/asset/NavBarIcon";
import { useSelector } from "react-redux";
function NavigationList() {
    const navigate = useNavigate();
    const [navIsOpen, setNavIsOpen] = useState(false);
    const screenWidth = useSelector((state: any) => state.screenWidth);
    console.log(screenWidth);

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
                {screenWidth ? (
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
                <div onClick={openNav}>
                    <NavBarIcon />
                </div>
            )}
            {navIsOpen && !screenWidth ? <NavList /> : ""}
        </div>
    );
}

export default NavigationList;
