import React from "react";
import styles from "./main-menu.module.css";
import FilterTopBar from "./FilterTopBar";
import FilterSideBar from "./FilterSideBar";
import FoodListWrapper from "./FoodListWrapper";
function MainMenu() {
    return (
        <div className={styles["main-menu"]}>
            <FilterTopBar />
            <div className={styles["main-menu__body"]}>
                <FilterSideBar />
                <FoodListWrapper />
            </div>
        </div>
    );
}

export default MainMenu;
