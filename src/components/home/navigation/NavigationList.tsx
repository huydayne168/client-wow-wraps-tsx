import React, { useCallback, useState } from "react";
import styles from "./navigation-list.module.css";
import { Link, useNavigate } from "react-router-dom";
import NavBarIcon from "../../../asset/asset/NavBarIcon";
import TimeOpen from "./TimeOpen";
import { useAppDispatch, useAppSelector } from "../../../hooks/store-hooks";
import { User } from "../../../models/user";
import usePrivateHttp from "../../../hooks/usePrivateHttp";
import { curUserActions } from "../../../stores/store-toolkit";
const NavigationList: React.FC<{ currentUserInfo: User | null }> = ({
    currentUserInfo,
}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const privateHttp = usePrivateHttp();
    const [navIsOpen, setNavIsOpen] = useState(false);
    const screenWidth = useAppSelector((state: any) => state.screenWidth);
    const currentUser = useAppSelector((state) => state.currentUser);

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

    console.log(currentUser);

    // LOGOUT:
    const logoutHandler = useCallback(async () => {
        try {
            const res = await privateHttp.post("/user/logout");
            console.log(res);
            dispatch(curUserActions.logout());
        } catch (error) {
            console.log(error);
        }
    }, [dispatch, privateHttp]);

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
                {!screenWidth && currentUserInfo?._id ? (
                    <>
                        <li
                            onClick={gotoYourCart}
                            className={styles["nav-item"]}
                        >
                            Your Cart
                        </li>
                        <li
                            className={styles["nav-item"]}
                            onClick={logoutHandler}
                        >
                            Log out
                        </li>
                    </>
                ) : (
                    ""
                )}
                {!screenWidth && !currentUserInfo?._id ? (
                    <>
                        <Link to={"/login"} className={styles["nav-item"]}>
                            Log in
                        </Link>
                        <Link to={"/sign-up"} className={styles["nav-item"]}>
                            Sign up
                        </Link>
                    </>
                ) : (
                    ""
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
