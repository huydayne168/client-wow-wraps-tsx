import React, { useEffect, useState } from "react";
import FoodDetail from "../components/detail-product/FoodDetail";
import DescAndReview from "../components/detail-product/DescAndReview";
import Related from "../components/detail-product/Related";
import { useTime } from "../hooks/useTime";
import { useLocation } from "react-router-dom";
import { Food } from "../models/food";
import http from "../utils/http";
import useScrollToTop from "../hooks/useScrollToTop";
const DetailProductPage: React.FC<{}> = () => {
    useScrollToTop();
    const location = useLocation();
    const product: Food = location.state.product;
    const [relatedProducts, setRelatedProducts] = useState<Food[]>([]);
    console.log(product.category);

    // get related products:
    useEffect(() => {
        const getRelatedProducts = async () => {
            try {
                const res = await http.get("/api/product/related-products", {
                    params: {
                        productId: product._id,
                        category: product.category._id,
                    },
                });

                setRelatedProducts(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        getRelatedProducts();
    }, [product]);
    console.log(relatedProducts);

    return (
        <div className="checkout-page">
            <FoodDetail product={product} />
            <DescAndReview product={product} />
            <Related products={relatedProducts} />
        </div>
    );
};

export default DetailProductPage;
