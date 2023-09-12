import React from "react";
import styles from "./filter-top-bar.module.css";
function FilterTopBar() {
    // we can fetch all category after:
    return (
        <div className={styles["filter-top-bar"]}>
            <ul>
                <li>All</li>
                <li>Appetizer</li>
                <li>Soup</li>
                <li>Dessert</li>
                <li>Drinks</li>
            </ul>
        </div>
    );
}

export default FilterTopBar;
