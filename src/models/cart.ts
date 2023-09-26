import { type } from "os";
import { User } from "./user";
import { Food } from "./food";

export type FoodInCart = {
    _id: string;
    product: Food;
    quantity: number;
};

export type Cart = {
    _id: string;
    user: User;
    foods: FoodInCart[];
};
