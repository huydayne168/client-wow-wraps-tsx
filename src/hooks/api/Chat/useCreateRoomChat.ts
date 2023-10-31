import React from "react";
import usePrivateHttp from "../../usePrivateHttp";

const useCreateRoomChat = () => {
    const privateHttp = usePrivateHttp();

    async function createRoom(userId: string | undefined) {
        try {
            const res = await privateHttp.post("/api/chat/createRoom", {
                userId,
            });
            console.log(res.data);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }

    return createRoom;
};

export default useCreateRoomChat;
