import React from "react";
import styles from "./visit-restaurant.module.css";
import img1 from "../../../asset/asset/our-restaurant1.png";
import img2 from "../../../asset/asset/our-restaurant2.png";
import img3 from "../../../asset/asset/our-restaurant3.png";
import img4 from "../../../asset/asset/our-restaurant4.png";
import img5 from "../../../asset/asset/our-restaurant5.png";
import { useAppSelector } from "../../../hooks/store-hooks";
// import Swiper core and required modules
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function VisitRestaurant() {
    const screenWidth = useAppSelector((state) => state.screenWidth);

    console.log(screenWidth);
    return (
        <div className={`${styles["visit-restaurant"]} content-container`}>
            <h3 className="content-heading">Visit Our Restaurant</h3>
            <p className="content-desc">
                Quality country-style menu selection, friendly and efficient
                service, combined with genuine value has kept Our Best serving
                families like yours for over 28.
            </p>

            {screenWidth ? (
                <div className={styles["restaurant-images"]}>
                    <img src={img1} alt="" />

                    <img src={img2} alt="" />

                    <img src={img4} alt="" />

                    <img src={img3} alt="" />

                    <img src={img5} alt="" />
                </div>
            ) : (
                <Swiper
                // install Swiper modules
                // modules={[Pagination]}
                // spaceBetween={50}
                // slidesPerView={3}
                // pagination={{ clickable: true }}
                // onSwiper={(swiper) => console.log(swiper)}
                // onSlideChange={() => console.log("slide change")}
                >
                    <SwiperSlide>
                        <img
                            src={img1}
                            alt=""
                            className={styles["slide-img"]}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img
                            src={img2}
                            alt=""
                            className={styles["slide-img"]}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img
                            src={img3}
                            alt=""
                            className={styles["slide-img"]}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img
                            src={img4}
                            alt=""
                            className={styles["slide-img"]}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img
                            src={img5}
                            alt=""
                            className={styles["slide-img"]}
                        />
                    </SwiperSlide>
                </Swiper>
            )}
        </div>
    );
}

export default VisitRestaurant;
