import { Food } from "./food";

export type FlashSale = {
    _id: string;
    name: string;
    discountPercent: number;
    start: string;
    end: string;
    products: Food[];
    isActive: boolean;
    isDelete: boolean;
};
