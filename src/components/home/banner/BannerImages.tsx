import React from "react";
import styles from "./banner-images.module.css";
import img from "../../../asset/asset/banner-img.jpg";
import img1 from "../../../asset/asset/banner-img1.png";
import img2 from "../../../asset/asset/banner-img2.png";
import img3 from "../../../asset/asset/banner-img3.png";
import BannerPrice from "./BannerPrice";
function BannerImages() {
    return (
        <div className={styles["banner-images"]}>
            <div className={styles["large-img"]}>
                <img src={img} alt="" />
            </div>
            <div className={styles["small-images-col"]}>
                <div className={styles["small-img"]}>
                    <img src={img1} alt="" />
                </div>
                <div className={styles["small-img"]}>
                    <img src={img2} alt="" />
                </div>
                <div className={styles["small-img"]}>
                    <img src={img3} alt="" />
                </div>
            </div>
            <BannerPrice />
        </div>
    );
}

export default BannerImages;
