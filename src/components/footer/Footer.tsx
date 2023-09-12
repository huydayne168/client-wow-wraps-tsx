import React from "react";
import styles from "./footer.module.css";
import logoText from "../../asset/asset/logo-text.png";
import appStore from "../../asset/asset/app-store.png";
import chPlay from "../../asset/asset/Chplay.png";
function Footer() {
    return (
        <div className={`${styles["footer"]} content-container`}>
            <div className={styles["footer-col"]}>
                <img src={logoText} alt="" />
                <p className={styles["download-text"]}>
                    Download the WowWraps app today.
                </p>
                <div className={styles["download-methods"]}>
                    <img src={appStore} alt="" />
                    <img src={chPlay} alt="" />
                </div>
            </div>
            <div className={styles["footer-col"]}>
                <div className={styles["footer-col__heading"]}>
                    Usefull Link
                </div>
                <ul className={styles["footer-col__list"]}>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Menu</li>
                </ul>
            </div>
            <div className={styles["footer-col"]}>
                <div className={styles["footer-col__heading"]}>
                    Contact Info
                </div>
                <ul className={styles["footer-col__list"]}>
                    <li>Silk St, Barbican, London EC2Y 8DS, UK</li>
                    <li>info@example.com</li>
                    <li>800-123-45-678</li>
                </ul>
            </div>
            <div className={styles["footer-col"]}>
                <div className={styles["footer-col__heading"]}>Follow us</div>
                <ul className={styles["footer-col__list"]}>
                    <li>Facebook</li>
                    <li>Instagram</li>
                    <li>Linkedin</li>
                    <li>Twitter</li>
                </ul>
            </div>
            <div className={styles["footer-col"]}>
                <div className={styles["footer-col__heading"]}>Legal</div>
                <ul className={styles["footer-col__list"]}>
                    <li>Website by huydayne1608</li>
                    <li>©2022. All Rights Reserved</li>
                </ul>
            </div>
        </div>
    );
}

export default Footer;
