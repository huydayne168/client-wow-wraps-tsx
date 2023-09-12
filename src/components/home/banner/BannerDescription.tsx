import React, { useCallback } from "react";
import styles from "./banner-description.module.css";
import { useNavigate } from "react-router-dom";
function BannerDescription() {
    const navigate = useNavigate();

    const gotoMenuPage = useCallback(
        function (e: any) {
            e.preventDefault();
            navigate("/menu");
        },
        [navigate]
    );
    return (
        <div className={styles["banner-desc"]}>
            <p>Hi, new friend!</p>
            <h2 className={styles["heading"]}>
                We do not cook, we create your emotions!
            </h2>
            <p>
                There's evidence that cooking, like other creative practices,
                can boost well-being, self-esteem, and other measures of mental
                health.
            </p>

            <button className={styles["button"]} onClick={gotoMenuPage}>
                Our menu
            </button>
        </div>
    );
}

export default BannerDescription;
