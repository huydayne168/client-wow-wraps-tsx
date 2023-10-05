import React, { useState } from "react";
import styles from "./checkouts.module.css";
import { Checkout } from "../../models/checkout";
import { useAppSelector } from "../../hooks/store-hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheckCircle,
    faCircleXmark,
    faCross,
    faSpinner,
} from "@fortawesome/free-solid-svg-icons";
const Checkouts: React.FC<{ checkouts: Checkout[] }> = ({ checkouts }) => {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <div className={styles["checkouts"]}>
            <h2 className={styles["heading"]}>Checkouts:</h2>
            <ul className={styles["responsive-table"]}>
                <li className={styles["table-header"]}>
                    <div className={`${styles["col"]} ${styles["col-1"]}`}>
                        Time
                    </div>
                    <div className={`${styles["col"]} ${styles["col-2"]}`}>
                        Products
                    </div>
                    <div className={`${styles["col"]} ${styles["col-3"]}`}>
                        Total
                    </div>
                    <div className={`${styles["col"]} ${styles["col-4"]}`}>
                        Status
                    </div>
                </li>
                {checkouts && checkouts[0] && !isLoading ? (
                    checkouts.map((checkout) => {
                        return (
                            <li
                                key={checkout._id}
                                className={styles["table-row"]}
                            >
                                <div
                                    className={`${styles["col"]} ${styles["col-1"]}`}
                                    // onClick={() => {
                                    //     gotoDetailPage(item.product);
                                    // }}
                                >
                                    <span>{checkout.date}</span>
                                </div>
                                <div
                                    className={`${styles["col"]} ${styles["col-2"]} ${styles["products"]}`}
                                >
                                    {checkout.products.map((product) => {
                                        return (
                                            <div key={product._id}>
                                                <img
                                                    src={product.product.image}
                                                    alt={product.product.name}
                                                    className={
                                                        styles["product-image"]
                                                    }
                                                />
                                                <span>
                                                    {product.product.name} x{" "}
                                                    {product.quantity}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div
                                    className={`${styles["col"]} ${styles["col-3"]}`}
                                >
                                    <span>${checkout.total}</span>
                                </div>
                                <div
                                    className={`${styles["col"]} ${styles["col-4"]}`}
                                >
                                    <span>
                                        {checkout.status}{" "}
                                        {checkout.status.toLowerCase() ===
                                        "paid" ? (
                                            <FontAwesomeIcon
                                                icon={faCheckCircle}
                                            />
                                        ) : null}
                                        {checkout.status.toLowerCase() ===
                                        "canceled" ? (
                                            <FontAwesomeIcon
                                                style={{ color: "red" }}
                                                icon={faCircleXmark}
                                            />
                                        ) : null}
                                        {checkout.status.toLowerCase() ===
                                        "waiting for paying" ? (
                                            <FontAwesomeIcon
                                                style={{ color: "blue" }}
                                                icon={faSpinner}
                                            />
                                        ) : null}
                                    </span>
                                </div>
                            </li>
                        );
                    })
                ) : (
                    <p
                        style={{
                            color: "#666",
                            textAlign: "center",
                            margin: "3.2rem 0",
                        }}
                    >
                        You have not add anything to your cart yet!
                    </p>
                )}
            </ul>
        </div>
    );
};

export default Checkouts;
