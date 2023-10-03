import { type } from "os";
import { Cart } from "./cart";
import { User } from "./user";
import { Food } from "./food";

export type Checkout = {
    date: string;
    products: [
        {
            _id: string;
            product: Food;
            quantity: number;
        }
    ];
    receiverName: string;
    address: string;
    phoneNumber: string;
    paymentMethod: string;
    status: string;
    total: number;
    user: User;
    _id: string;
};
