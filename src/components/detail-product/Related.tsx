import React, { useCallback } from "react";
import styles from "./related.module.css";
import { Food } from "../../models/food";
import img from "../../asset/asset/popular-food2.png";
import { useNavigate } from "react-router-dom";
import useScrollToTop from "../../hooks/useScrollToTop";
const Related: React.FC<{ products: Food[] }> = ({ products }) => {
    const navigate = useNavigate();
    const gotoDetailPage = useCallback(
        (product: Food) => {
            navigate("/detail-page", {
                state: {
                    product,
                },
            });
        },
        [navigate]
    );
    return (
        <div className={`content-container ${styles["related"]}`}>
            <h3 className={`${styles["heading"]}`}>
                {" "}
                {products && products[0] ? "Related Items" : "No related Items"}
            </h3>
            <div className={styles["related-list"]}>
                {products && products[0]
                    ? products.map((product) => {
                          return (
                              <div
                                  key={product._id}
                                  className={styles["related-item"]}
                                  onClick={() => {
                                      gotoDetailPage(product);
                                      window.scrollTo(0, 0);
                                  }}
                              >
                                  <img src={product.image} alt="" />
                                  <div className={styles["desc"]}>
                                      <div className={styles["name"]}>
                                          {product.name}
                                      </div>
                                      <p className={styles["desc-detail"]}>
                                          {product.shortDescription}
                                      </p>
                                      <div className={styles["bottom"]}>
                                          <button className={`order-button`}>
                                              Order Now
                                          </button>
                                          <div className={styles.price}>
                                              ${product.price}
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          );
                      })
                    : ""}
            </div>
        </div>
    );
};

export default Related;
