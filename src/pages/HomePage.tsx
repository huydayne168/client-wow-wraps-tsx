import React from "react";
import Banner from "../components/home/banner/Banner";
import Stat from "../components/home/stat/Stat";
import MostPopularFood from "../components/home/most-popular-food/MostPopularFood";
import OpenTime from "../components/home/open-time/OpenTime";
import VisitRestaurant from "../components/home/visit-restaurant/VisitRestaurant";
import Blog from "../components/home/blog/Blog";
import Subcribe from "../components/home/subcribe/Subcribe";
import useScrollToTop from "../hooks/useScrollToTop";
function HomePage() {
    useScrollToTop();
    return (
        <div className="home-page">
            <Banner />
            <Stat />
            <MostPopularFood />
            <OpenTime />
            <VisitRestaurant />
            <Blog />
            <Subcribe />
        </div>
    );
}

export default HomePage;
