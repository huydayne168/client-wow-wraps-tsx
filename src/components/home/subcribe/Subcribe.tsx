import React from "react";
import styles from "./subcribe.module.css";
function Subcribe() {
    return (
        <div className={styles["subcribe"]}>
            <div className={`content-container ${styles["subcribe-wrapper"]}`}>
                <div className={styles["subcribe-text"]}>
                    <h3 className={`content-heading ${styles.heading}`}>
                        Newsletter
                    </h3>
                    <p className={`content-desc ${styles.desc}`}>
                        Subscribe to our newsletter and receive 15% discount
                        from your order.
                    </p>
                </div>

                <form action="#" className={styles["subcribe-form"]}>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email address"
                    />
                    <button>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="56"
                            height="26"
                            viewBox="0 0 56 26"
                            fill="none"
                        >
                            <path
                                d="M1 13H55M55 13C50.9091 12.36 42.7273 9.064 42.7273 1M55 13C50.9091 13.64 42.7273 16.936 42.7273 25"
                                stroke="white"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Subcribe;
