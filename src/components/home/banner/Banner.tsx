import React from "react";
import styles from "./banner.module.css";
import BannerDescription from "./BannerDescription";
import BannerImages from "./BannerImages";
function Banner() {
    return (
        <div className={`${styles["banner"]} content-container`}>
            <BannerDescription />
            <BannerImages />
        </div>
    );
}

export default Banner;
