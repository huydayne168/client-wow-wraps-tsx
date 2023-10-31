import { User } from "./user";

export type RoomChat = {
    [key: string]: any;
    _id: string;
    users: User[];
};
