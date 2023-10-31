export type Message = {
    [key: string]: any;
    _id?: string;
    user: string;
    content: string;
    roomId?: string;
};
