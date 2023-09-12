import React from "react";
import FoodDetail from "../components/detail-product/FoodDetail";
import DescAndReview from "../components/detail-product/DescAndReview";
// import { useLocation } from "react-router-dom";
const DetailProductPage: React.FC<{}> = () => {
    // const location = useLocation();
    // get food data from navigate hook from home page most popular food and menu page:
    // const food = location.state;
    // just a dummy food here:
    const food = {
        name: "Pho",
        _id: "asdasdasd",
        amount: 5,
        price: 35,
        rate: 4,
        shortDescription: "this is the best food in VN",
        longDescription:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae sapiente repellat laborum enim rem. Minus possimus saepe assumenda facere consequatur? Dignissimos incidunt illo cum sit cupiditate eius accusantium, impedit quis! Deserunt eius, dolores dolor recusandae, tempore ab ipsum exercitationem, facilis velit aperiam nemo ipsam pariatur? Debitis sapiente omnis laboriosam eius.",
        tags: ["yummy", "a little spicy"],
        category: "Lunch",
        reviews: [
            {
                _id: "abc",
                date: new Date().toISOString(),
                reviewContent: "this iis so good",
                rate: 5,
                user: {
                    _id: "1",
                    userName: "Huynguyen viet",
                    avatar: "https://tse4.mm.bing.net/th?id=OIP.HgMixLfzHr2KOQyoJfbqwwHaHa&pid=Api&P=0&h=180",
                    email: "huydayne1608@gmail.com",
                },
            },
        ],
        images: "https://tse3.mm.bing.net/th?id=OIP.BBCV7Fgtdg3PjEduyFAn3gHaE7&pid=Api&P=0&h=180",
    };
    return (
        <div className="checkout-page">
            <FoodDetail food={food} />
            <DescAndReview food={food} />
        </div>
    );
};

export default DetailProductPage;
