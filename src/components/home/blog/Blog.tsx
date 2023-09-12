import React from "react";
import styles from "./blog.module.css";
import img1 from "../../../asset/asset/blog-img1.png";
import img2 from "../../../asset/asset/blog-img2.png";
function Blog() {
    return (
        <div className={`${styles["blog"]} content-container`}>
            <p className="content-desc">Our Blog</p>
            <h3 className="content-heading">Recent Articles</h3>

            <div className={styles["blogs-wrapper"]}>
                {/* just 2 articles */}
                <div className={styles["blog-item"]}>
                    <div className={styles["article-image"]}>
                        <img src={img1} alt="" />
                    </div>
                    <div className={styles["article-desc"]}>
                        <div className={styles["article-desc__date"]}>
                            August 6, 2022
                        </div>
                        <div className={styles["article-desc__heading"]}>
                            The Most Expensive Cup of Coffee in the Usa
                        </div>
                        <div className={styles["article-desc__content"]}>
                            Sed ut perspiciatis unde omnis iste natus error sit
                            voluptatem accusantium doloremque lauatium, totam
                            rem aperiam perspiciatis unde omnis.
                        </div>
                        <div className={styles["article-desc__interact"]}>
                            <div className={styles["article-desc__comment"]}>
                                Comments 165
                            </div>
                            <div className={styles["article-desc__view"]}>
                                Views 1265
                            </div>
                        </div>
                        <div className={styles["article-read"]}>Read now</div>
                    </div>
                </div>

                <div className={styles["blog-item"]}>
                    <div className={styles["article-image"]}>
                        <img src={img2} alt="" />
                    </div>
                    <div className={styles["article-desc"]}>
                        <div className={styles["article-desc__date"]}>
                            August 6, 2022
                        </div>
                        <div className={styles["article-desc__heading"]}>
                            The Most Expensive Cup of Coffee in the Usa
                        </div>
                        <div className={styles["article-desc__content"]}>
                            Sed ut perspiciatis unde omnis iste natus error sit
                            voluptatem accusantium doloremque lauatium, totam
                            rem aperiam perspiciatis unde omnis.
                        </div>
                        <div className={styles["article-desc__interact"]}>
                            <div className={styles["article-desc__comment"]}>
                                Comments 165
                            </div>
                            <div className={styles["article-desc__view"]}>
                                Views 1265
                            </div>
                        </div>
                        <div className={styles["article-read"]}>Read now</div>
                    </div>
                </div>
            </div>

            <div className={styles["blog-action"]}>
                <button>Explore All Blogs</button>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="11"
                    viewBox="0 0 18 11"
                    fill="none"
                >
                    <path
                        d="M1 5.5H17M17 5.5C15.4848 5.26 12.4545 4.024 12.4545 1M17 5.5C15.4848 5.74 12.4545 6.976 12.4545 10"
                        stroke="#FB8F2C"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
        </div>
    );
}

export default Blog;
