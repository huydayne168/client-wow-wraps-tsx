import { type } from "os";
import { Review } from "./review";
import { Tag } from "./tag";
import { Category } from "./category";
export type Food = {
    _id: string;
    name: string;
    amount: number;
    price: number;
    rate: number;
    shortDescription: string;
    longDescription: string;
    category: Category;
    tags: Tag[];
    reviews: Review[];
    flashSale: [];
    salePrice: number | null;
    image: string;
};
