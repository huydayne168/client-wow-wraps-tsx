import React from "react";
import MainMenu from "../components/menu/MainMenu";
import useScrollToTop from "../hooks/useScrollToTop";

function MenuPage() {
    useScrollToTop();
    return (
        <div className="menu-page content-container">
            <h2 className={`content-heading`}>Our Menu</h2>
            <p className={`content-desc`}>Choose & Taste What You Like</p>
            <MainMenu />
        </div>
    );
}

export default MenuPage;
