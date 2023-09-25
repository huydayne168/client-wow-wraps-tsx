import { type } from "os";
import { Review } from "./review";
export type Food = {
    _id: string;
    name: string;
    amount: number;
    price: number;
    rate: number;
    shortDescription: string;
    longDescription: string;
    category: string;
    tags: string[];
    reviews: Review[];
    image: string;
};
